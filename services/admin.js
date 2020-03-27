var Store = require('../models/store');
var i18n = require('i18n');
var cookieParser = require('cookie-parser');
var requestIp = require('request-ip');

exports.getStore_Data = async(req, res) =>{

    var token = req.cookies.auth;
    if(!token) return res.redirect('/users/signin');
    console.log("admin here");
    var store = await Store.find();
    var ip = requestIp.getClientIp(req);
    var cookie_name = "lang"+ip;
    var lang = req.cookies[cookie_name];
    if(lang){
      i18n.setLocale(lang);
    } 
    else{
      i18n.setLocale("en");
    }
    var meta_ = i18n.__('meta');
    
    res.render('admin',{store: store, meta : meta_});
}
exports.create_form = (req, res) =>{
    var ip = requestIp.getClientIp(req);
    var cookie_name = "lang"+ip;
    var lang = req.cookies[cookie_name];
    if(lang){
      i18n.setLocale(lang);
    } 
    else{
      i18n.setLocale("en");
    }
   
    var lang_ = i18n.__('create_store');
    //console.log(lang.heading);
    res.render('store_create', { language : lang_});
    //res.render("store_create",)
}
