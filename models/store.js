const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
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
    store_logo:{
        type: String
    },
    address1:{
        type: String,
        required: true
    },
    address2:{
        type: String
    },
    city:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    postal_code:{
        type: String,
        required: true
    },
    phone_number:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
    
});
module.exports = mongoose.model('Store', storeSchema);