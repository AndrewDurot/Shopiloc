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
    date:{
        type: Date,
        default: Date.now
    }
    
});
module.exports = mongoose.model('User', userSchema);