var User = require('../models/user');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const requestIp = require('request-ip');
const i18n = require('i18n');
//var cors = require('cors')
//router.use(cors);


//Login Get Method
exports.get_sign_in = async (req, res)=>{
    var token = req.cookies.auth;
    if(token) return res.redirect('/admin');
   
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
    res.render('signin', {success : true, meta :meta_});
}


//Login Post Method
exports.sign_in = async (req, res)=>{
    const { error } = loginValidation(req.body);
    if( error )
    {
        res.status(400).send(error.details[0].message);
        return;
    }
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.render('signin',{'message': "Invalid details", success : false});//res.status(400).send({success : false, message: 'Email is not found'});
    //Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.render('signin',{'message': "Invalid details" , success : false});//res.status(400).send({success: false, message : 'Invalid password'});
  //Create and assign a token.
    const token = jwt.sign({_id: user._id}, "configtestingtoken");
    res.cookie('auth',token);
    res.header('auth-token', token).redirect('/admin');
    // res.header('auth-token',token).send({ success:true,message:"Successfully Login",
    //     token
    // });

    //res.send('NOT IMPLEMENTED: Genre list');
}
exports.register = async (req, res)=>{

    const { error } = registerValidation(req.body);
 
    if ( error ) return res.status(400).send(error.details[0].message);

    //Checking if user is already in the database.

    const emailEsist = await User.findOne({email: req.body.email});
    if(emailEsist) return res.status(400).send('Email already exists');
    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new User with hash password
    const user = new User({
        last_name : req.body.last_name,
        first_name: req.body.first_name,
        email : req.body.email,
        password : hashPassword,
        
    });
    try{
        //console.log(user);
        const savedUser = await user.save();
        //console.log(savedUser);
        res.send(savedUser);
    }
    catch(err){
        res.status(400).send(err);
    }
}
