const express = require('express');
const router = express.Router();

const { isAdmin, isAuthenticate, isSignIn } = require('../controllers/auth');
const {
  getCategoryById,
  getCategory,
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/category');
const { getUserById } = require('../controllers/user');

router.param('userId', getUserById);
router.param('categoryId', getCategoryById);

//Routes
router.post(
  '/category/create/:userId',
  isSignIn,
  isAuthenticate,
  isAdmin,
  createCategory
);

router.get('/category/:categoryId', getCategory);
router.get('/categories', getAllCategory);

router.put(
  '/category/:categoryId/:userId',
  isSignIn,
  isAuthenticate,
  isAdmin,
  updateCategory
);

router.delete(
  '/category/:categoryId/:userId',
  isSignIn,
  isAuthenticate,
  isAdmin,
  deleteCategory
);

module.exports = router;
