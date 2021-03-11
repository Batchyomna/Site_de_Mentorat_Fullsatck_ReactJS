const jwt = require("jsonwebtoken");

 function authPost(req, res, next){
    jwt.verify(req.headers.authorization,'MY_TOKEN_SECRET', function(err, decodedToken) {
        if (err) throw err;
        if (decodedToken) {
            console.log('dans le next de post');
            next()
        } else {
            res.status(405).send('vous devez vous reconncter, jwt expired')
        }
   });
   
}
module.exports = authPost