const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required : true
    },
    address1 :{
        type: String,
        required : false,
    },
    address2 :{
        type: String,
        
    },
    city :{
        type: String,
        required : false,
    },
    state :{
        type: String,
        required : false,
    },
    postal_code :{
        type: String,
        required : false,
    },
    phone_number :{
        type: String,
        required : false,
    },
    profile_picture :{
        type: String,
        
    },
    role :{
        type: String,
        required : false,
    },
    description:{
        type: String,
        required: false
    },
    url:{
        type: String,
        required: false
    },
    
    access_state :{
        type: String,
        required : false,
    },
    date:{
        type: Date,
        default: Date.now
    }, 
    resetPasswordToken: {
        type: String,
        required: false
    },

    resetPasswordExpires: {
        type: Date,
        required: false
    },
    
    
},{timestamps: true});
UserSchema.pre('save',  function(next) {
    const user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    let payload = {
        id: this._id,
        email: this.email,
        firstName: this.first_name,
        lastName: this.last_name,

    };

    return jwt.sign(payload, "configtestingtoken", {
        expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
    });
};
UserSchema.methods.generatePasswordReset = function() {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

mongoose.set('useFindAndModify', false);
module.exports = mongoose.model('User', UserSchema);