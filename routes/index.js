var express = require('express');
var router = express.Router();
var user_Route = require('./users');
var store_Route = require('./store');
//var search_Route = require('./search');
var search_Route = require('./search');
var admin_Route = require('./admin');
const mongoose = require('mongoose');
var Store = require('../models/store');
var cookieParser = require('cookie-parser');
var i18n = require('i18n');
//router.use(cookieParser());
var home_services = require('../services/home');

i18n.configure({
  locales: ['en', 'ur', 'ar', 'fr'],
  cookie: 'lang',
  defaultLocale: 'en',
  directory: __dirname+'/locales'
});
router.use(i18n.init);
/* GET home page. */
router.get('/',(req, res, next)=>{
  var lang = req.cookies.lang;
  if(lang) i18n.setLocale(lang);
  var lang = i18n.__('home');
  res.render('index',
  {
      title: 'Shopiloc',
      language : lang
  });
});

router.post('/lang' , (req, res, next) =>{
  var lang = req.body.lang;
  res.cookie('lang',lang);
  res.send({language: lang});
});
/* Post home page. */
router.post('/', home_services.get_Search);
/* Store create Form */
router.get('/create', home_services.create_store);
//about page
router.get('/about', (req, res)=>{
  res.render('about');
})
//admon User 
router.use('/admin', admin_Route);
//Basic User 
router.use('/user', user_Route);
router.use('/store', store_Route);
// Search Store
router.use('/search', search_Route);
//Country List
router.get('/country_List', home_services.get_country);
//All country List
router.get('/country', home_services.get_all_country);
//All state List
router.get('/state', home_services.get_all_state);
//Url List
router.get('/Check_Url', home_services.Check_Url);
mongoose.connect(
  'mongodb+srv://shopiloc:ltsWrDCsJ4ueAvmK@rest-6ss50.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true },
  ()=> console.log("Connected to db!")
);
module.exports = router;