const asyncHandler = require('../middlewares/asyncHandler');
const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');
const generateToken = require('../utils/generateToken');

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
exports.AuthUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email or password', 400));
  }
  const user = await User.findOne({ email });
  const isMatched = await user.matchPassword(password);
  if (user && isMatched) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    next(new ErrorResponse('Invalid email or password!', 401));
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
exports.RegisterUser = asyncHandler(async (req, res, next) => {
  const { email, name, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    return next(new ErrorResponse('User already exist', 400));
  }
  const user = await User.create({ name, email, password });
  if (user) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
exports.LogoutUser = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.GetUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    next(new ErrorResponse('User not found', 404));
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.UpdateUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    next(new ErrorResponse('User not found', 404));
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
exports.GetUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.DeleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      return next(new ErrorResponse('Can not delete admin user', 400));
    }
    await User.deleteOne({ _id: user._id });
    res.json({ message: 'User removed' });
  } else {
    next(new ErrorResponse('User not found', 404));
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
exports.GetUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    next(new ErrorResponse('User not found', 404));
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
exports.UpdateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    next(new ErrorResponse('User not found', 404));
  }
});
