import { User } from "../Models/user.model.js";
import asyncHandler from "../Utils/asyncHandler.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { sendEmail } from "../Utils/sendEmail.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

const options = {
  httpOnly: true,
  secure: true,
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, fullName, password, name } = req.body;

  if (!email || !fullName || !password || !name) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "All fields are required"));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Email is already registered"));
  }

  const newUser = await User.create({
    email,
    fullName,
    password,
    name,
  });

  const accessToken = newUser.generateAccessToken();
  const refreshToken = newUser.generateRefreshToken();

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, newUser, "Registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password, googleId } = req.body;
  // console.log("jdasvhjdsjsdhvsufcuifgcuif");

  let user;

  if (googleId) {
    user = await User.findOne({ googleId });
  } else if (email && password) {
    user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, "Email is not registered"));
    }
    if (!(await user.isPasswordCorrect(password))) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, "Incorrect password"));
    }
  }
  console.log("user: ", user);

  if (!user) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "Invalid credentials"));
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  console.log("user:", user);

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, user, "Login successful"));
});

const logoutUser = asyncHandler(async (req, res) => {
  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, null, "Logout successful"));
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user._id;

  if (!oldPassword || !newPassword) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, null, "Old password and new password are required")
      );
  }

  const user = await User.findById(userId);
  if (!user || !(await user.isPasswordCorrect(oldPassword))) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "Old password is incorrect"));
  }

  user.password = newPassword;
  await user.save();
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Password changed successfully"));
});

const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken: token } = req.cookies;

  if (!token) {
    return res
      .status(401)
      .json(new ApiResponse(401, null, "Refresh token not provided"));
  }

  jwt.verify(token, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json(new ApiResponse(403, null, "Invalid or expired refresh token"));
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json(new ApiResponse(404, null, "User not found"));
    }

    if (user.refreshToken !== token) {
      return res
        .status(403)
        .json(new ApiResponse(403, null, "Refresh token does not match"));
    }

    const newAccessToken = user.generateAccessToken();

    res
      .status(200)
      .cookie("accessToken", newAccessToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken: newAccessToken },
          "New access token generated"
        )
      );
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
    return res
      .status(404)
      .json(new ApiResponse(404, null, "This email is not registered"));
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 60 * 1000 * 5;

  await user.save();

  const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

  await sendEmail({
    email: user.email,
    subject: "Password Reset",
    htmlContent: generateResetEmail(resetUrl),
  });

  res
    .status(200)
    .json(new ApiResponse(200, null, "Password reset link sent to email"));
});

const getUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId).select(
    "-password -createdAt -updatedAt"
  );

  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, "User not found"));
  }

  res
    .status(200)
    .json(new ApiResponse(200, user, "User retrieved successfully"));
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const token = req.params.token;

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Invalid or expired reset token"));
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, null, "Password has been reset successfully"));
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
