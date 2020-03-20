const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    Role_Name:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Role', roleSchema);