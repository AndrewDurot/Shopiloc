var express = require('express');
var router = express.Router();
var store_services = require('../services/store');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
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