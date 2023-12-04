const express = require('express');
const {
  GetAllProducts,
  GetSingleProduct,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
  CreateProductReview,
  GetTopProducts,
} = require('../controllers/productController');
const { Protect, Admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/').get(GetAllProducts).post(Protect, Admin, CreateProduct);
router.route('/top').get(GetTopProducts);
router
  .route('/:id')
  .get(GetSingleProduct)
  .put(Protect, Admin, UpdateProduct)
  .delete(Protect, Admin, DeleteProduct);
router.route('/:id/reviews').post(Protect, CreateProductReview);
module.exports = router;
