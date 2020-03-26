var Store = require('../models/store');
const { storeValidation, recordValidation } = require("../validation");
var zipcodes = require('zipcodes');

//Post Store 
exports.create_store = async(req, res)=>
{
   
    const { error } = storeValidation(req.body);
    if( error )
    {
        res.status(400).send(error.details[0].message);
        return;
    }
    var path_img = "";
    var res_path = "";
    if(req.file){
        path_img = req.file.path;
        res_path = path_img.replace("uploads", "");
    }
    
    var postal_code;
    if(req.body.country.toLowerCase() == "canada" || req.body.country.toLowerCase() == "united states"){
        
        console.log(req.body.postal_code);
        var rad = zipcodes.radius(req.body.postal_code, 5);
        var post_Address = [];
        if(req.body.postal_code.includes(" ")){
            var code_ = req.body.postal_code.split(" ");
            code_ = code_[0].toLowerCase();
            post_Address.push(code_);
        }
        else{
            if(req.body.country.toLowerCase() == "canada"){
                var code = req.body.postal_code.toLowerCase();
                code = code.substr(0, 3);
                post_Address.push(code.toLowerCase());
            }
            else{
                post_Address.push(req.body.postal_code.toLowerCase());
            }
            
        }
        rad.forEach(element => {
            let ele = element.toLowerCase()
            post_Address.push(ele)
        });
        postal_code = post_Address;
        console.log(postal_code);
    }
    else{
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

    }
    
    
    var url = req.body.store_url;
    if(url.includes("https://") || url.includes("http://"))
    {
        url = url.split("://");
        url = url[1];
    
    }
    const store = new Store({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        industry : req.body.industry,
        store_type: req.body.store_type,
        store_name : req.body.store_name,
        store_url : url,
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

exports.delete_single_store = async(req, res)=>{
    console.log(req.body);
    
    var store = await Store.findById(req.body._id);
      try{
        var record = await store.remove();
        res.redirect('/admin');
    }
    catch(errr){
        console.log(err);
        res.redirect('/admin');
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