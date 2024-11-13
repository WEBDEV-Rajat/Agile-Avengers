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
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    image:{
      type: String,
    }
  },
  {
    timestamps: true,
  }
);


UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};


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

  this.refreshToken = refreshToken;
  this.save();

  return refreshToken;
};

export const User = mongoose.model("User", UserSchema);
