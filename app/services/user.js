const userModel = require('../models/user');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.get_sign_in = async (req, res) => {
    const token = req.cookies.auth;
    if (token) return res.redirect('/admin');
    res.render('signin', {success: true});
};

exports.sign_in = async (req, res) => {
    const {error} = loginValidation(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const user = await userModel.findOne({email: req.body.email});
    if (!user) return res.render('signin', {'message': "Invalid details", success: false});//res.status(400).send({success : false, message: 'Email is not found'});
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.render('signin', {'message': "Invalid details", success: false});//res.status(400).send({success: false, message : 'Invalid password'});
    const token = jwt.sign({_id: user._id}, "configtestingtoken");
    res.cookie('auth', token);
    res.header('auth-token', token).redirect('/admin');
};

exports.register = async (req, res) => {
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const emailExist = await userModel.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('Email already exists');
    //TODO: how to proper chose the Salt? (ENV)
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new userModel({
        last_name: req.body.last_name,
        first_name: req.body.first_name,
        email: req.body.email,
        password: hashPassword,

    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
};
