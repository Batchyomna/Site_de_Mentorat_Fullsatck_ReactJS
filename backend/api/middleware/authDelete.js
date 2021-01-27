const jwt = require("jsonwebtoken");

 function authDelete(req, res, next){
    try{
        const decodedToken = jwt.verify(req.headers.authorization, 'MY_TOKEN_SECRET');
        if (decodedToken){
            console.log('im in delet next');
            next();
        }else{
            res.status(403).send('Accès non autorisé')
        } 
    }catch(err){
        console.log(err);
        // res.status(405).send('il y a des erreurs de connexion')
    }
   
};
module.exports = authDelete
   