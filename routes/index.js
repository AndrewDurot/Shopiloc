var express = require('express');
var router = express.Router();
var user_Route = require('./users');
var store_Route = require('./store');
const mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//Basic User 
router.use('/user', user_Route);
router.use('/store', store_Route);
// 

mongoose.connect(
  'mongodb+srv://Farukh:110581F.A@rest-6ss50.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true },
  ()=> console.log("Connected to db!")
);
module.exports = router;
