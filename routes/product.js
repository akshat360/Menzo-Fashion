const express = require('express');
const router = express.Router();

const {
  getProductById,
  getProduct,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getPhoto,
  getAllUniqueCategory,
} = require('../controllers/product');
const { isAdmin, isSignIn, isAuthenticate } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');

router.param('userId', getUserById);
router.param('productId', getProductById);

router.post(
  '/product/create/:userId',
  isSignIn,
  isAuthenticate,
  isAdmin,
  createProduct
);

router.get('/product/:productId', getProduct);
router.get('/product/photo/:productId', getPhoto);
router.get('/products', getAllProducts);

router.put(
  '/product/:productId/:userId',
  isSignIn,
  isAuthenticate,
  isAdmin,
  updateProduct
);

router.delete(
  '/product/:productId/:userId',
  isSignIn,
  isAuthenticate,
  isAdmin,
  deleteProduct
);

router.get('/product/categories', getAllUniqueCategory);

module.exports = router;
