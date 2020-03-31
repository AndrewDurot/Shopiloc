var express = require('express');
var router = express.Router();
var user_services = require('../services/user');
var multer  = require('multer');
var path = require('path');

router.use(express.static(__dirname));
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, './uploads')
    },
    filename: function(req, file, callback) {
      console.log(file)
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
const fileFilter = (req, file, cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
};
var upload = multer({ 
    storage: storage,
    limits:{
      fileSize:  1024 * 1024 * 5
    },
    fileFilter: fileFilter 
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/signin', user_services.get_sign_in);
//SignIn Route
router.post('/signin', user_services.sign_in);
//Register Route
router.get('/create', user_services.get_signup);
router.post('/create', upload.single('profile_picture'), user_services.signup);

router.post('/signup', user_services.register);
router.get('/logout', async(req, res, next)=>{
  res.clearCookie('auth');
  res.clearCookie('user');
  //res.clearCookie('access');
  res.redirect('/users/signin');
});
module.exports = router;
