const jwt = require('jsonwebtoken');

const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');

const signToken = (id) => {
  // constructs a JSONWebToken from the Secret!
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // this generates and sends a JSONWebToken
  // in the body of the response. Works ✅
  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // so we find the user by the email

  if (!email || !password)
    return next(new AppError('Please provide an email and password', 400));

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password)))
    return new AppError('Incorrect email or password', 401);

  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});
