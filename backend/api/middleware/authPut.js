const jwt = require("jsonwebtoken");
function authPut(req, res, next){
    // try{
        const x = jwt.verify(req.headers.Authorization, 'MY_TOKEN_SECRET', function(err, decoded) {
            if (err) throw err;
            console.log(decoded);
        });
        console.log('result of decodedddddddd',x);
        if (x != true) {
            console.log('erroooooor PUT');
             res.status(405).send('vous devez vous reconncter, jwt expired')
        } else {
            next()
        }
    }
    
    //     if (decodedToken){
    //         console.log('im in put next');
    //         next();
    //     }else{
    //         res.status(403).end("il n'y a pas un Token")
    //         console.log('else put');
    //     } 
    // }catch(err){
    //     console.log(err);
    //     console.log('erroooooor PUT');
    //     res.status(405).send('vous devez vous reconncter, jwt expired')
    // }
   

module.exports = authPut