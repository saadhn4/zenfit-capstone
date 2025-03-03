import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["Super Admin", "Manager", "Trainer"],
      default: "Manager",
    },
  },
  { timestamps: true }
);

const adminModel = mongoose.model("admins", adminSchema, "admins");
export default adminModel;
