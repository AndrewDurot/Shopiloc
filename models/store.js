const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    industry:{
        type: String,
        required: true
    },
    store_type:{
        type: String
        //required: true
    },
    store_name:{
        type: String,
        required: true
    },

    store_name:{
        type: String,
        required: true
    },
    store_url:{
        type: String
       
    },
    status:{
        type: String
    },
    store_description:{
        type: String
    },
    address1:{
        type: String
    },
    address2:{
        type: String
    },
    phone_number:{
        type: String
    },
    state:{
        type: String
    },
    store_logo:{
        type: String
    },
    
    country:{
        type: String,
        required: true
    },
    postal_code:{
        type: [],
        required: true
    },

    date:{
        type: Date,
        default: Date.now
    }
    
});
module.exports = mongoose.model('Store', storeSchema);