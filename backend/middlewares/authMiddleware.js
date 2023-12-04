const jwt = require('jsonwebtoken')
const asyncHandler = require('../middlewares/asyncHandler')
const User = require('../models/userModel')
const ErrorResponse = require('../utils/errorResponse')


exports.Protect = asyncHandler(async(req, res, next) => {
    let token
    token = req.cookies.token
    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (err){
            next(new ErrorResponse('Not Authorized, Token invalid!', 401))
        }
    } else {
        next(new ErrorResponse('Not Authorized, No Token!', 401))
    }
})

// User must be an admin
exports.Admin = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
        next(new ErrorResponse('Not authorized as an admin', 401))
    }
})