import { User } from "../Models/user.model.js";
import { ApiError } from "../Utils/ApiError.js"; // Assuming you have this utility class for error handling
import asyncHandler from "../Utils/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
    throw new ApiError(400, "All fields are required");
  }

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User already exists with this email");
  }
  let imagePath;
  if (
    req.files &&
    Array.isArray(req.files.image) &&
    req.files.image.length > 0
  ) {
    imagePath = req.files.image[0].path;
  }

  if (!imagePath) {
    throw new ApiError(400, "Image not found");
  }

  const imageUrl = await uploadOnCloudinary(imagePath);

  // Create the user
  const newUser = await User.create({
    email,
    fullName,
    password,
    name,
    image: imageUrl?.url || "",
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
      message: "registered successfully",
      newUser,
    });
});

// User login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  // Find user by email
  const user = await User.findOne({ email });
  if (!user || !(await user.isPasswordCorrect(password))) {
    throw new ApiError(401, "Invalid email or password");
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
    throw new ApiError(400, "Old password and new password are required");
  }

  // Find user and check old password
  const user = await User.findById(userId);
  if (!user || !(await user.isPasswordCorrect(oldPassword))) {
    throw new ApiError(401, "Old password is incorrect");
  }

  // Hash the new password and save it
  user.password = newPassword;
  await user.save();

  res.status(200).json({ message: "Password changed successfully" });
});

export { registerUser, logoutUser, loginUser, changePassword };
