const express = require('express');
const router = express.Router();
const {
  AddOrderItems,
  GetMyOrders,
  GetOrderById,
  UpdateOrderToPaid,
  UpdateOrderToDelivered,
  GetOrders,
} = require('../controllers/orderController');
const { Protect, Admin } = require('../middlewares/authMiddleware');

router.route('/').post(Protect, AddOrderItems).get(Protect, Admin, GetOrders);
router.route('/mine').get(Protect, GetMyOrders);
router.route('/:id').get(Protect, GetOrderById);
router.route('/:id/pay').put(Protect, UpdateOrderToPaid);
router.route('/:id/deliver').put(Protect, Admin, UpdateOrderToDelivered);

module.exports = router;
