var Store = require('../models/store');
const { storeValidation, recordValidation } = require("../validation");

//Post Store 
exports.create_store = async(req, res)=>
{
    console.log(req.body);
    const { error } = storeValidation(req.body);
    if( error )
    {
        res.status(400).send(error.details[0].message);
        return;
    }
    const store = new Store(req.body);
    try{
        const savedStore = await store.save();
        res.redirect('/admin')
        //res.send(savedStore);
    }
    catch(err){
        res.status(400).send(err);
    }
    res.status(200).send(store);
}

//Edit Store
exports.edit_store = async(req, res)=>
{
    const { error } = storeValidation(req.body);
    if( error )
    {
        res.status(400).send(error.details[0].message);
        return;
    }


}

//Get Store
exports.get_store = async(req, res)=>
{

    
    try{
        var store = await Store.find();
        res.status(200).send(store);
    }
    catch(err){
        res.status(500).send(err);
    }

}

//
//Get Single Store
exports.get_single_store = async(req, res)=>
{

    const { error } = recordValidation(req.body);
    if( error )
    {
        res.status(400).send(error.details[0].message);
        return;
    }
    try{
        var store = Store.findById(req.body._id);
        res.status(200).send(store);
    }
    catch(err){
        res.status(500).send(err);
    }

}