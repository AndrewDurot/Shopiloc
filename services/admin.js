var Store = require('../models/store');

exports.getStore_Data = async(req, res) =>{
    var token = req.cookies.auth;
    if(!token) return res.redirect('/users/signin');
    console.log("admin here");
    var store = await Store.find();
    
    res.render('admin',{store: store});
}
exports.create_form = (req, res) =>{
    res.render("store_create")
}
