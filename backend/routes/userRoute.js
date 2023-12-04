const express = require('express')
const {
        GetUsers,
        RegisterUser, 
        AuthUser, 
        GetUserProfile, 
        UpdateUserProfile, 
        LogoutUser, 
        DeleteUser, 
        GetUserById,
        UpdateUser  
} = require('../controllers/userController')

const {Protect, Admin} = require('../middlewares/authMiddleware')

const router = express.Router()

router
    .route('/')
    .post(RegisterUser)
    .get(Protect, Admin, GetUsers)

router
    .route('/auth')
    .post(AuthUser)
router
    .route('/logout')
    .post(LogoutUser)
router
  .route('/profile')
  .get(Protect, GetUserProfile)
  .put(Protect, UpdateUserProfile)
router
  .route('/:id')
  .delete(Protect, Admin, DeleteUser)
  .get(Protect, Admin, GetUserById)
  .put(Protect, Admin, UpdateUser)

module.exports = router