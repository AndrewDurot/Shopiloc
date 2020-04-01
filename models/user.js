const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
        required : true,
    },
    address2 :{
        type: String,
        
    },
    city :{
        type: String,
        required : true,
    },
    state :{
        type: String,
        required : true,
    },
    postal_code :{
        type: String,
        required : true,
    },
    phone_number :{
        type: String,
        required : true,
    },
    profile_picture :{
        type: String,
        
    },
    role :{
        type: String,
        required : true,
    },
    description:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    },
    
    access_state :{
        type: String,
        required : true,
    },
    date:{
        type: Date,
        default: Date.now
    }
    
});
module.exports = mongoose.model('User', userSchema);