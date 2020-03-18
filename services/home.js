var Store = require('../models/store');

exports.get_store = async (req, res)=>{
    res.render('index', { title: 'Express'});
}
function removeDups(names) {
    let unique = {};
    names.forEach(function(i) {
      if(!unique[i]) {
        unique[i] = true;
      }
    });
    return Object.keys(unique);
}
exports.get_country = async (req, res) =>{
    var country_List = [];
    var store = await Store.find();
    
    store.forEach(element => {
        country_List.push(element.country);
    });
    country_List = removeDups(country_List);
    res.send({country : country_List});
}
exports.get_Search = async (req, res)=>{
    try{
        console.log(req.body);
        var store = await Store.find({postal_code: req.body.postal_code, country : req.body.country_list});

        let isExist = false;
        if(req.body.postal_code == "55180")
        {
            isExist = true;

        }
        console.log("Here");
        console.log(store);
        //res.status(200).send(store);
        //res.render('index', { title: 'Express', data: store, isSearch: true, isExist : isExist, country_List : country_List  });
        res.render('index', { title: 'Express', data: store, isSearch: true, isExist : isExist, country_List : "" });
    //res.redirect('/');
    }
    catch(err){
        res.status(500).send(err);
    }
}