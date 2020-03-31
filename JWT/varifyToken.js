const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    // console.log(req.header('auth-token'));
    // console.log(req.cookies.auth);
    //const token = req.header('auth-token');
    const token = req.cookies.auth;
    if(!token) return res.status(401).redirect('/users/signin');

    try{
        const verifeid = jwt.verify(token,"configtestingtoken");
        req.user = verifeid;
        next();
    }
    catch(err){
        res.status(400).redirect('/users/signin');
    }
}