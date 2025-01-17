const router = require("express").Router();
const { asyncHandler } = require("../utils/async-handler");
const { validator } = require("../validations/validator");
const {
  userOtpValidationSchema,
  userSigninValidationSchema,
} = require("../validations/auth-validation");
const {
  signin,
  getProfile,
  sendOtpHandler,
  logout,
  protect,
  generateAccessToken,
  authenticateRefreshToken,
} = require("../controllers/auth-controller");

router.post(
  "/signin",
  validator(userSigninValidationSchema),
  asyncHandler(signin)
);

router.post(
  "/otp",
  validator(userOtpValidationSchema),
  asyncHandler(sendOtpHandler)
);

router.get("/logout", protect, asyncHandler(logout));

router.get("/profile", protect, asyncHandler(getProfile));

router.post(
  "/token",
  asyncHandler(authenticateRefreshToken),
  generateAccessToken
);

module.exports = router;
