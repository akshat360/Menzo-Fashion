const express = require('express');

const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  userPurchaseList,
} = require('../controllers/user');
const { isAdmin, isSignIn, isAuthenticate } = require('../controllers/auth');

router.param('userId', getUserById);

router.get('/user/:userId', isSignIn, isAuthenticate, getUser);
router.put('/user/:userId', isSignIn, isAuthenticate, updateUser);

router.get('/orders/user/:userId', isSignIn, isAuthenticate, userPurchaseList);

module.exports = router;
