import { User } from "../Models/user.model.js"; 
import asyncHandler from "../Utils/asyncHandler.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { sendEmail } from "../Utils/sendEmail.js";
import { uploadOnCloudinary } from "../Utils/cloudinary.js";

const options = {
  httpOnly: true,
  secure: true,
};

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { email, fullName, password, name } = req.body;

  // Validate required fields
  if ([email, fullName, password, name].some((field) => !field?.trim())) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "Email is already registered",
    });
  }

  // Create the user
  const newUser = await User.create({
    email,
    fullName,
    password,
    name,
  });

  // Generate tokens
  const accessToken = newUser.generateAccessToken();
  const refreshToken = newUser.generateRefreshToken();

  // Send response with tokens
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      message: "Registered successfully",
      newUser,
    });
});

// User login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // Find user by email
  const user = await User.findOne({ email });
  if (!user ) {
    return res.status(401).json({
      success: false,
      message: "Email is not registered",
    });
  }
  if (!(await user.isPasswordCorrect(password))) {
    return res.status(401).json({
      success: false,
      message: "Incorrect password",
    });
  }

  // Generate tokens
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  // Send response with tokens
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      message: "Login successful",
      user,
    });
});

// Logout user
const logoutUser = asyncHandler(async (req, res) => {
  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ message: "Logout successful" });
});

// Change password
const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user._id; // Assuming the user is authenticated and user ID is in the request

  // Validate input
  if (!oldPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Old password and new password are required",
    });
  }

  // Find user and check old password
  const user = await User.findById(userId);
  if (!user || !(await user.isPasswordCorrect(oldPassword))) {
    return res.status(401).json({
      success: false,
      message: "Old password is incorrect",
    });
  }

  // Hash the new password and save it
  user.password = newPassword;
  await user.save();

  res.status(200).json({ message: "Password changed successfully" });
});

// Refresh Token
const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken: token } = req.cookies; // Extract the refresh token from cookies

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Refresh token not provided",
    });
  }

  // Verify the refresh token
  jwt.verify(token, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Invalid or expired refresh token",
      });
    }

    // Find the user associated with the token
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify that the refresh token matches the one in the database
    if (user.refreshToken !== token) {
      return res.status(403).json({
        success: false,
        message: "Refresh token does not match",
      });
    }

    // Generate a new access token
    const newAccessToken = user.generateAccessToken();

    // Send the new access token as a cookie
    res.status(200).cookie("accessToken", newAccessToken, options).json({
      message: "New access token generated",
      accessToken: newAccessToken,
    });
  });
});

const generateResetEmail = (resetUrl) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Password Reset</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: #4caf50;
          color: #ffffff;
          text-align: center;
          padding: 20px;
        }
        .content {
          padding: 20px;
          color: #333;
        }
        .button {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #4caf50;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
        }
        .footer {
          text-align: center;
          padding: 10px;
          font-size: 12px;
          color: #999;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Password Reset Request</h1>
        </div>
        <div class="content">
          <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
          <p>Please click the button below, or paste the following link into your browser to complete the process:</p>
          <a href="${resetUrl}" class="button">Reset Password</a>
          <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        </div>
        <div class="footer">
          <p>Thank you for using our service!</p>
        </div>
      </div>
    </body>
  </html>
`;

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "This email is not registered",
    });
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 60 * 1000 * 5;

  await user.save();

  const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/users/reset-password/${resetToken}`;

  await sendEmail({
    email: user.email,
    subject: "Password Reset",
    htmlContent: generateResetEmail(resetUrl),
  });

  res.status(200).json({ message: "Password reset link sent to email" });
});

const getUser = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Get the user ID from the request

  // Find the user by ID and exclude sensitive information
  const user = await User.findById(userId).select("-password -createdAt -updatedAt"); // Exclude password and timestamps

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  res.status(200).json({ success: true, user });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password, confirmPassword } = req.body;
  const token = req.params.token;

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Password and confirm password do not match",
    });
  }

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }, // Check if the token is still valid
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Invalid or expired reset token",
    });
  }

  user.password = password;
  user.resetPasswordToken = undefined; // Clear the reset token
  user.resetPasswordExpires = undefined; // Clear the expiration
  await user.save();

  res.status(200).json({ message: "Password has been reset successfully" });
});

export {
  registerUser,
  loginUser,
  logoutUser,
  changePassword,
  refreshToken,
  forgotPassword,
  getUser,
  resetPassword,
};
