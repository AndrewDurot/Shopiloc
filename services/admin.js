var Store = require('../models/store');

exports.getStore_Data = (req, res) =>{
    console.log("admin here");
    res.render('admin')
}
exports.create_form = (req, res) =>{
    res.render("store_create")
}
