const { Schema, model } = require("mongoose");

const otpSchema = new Schema({
  phone: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 120,
  },
});

otpSchema.index({ phone: 1, code: 1 });

module.exports = model('OTP', otpSchema);
