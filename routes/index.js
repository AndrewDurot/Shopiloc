var express = require('express');
var router = express.Router();
var user_Route = require('./users');
var store_Route = require('./store');
//var search_Route = require('./search');
var search_Route = require('./search');
const mongoose = require('mongoose');
var Store = require('../models/store')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Post home page. */
router.post('/', async function(req, res, next) {
  try{
    var store = await Store.find({postal_code: req.body.postal_code});
    let isExist = false;
    if(req.body.postal_code == "55180")
    {
      isExist = true;

    }
    //res.status(200).send(store);
    res.render('index', { title: 'Express', data: store, isSearch: true, isExist : isExist });
    //res.redirect('/');
  }
  catch(err){
    res.status(500).send(err);
  }

 
});

//Basic User 
router.use('/user', user_Route);
router.use('/store', store_Route);
// Search Store
router.use('/search', search_Route);

mongoose.connect(
  'mongodb+srv://Farukh:110581F.A@rest-6ss50.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true },
  ()=> console.log("Connected to db!")
);
module.exports = router;
