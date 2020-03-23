var express = require('express');
var router = express.Router();
var admin_services = require('../services/admin');

//Get Admin
router.get('/', admin_services.getStore_Data);
router.get('/create', admin_services.create_form);
module.exports = router;