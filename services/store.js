var Store = require('../models/store');
const { storeValidation, recordValidation } = require("../validation");

//Post Store 
exports.create_store = async(req, res)=>
{
   
    const { error } = storeValidation(req.body);
    if( error )
    {
        res.status(400).send(error.details[0].message);
        return;
    }
    var path_img = req.file.path;
    var res_path = path_img.replace("uploads", "");
    var postal_code;
    if(req.body.postal_code.includes(","))
    {
        let array = [];
        postal_code = req.body.postal_code.split(",");
        postal_code.forEach(element => {
            if(element != " "){
                var elements = element.trim().split(/\s*,\s*/);
                
                elements = elements[0].replace(/ /g,'');
                elements = elements.toLowerCase();
                if(elements != ""){
                    array.push(elements);
                }
                
            }
            
        });
        console.log(array);
        postal_code = array;
    }
    else
    {
        postal_code = req.body.postal_code.toLowerCase();
    }
    const store = new Store({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        industry : req.body.industry,
        store_type: req.body.example1,
        store_name : req.body.store_name,
        store_url : req.body.store_url,
        status : req.body.status,
        store_description : req.body.store_description,
        country : req.body.country,
        postal_code : postal_code,
        city : req.body.city,
        address1: req.body.address1,
        address2: req.body.address2,
        state: req.body.state,
        phone_number: req.body.phone_number,
        store_logo : res_path
    });
    try{
        const savedStore = await store.save();
        if(savedStore.status == "false")
        {
            res.redirect('/create?success=true');
        }
        res.redirect('/admin');
        //res.send(savedStore);
    }
    catch(err){
        res.status(400).send(err);
    }
    //res.send(store);
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

//Patch method
exports.patch_store = async(req, res)=>
{
    // const { error } = storeValidation(req.body);
    // if( error )
    // {
    //     res.status(400).send(error.details[0].message);
    //     return;
    // }
    var store = await Store.findById(req.body._id);
    if(store != null){
        if(req.body.status == "true"){
            store.status = "false";
        }
        else{
            store.status = "true";
        }
        try{
            var update = await store.save();
            res.redirect('/admin');
        }
        catch(err){
            res.redirect('/admin');
        }
    }

}