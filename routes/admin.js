var express = require('express');
var router = express.Router();
var admin_services = require('../services/admin');
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
//Get Admin
router.get('/', admin_services.getStore_Data);
router.get('/users', admin_services.get_users);
router.post('/user/delete', admin_services.delete_users);
router.get('/create', admin_services.create_form);
router.get('/store', admin_services.edit_form);
router.get('/states', admin_services.states);
router.post('/store',  upload.single('store_logo'), admin_services.update_store);
module.exports = router;