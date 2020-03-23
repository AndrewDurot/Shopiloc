var express = require('express');
var router = express.Router();
var search_services = require('../services/search');

//Get Search Result

router.get('/', search_services.get_store);
module.exports = router;