const jwt = require("jsonwebtoken");

 function authDelete(req, res, next){
    try{
        const decodedToken = jwt.verify(req.headers.authorization, 'MY_TOKEN_SECRET');
        if (decodedToken){
            next();
        }else{
            res.status(401).end('Mouvaise requête')
        } 
    }catch(err){
        
        res.status(401).send('il y a des erreurs')
    }
   
};
module.exports = authDelete
   