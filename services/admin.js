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
exports.edit_form = async (req, res) =>{
  console.log(req.query);
  i18n.setLocale("en");
  var store = await Store.findById(req.query._id);

  var lang_ = i18n.__('create_store');
  var meta_ = i18n.__('meta');
  console.log(store);
  res.render('store_edit', { store: store, language : lang_, meta : meta_});
}
exports.update_store = async (req, res) =>{
  console.log(req.body);
  i18n.setLocale("en");

  var store = await Store.findById(req.body._id);
  
  var lang_ = i18n.__('create_store');
  var meta_ = i18n.__('meta');
  var url = req.body.store_url;
  if(url.includes("https://") || url.includes("http://"))
  {
      url = url.split("://");
      url = url[1];
  
  }
  store.first_name = req.body.first_name;
  store.last_name = req.body.last_name;
  store.email = req.body.email;
  store.industry = req.body.industry;
  store.store_type = req.body.store_type;
  store.store_name = req.body.store_name;
  store.store_url = url;
  store.status = req.body.status;
  store.store_description = req.body.store_description;
  store.country = req.body.country;
  store.postal_code = req.body.postal_code;
  store.city = req.body.city;
  store.address1 = req.body.address1;
  store.address2 = req.body.address2;
  store.state = req.body.state;
  store.phone_number = req.body.phone_number;
  store.store_logo = req.body.store_logo;

  try{
    var save = await store.save();
    
    res.redirect('/admin');
  }catch(err){
    res.send({error: err});
  }
  //console.log(store);
  //res.render('store_edit', { store: store, language : lang_, meta : meta_});
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
