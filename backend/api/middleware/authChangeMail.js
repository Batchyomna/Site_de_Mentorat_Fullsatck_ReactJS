const connection = require('../database/connectionDB')

const authChangeMail = function(req, res, next){
  if(req.body.mail && req.body.statut === 'mentor'){
    connection.query("SELECT mail_mentor FROM mentor", function (err, result, fields) {
      if (err) throw err;
      let theMail = result.find(element => element.mail_mentor === req.body.mail)
      if (theMail) {
        res.status(202).send('Ce mail est déjà utilisé vous devez choisir un autre mail')   //status(202)= to solve this problem in the part .then of axios
      } else {
        next()
      }
    })
  }else if( req.body.mail && req.body.statut === 'apprenti'){
    connection.query("SELECT mail_apprenti FROM apprenti", function (err, result, fields){
      if (err) throw err;
      let theMail = result.find(element => element.mail_apprenti === req.body.mail)
      if (theMail) {
        res.status(202).send('Ce mail est déjà utilisé vous devez choisir un autre mail')    //status(202)= to solve this problem in the part .then of axios
      } else {
        next()
      }
    })
    }else if(req.body.mail && req.body.statut === 'admin'){
        connection.query(`SELECT * FROM admin WHERE mail_admin = ${req.body.mail}`, (error, result)=>{
            if (error) throw error
            if(result){
                res.status(202).send('Ce mail est déjà utilisé vous devez choisir un autre mail')    //status(202)= to solve this problem in the part .then of axios
            }else{
                next()
            }
        })
    }
    
}
module.exports = authChangeMail
