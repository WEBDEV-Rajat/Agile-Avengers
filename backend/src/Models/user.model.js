import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    authMethod: {
      type: String,
      enum: ["email", "google", "facebook"],
      default: "email",
    },
    refreshToken: {
      type: String,
      default: null,
    },
    image:{
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  // console.log("Saving password", this.password);
  
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to check if the password is correct
UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate an access token
UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    }
  );
};

// Method to generate a refresh token
UserSchema.methods.generateRefreshToken = function () {
  const refreshToken = jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
    }
  );

  // Save the refresh token in the database
  this.refreshToken = refreshToken;
  this.save();

  return refreshToken;
};

export const User = mongoose.model("User", UserSchema);
