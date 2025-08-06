var express = require('express');
var router = express.Router();
const Controller = require('../controller/customer')
//customer routes

router.post('/',Controller.create)
router.get('/:id',Controller.get)
router.post('/login',Controller.login)
router.put('/:id',Controller.update)
router.delete('/:id',Controller.delete)
router.post('/forgot-password',Controller.sendOTP);
router.post('/verify-otp', Controller.verifyOTP);
router.post('/reset-password', Controller.resetPassword);
router.get('/verifyemail/customer', Controller.verifyEmail);
router.post('/resend-verification', Controller.resendVerification);
router.put("/update-password/:id", Controller.updatePassword);


module.exports = router;
