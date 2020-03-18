var Store = require('../models/store');

exports.getStore_Data = async(req, res) =>{
    console.log("admin here");
    var store = await Store.find();
    
    res.render('admin',{store: store});
}
exports.create_form = (req, res) =>{
    res.render("store_create")
}
