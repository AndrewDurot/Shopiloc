var express = require('express');
var router = express.Router();
var store_services = require('../services/store');
var multer  = require('multer');
var path = require('path')

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

//Create Store 
router.post('/', upload.single('store_logo'), store_services.create_store);
//Get All Store
router.get('/', store_services.get_store);
//Get one Store 
router.get('/Details', store_services.get_single_store);
//Update Store
router.put('/', store_services.create_store);
//Delete Store
router.delete('/', store_services.create_store);
module.exports = router;