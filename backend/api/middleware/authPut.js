const jwt = require("jsonwebtoken");

 function authPut(req, res, next){
    try{
        const decodedToken = jwt.verify(req.headers.authorization, 'MY_TOKEN_SECRET');
        if (decodedToken){
            next();
        }else{
            res.status(401).end('Mouvaise requête')
        } 
    }catch(err){
        res.status(402).send('il y a des erreurs')
    }
   
};
module.exports = authPut