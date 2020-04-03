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
const requestIp = require('request-ip');
const dotenv = require('dotenv');
router.use(cookieParser());
const publicIp = require('public-ip');
var home_services = require('../services/home');
const verify = require('../JWT/varifyToken');



dotenv.config();
i18n.configure({
  locales: ['en', 'ur', 'ar', 'fr','nl'],
  cookie: 'lang',
  defaultLocale: 'en',
  directory: __dirname+'/locales'
});
router.use(i18n.init);


router.get('/fr', async(req, res, next)=>{
  var ip = requestIp.getClientIp(req);
  console.log(requestIp.getClientIp(req));
  var lang = req.body.lang;
  res.cookie('lang'+ip, lang, { maxAge: 900000 });
  i18n.setLocale("fr");
  var lang_ = i18n.__('home');
  var meta_ = i18n.__('meta');
  res.render('index',
  {
    title: 'Shopiloc',
    language : lang_,
    meta : meta_
  });
});

router.get('/nl', async(req, res, next)=>{
  var ip = requestIp.getClientIp(req);
  //console.log(requestIp.getClientIp(req));
  var lang = req.body.lang;
  res.cookie('lang'+ip, lang, { maxAge: 900000 });
  i18n.setLocale("nl");
  var lang_ = i18n.__('home');
  var meta_ = i18n.__('meta');
  res.render('index',
  {
    title: 'Shopiloc',
    language : lang_,
    meta : meta_
  });
});

/* GET home page. */
router.get('/', async(req, res, next)=>{
  var ip = requestIp.getClientIp(req);
  var cookie_name = "lang"+ip;
  var lang = req.cookies[cookie_name];
  if(lang){
    i18n.setLocale(lang);
  } 
  else{
    i18n.setLocale("en");
  }
  var lang_ = i18n.__('home');
  var meta_ = i18n.__('meta');
  res.render('index',
  {
    title: 'Shopiloc',
    language : lang_,
    meta : meta_
  });
});

router.post('/lang' , (req, res, next) =>{
  var ip = requestIp.getClientIp(req);
  var lang = req.body.lang;
  //res.cookie('region'+ip, req.body.region, { maxAge: 900000 })
  res.cookie('lang'+ip, lang, { maxAge: 900000 });
  res.send({language: lang});
});
/* Post home page. */
router.post('/', async(req, res, next) =>{
  
  try{
    var ip = requestIp.getClientIp(req);
    var cookie_name = "lang"+ip;
    var lang = req.cookies[cookie_name];
    if(lang){
      i18n.setLocale(lang);
    } 
    else{
      i18n.setLocale("en");
    }
    var lang_ = i18n.__('home');
    var meta_ = i18n.__('meta');
    var code;
    if(req.body.country_list.toLowerCase() == "canada" || req.body.country_list.toLowerCase().includes("canada")){
      if(req.body.postal_code.includes(" ")){
        code = req.body.postal_code.split(" ");
        code = code[0].toLowerCase();
      }
      else{
        code = req.body.postal_code.substr(0, 3);
        code = code.toLowerCase();
        
      }
      //console.log(code);
    }
    else{
      code = req.body.postal_code.toLowerCase();
      code = code.replace(/\s/g, "")  
      code = code.replace(/ /g,'');
    }
    //console.log(code);
    
    
    var store = await Store.find({postal_code: code, country : req.body.country_list, status : "true" });
    
    let isExist = false;
    if(store.length > 0)
    {
        isExist = true;

    }
    //res.status(200).send(store);
    //res.render('index', { title: 'Express', data: store, isSearch: true, isExist : isExist, country_List : country_List  });
    res.render('index', { title: 'Express', data: store, isSearch: true, result_count: store.length, postal_code: req.body.postal_code, isExist : isExist, country_List : "",  language : lang_, meta : meta_ });
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
  var ip = requestIp.getClientIp(req);
  var cookie_name = "lang"+ip;
  //console.log(cookie_name);
  var lang = req.cookies[cookie_name];
  if(lang) i18n.setLocale(lang);
  var lang_ = i18n.__('about');
  var meta_ = i18n.__('meta');
  res.render('about',{ language : lang_, meta : meta_});
  
});
router.post('/region', (req, res)=>{
  var ip = requestIp.getClientIp(req);
  res.cookie('region'+ip, req.body.region, { maxAge: 900000 });
  console.log(req.body.region);
  res.send({region: req.body.region});
})
router.get('/experts', home_services.experts)
//admon User 
router.use('/admin',  admin_Route);
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
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  ()=> console.log("Connected to db!")
);
module.exports = router;
