const express = require('express');
const router = express.Router();

const { isSignIn, isAuthenticate, isAdmin } = require('../controllers/auth');
const { getUserById, pushOrderInPurchaseList } = require('../controllers/user');
const { getProductById, updateStock } = require('../controllers/product');
const {
  getOrderById,
  getOrder,
  createOrder,
  getAllOrder,
  updateStatus,
  getOrderStatus,
} = require('../controllers/order');

router.param('orderId', getOrderById);
router.param('userId', getUserById);
router.param('productId', getProductById);

router.post(
  '/order/create/:userId',
  isSignIn,
  isAuthenticate,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);

router.get('/order/:orderId', getOrder);

router.get(
  '/order/all/:userId',
  isSignIn,
  isAuthenticate,
  isAdmin,
  getAllOrder
);

router.get('/order/status/:userId', getOrderStatus);
router.put(
  '/order/:orderId/status/:userId',
  isSignIn,
  isAuthenticate,
  isAdmin,
  updateStatus
);

module.exports = router;
