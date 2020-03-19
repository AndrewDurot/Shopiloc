var express = require('express');
var router = express.Router();
var store_services = require('../services/store');
var multer  = require('multer');
var path = require('path')

router.use(express.static(__dirname));
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, path.join(__dirname, '/uploads/'));
    },
    filename: (req, file, cb)=>{
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});
var upload = multer({ storage: storage });

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