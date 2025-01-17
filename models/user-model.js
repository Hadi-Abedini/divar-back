const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
    phone: {
      type: String,
      unique: true,
      required: [true, "phone is required"],
      trim: true,
    },
    role: {
      type: String,
      default: "USER",
      enum: {
        values: ["ADMIN", "USER"],
        message: "invalid role: ({VALUE})",
      },
    },
    refreshToken: {
      type: String,
      select: false,
      sparse: true,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", UserSchema);

module.exports = User;