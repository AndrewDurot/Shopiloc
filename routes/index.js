var express = require('express');
var router = express.Router();
var user_Route = require('./users');
var store_Route = require('./store');
//var search_Route = require('./search');
var search_Route = require('./search');
const mongoose = require('mongoose');
var Store = require('../models/store');
var home_services = require('../services/home');

/* GET home page. */
router.get('/', home_services.get_store);


/* Post home page. */
router.post('/', home_services.get_Search);

//Basic User 
router.use('/user', user_Route);
router.use('/store', store_Route);
// Search Store
router.use('/search', search_Route);
//Country List
router.get('/country_List', home_services.get_country);

mongoose.connect(
  'mongodb+srv://Farukh:110581F.A@rest-6ss50.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true },
  ()=> console.log("Connected to db!")
);
module.exports = router;
