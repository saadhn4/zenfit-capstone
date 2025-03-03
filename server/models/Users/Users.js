import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    weight: {
      type: String,
    },
    height: {
      type: String,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    membershipType: {
      type: String,
      enum: ["Basic", "Premium", "VIP"],
      default: "Basic",
    },
    isActive: {
      type: Boolean,
    },
    userVerify: {
      email: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: Boolean,
        default: false,
      },
    },
    userVerifyToken: {
      email: { type: String, default: null },
      phone: { type: String, default: null },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema, "users");

export default User;
