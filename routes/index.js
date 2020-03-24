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
var ip_module = require('ip');
var geoip = require('geoip-lite');
router.use(cookieParser());
const publicIp = require('public-ip');
var home_services = require('../services/home');

i18n.configure({
  locales: ['en', 'ur', 'ar', 'fr'],
  cookie: 'lang',
  defaultLocale: 'en',
  directory: __dirname+'/locales'
});
router.use(i18n.init);

/* GET home page. */
router.get('/', async(req, res, next)=>{
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
router.post('/', async(req, res, next) =>{
  
  try{
    var lang = req.cookies.lang;
    if(lang) i18n.setLocale(lang);
    var lang = i18n.__('home');
    console.log(req.body);
    var code = req.body.postal_code.toLowerCase();
    console.log(code);
    var store = await Store.find({postal_code: code, country : req.body.country_list, status : "true"});
    
    let isExist = false;
    if(store.length > 0)
    {
        isExist = true;

    }
    console.log("Here");
    console.log(store);
    //res.status(200).send(store);
    //res.render('index', { title: 'Express', data: store, isSearch: true, isExist : isExist, country_List : country_List  });
    res.render('index', { title: 'Express', data: store, isSearch: true, result_count: store.length, postal_code: req.body.postal_code, isExist : isExist, country_List : "",  language : lang });
  //res.redirect('/');
  }
  catch(err){
    res.status(500).send(err);
  }
});
/* Store create Form */
router.get('/create', home_services.create_store);
//about page
router.get('/about', (req, res)=>{
  var lang = req.cookies.lang;
  if(lang) i18n.setLocale(lang);
  var lang = i18n.__('about');
  res.render('about',{ language : lang});
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
