const storeModel = require('../models/store');

exports.getStore_Data = async (req, res) => {
    const token = req.cookies.auth;
    if (!token) return res.redirect('/users/signin');
    console.log("admin here");
    const store = await storeModel.find();
    res.render('admin', {store: store});
};

exports.create_form = (req, res) => {
    res.render("store_create")
};
