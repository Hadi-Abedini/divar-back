const { promisify } = require("node:util");
const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const OTP = require("../models/otp-model");
const { AppError } = require("../utils/app-error");
const { asyncHandler } = require("../utils/async-handler");

const generateOtp = () => Math.floor(100000 + Math.random() * 900000);


const sendOtpHandler = asyncHandler(async (req, res, next) => {
  const { phone } = req.body;

  if (!phone) {
    return next(new AppError(400, 'Phone number is required'));
  }

  await OTP.deleteMany({ phone });

  const code = generateOtp();
  await OTP.create({ phone, code });

  console.log(`OTP for ${phone}: ${code}`);

  res.status(200).json({
    status: 'success',
    message: 'OTP sent successfully',
    code
  });
});


const signToken = (id) => {
  const accessToken = jwt.sign({ id }, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  });
  const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  });

  return { accessToken, refreshToken };
};

const generateAccessToken = (req, res, next) => {
  const accessToken = jwt.sign(
    { id: req.userId },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    }
  );

  res.status(200).json({
    status: "success",
    token: { accessToken },
  });
};

const signin = asyncHandler(async (req, res, next) => {
  const { phone, code } = req.body;

  if (!phone || !code) {
    return next(new AppError(400, 'Phone number and OTP are required'));
  }

  // بررسی OTP
  const otp = await OTP.findOne({ 
    phone, 
    code: parseInt(code),
    createdAt: { $gt: new Date(Date.now() - 120000) } // چک کردن منقضی نشدن
  });

  if (!otp) {
    return next(new AppError(401, 'Invalid or expired OTP'));
  }

  // حذف OTP پس از استفاده
  await OTP.deleteOne({ _id: otp._id });

  // یافتن یا ایجاد کاربر
  let user = await User.findOne({ phone });

  if (!user) {
    user = await User.create({
      phone,
      role: 'USER'
    });
  }

  // ایجاد توکن‌ها
  const { accessToken, refreshToken } = signToken(user._id);

  // ذخیره refresh token
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    token: { accessToken, refreshToken },
    data: { user }
  });
});

const logout = async (req, res, next) => {
  const user = await User.findById(req.userId);

  user.refreshToken = null;
  await user.save();

  res.status(204).json({
    status: "success",
    data: null,
  });
};

const getProfile = asyncHandler(async (req, res, next) => {
  const { authorization = null } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(
      new AppError(401, "You are not logged in! Please log in to get access")
    );
  }

  // استخراج توکن از هدر
  const token = authorization.split(" ")[1];

  // بررسی و استخراج اطلاعات از توکن
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_ACCESS_TOKEN_SECRET
  );

  const user = await User.findById(decoded.id).select("-refreshToken");

  if (!user) {
    return next(new AppError(404, "User not found"));
  }

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

const protect = asyncHandler(async (req, res, next) => {
  const { authorization = null } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      error: "You are not logged in! Please log in to get access",
    });
  }
  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        error: "Token is Expired",
      });
    }
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        hi: "ho",
        error: "Token is Invalid",
      });
    }
  });

  if (!authorization || !authorization.startsWith("Bearer")) {
    return next(
      new AppError(401, "You are not logged in! Please log in to get access")
    );
  }

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_ACCESS_TOKEN_SECRET
  );

  const user = await User.findById(decoded.id);

  if (!user) {
    return next(
      new AppError(401, "The user belonging to this token does no longer exist")
    );
  }

  req.userId = user._id;
  next();
});

const restrictTo = (...roles) => {
  return asyncHandler(async (req, res, next) => {
    const { userId = null } = req;
    const user = await User.findById(userId);

    if (!roles.includes(user.role)) {
      return next(
        new AppError(403, "You do not have permission to perform this action")
      );
    }

    next();
  });
};

const authenticateRefreshToken = async (req, res, next) => {
  const { refreshToken = null } = req.body;

  if (!refreshToken) {
    return next(new AppError(401, "refresh token missing"));
  }

  const { id: userId } = await promisify(jwt.verify)(
    refreshToken,
    process.env.JWT_REFRESH_TOKEN_SECRET
  );

  const user = await User.findOne({ _id: userId, refreshToken });

  if (!user) {
    return next(
      new AppError(
        404,
        "the user belonging to this refresh token does no longer exist"
      )
    );
  }

  req.userId = userId;
  next();
};

module.exports = {
  signin,
  sendOtpHandler,
  logout,
  getProfile,
  protect,
  restrictTo,
  generateAccessToken,
  authenticateRefreshToken,
};
