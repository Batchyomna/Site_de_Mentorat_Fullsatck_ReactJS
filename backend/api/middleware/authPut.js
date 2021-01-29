
const jwt = require("jsonwebtoken");

function authPut(req, res, next){
    try{
        const decodedToken = jwt.verify(req.headers.authorization, 'MY_TOKEN_SECRET');
        if (decodedToken){
            console.log('im in put next');
            next();
        }else{
            res.status(403).end('Accès non autorisé')
        } 
    }catch(err){
        console.log(err);
        res.status(405).end('vous devez vous reconnctez, jwt expired')
    }
   
}
module.exports = authPut