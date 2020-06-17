const express = require('express');
const router = express.Router();

const { makePayment, getToken } = require('../controllers/btpayment');
const { isSignIn, isAuthenticate } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');

router.param('userId', getUserById);

router.get('/payment/gettoken/:userId', isSignIn, isAuthenticate, getToken);

router.post('/btpayment/:userId', isSignIn, isAuthenticate, makePayment);

module.exports = router;
