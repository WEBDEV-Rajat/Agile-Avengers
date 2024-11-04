import jwt from "jsonwebtoken";
import  asyncHandler  from "../Utils/asyncHandler.js"
import { ApiError } from "../Utils/ApiError.js"
import { User } from "../Models/user.model.js"
export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
      
    if (!token) {
      throw new ApiError(401, "You are not authenticated");
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded?._id).select(
      "-password -refreshToken"
    );
    console.log("user found", user);
    req.user = user;
    next();
  } catch (error) {
    console.log("Error getting token from server: " + error);
    throw new ApiError(400, "Error getting token from server");
  }
});


