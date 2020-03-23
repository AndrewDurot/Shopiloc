var Store = require('../models/store');
const { storeValidation, recordValidation } = require("../validation");


//Get Store
exports.get_store = async(req, res)=>
{
    console.log("here");
    try{
        var store = await Store.find({postal_code: req.body.postal_code});
        //res.status(200).send(store);
        res.redirect('/');
    }
    catch(err){
        res.status(500).send(err);
    }

}