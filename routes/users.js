var express = require('express');
var router = express.Router();
var user_services = require('../services/user');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/signin', user_services.get_sign_in);
//SignIn Route
router.post('/signin', user_services.sign_in);
//Register Route
router.post('/register', user_services.register);
router.get('/logout', async(req, res, next)=>{
  res.clearCookie('auth');
  res.redirect('/users/signin');
});
module.exports = router;
