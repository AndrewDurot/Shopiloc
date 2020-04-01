var Store = require('../models/store');
var i18n = require('i18n');
var cookieParser = require('cookie-parser');
var User = require('../models/user');
var requestIp = require('request-ip');

exports.getStore_Data = async(req, res) =>{

  var token = req.cookies.auth;
  if(!token) return res.redirect('/users/signin');
  let user = req.cookies.user;
  if(!token) return res.redirect('/users/signin');
  var store = await Store.find();
  var store_array = [];
  if(user.role == "store_expert"){
    store.forEach(element => {
      if(element.state.toLowerCase() == user.access_state.toLowerCase()){
        store_array.push(element);
      }
    });
  }
  else{
    store_array = store;
  }
  
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
  res.render('admin',{user: user, store: store_array, meta : meta_});
}
exports.get_users = async (req, res)=>{
  var token = req.cookies.auth;
  if(!token) return res.redirect('/users/signin');
  let user = req.cookies.user;
  var users = await User.find();
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
 
  res.render('user_list',{user: user, users: users, meta : meta_});

}
exports.edit_form = async (req, res) =>{
  var token = req.cookies.auth;
  if(!token) return res.redirect('/users/signin');
  
  i18n.setLocale("en");
  var store = await Store.findById(req.query._id);

  var lang_ = i18n.__('create_store');
  var meta_ = i18n.__('meta');
  if(store) return res.render('store_edit', { store: store, language : lang_, meta : meta_});
  res.redirect('/admin');
}
exports.update_store = async (req, res) =>{
  var token = req.cookies.auth;
  if(!token) return res.redirect('/users/signin');
  i18n.setLocale("en");
  var store = await Store.findById(req.body._id);
  var path_img = "";
  var res_path = store.store_logo;
  if(req.file){
    path_img = req.file.path;
    res_path = path_img.replace("uploads", "");
  }
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
  //store.postal_code = store;
  store.city = req.body.city;
  store.address1 = req.body.address1;
  store.address2 = req.body.address2;
  store.state = req.body.state;
  store.phone_number = req.body.phone_number;
  store.store_logo = res_path;

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
  var token = req.cookies.auth;
  if(!token) return res.redirect('/users/signin');
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
exports.delete_users = async(req, res) =>{
  var user = await User.findById(req.body._id);
  try{
    //console.log(user);
    var record = await user.remove();
    res.redirect('/admin/users');
  }
  catch(errr){
    console.log(err);
    res.redirect('/admin/users');
  }

}
exports.states = async(req, res)=>{
  var token = req.cookies.auth;
  if(!token) return res.redirect('/users/signin');
  var state_List = [];
  var store = await Store.find();

  store.forEach(element => {
    let state =element.state;
    state = state.replace(/ /g,'');
    state_List.push(state);
  });
  statesList = removeDups(state_List);
  res.send({states : statesList}); 
}
function removeDups(names) {
  let unique = {};
  names.forEach(function(i) {
    if(!unique[i]) {
      unique[i] = true;
    }
  });
  return Object.keys(unique);
}
