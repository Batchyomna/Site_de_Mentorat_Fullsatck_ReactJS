// const mysql = require('mysql2');
const express = require('express')
const router = express.Router();


const connection = require('../database/connectionDB')
// const myAuth  = require('../middleware/authentication')
// const authSingUp = require('../middleware/authSignUp')
// const authDelete  = require('../middleware/authDelete')

 const jwt = require("jsonwebtoken");



//To hash a password:
const bcrypt = require('bcrypt');
const saltRounds = 10   // cost factor, The cost factor controls how much time is needed to calculate a single BCrypt hash. 

// parse application/x-www-form-urlencoded
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
//------------CORS
var cors = require('cors')
router.use(cors())
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');  //is a node.js package for providing a Connect/Express middleware 
  next();                                          //that can be used to enable CORS with various options.
});                                               // it is put here where we connect with the database and NOT in the API file
 
//-----déclare des fonctions
function generateAccessToken(id, mail, statut) {
    return jwt.sign({
      id: id,
      mail: mail,
      statut: statut
    }, 'x_TOKEN_SECRET', { expiresIn: '1800s' });  //expires after half an hour (1800 seconds = 30 minutes)
  }
//------------------------------------------3. API/post/sign-up-------------
router.post('/sign-up', function (req, res) {
    try {
      bcrypt.hash(req.body.mdp, saltRounds).then(function (hashPW) {
        if(req.body.statut === 'mentor')
        {
            const sql = `INSERT INTO mentor (nom_mentor, prenom_mentor, mail_mentor, mdp_mentor, photo_mentor, nom_SIREN, statut_mentor) VALUES ('${req.body.nom}', '${req.body.prenom}', '${req.body.mail}', '${hashPW}', '${req.body.photo}', '${req.body.nom_SIREN}', false)`;
            connection.query(sql)
            res.status(201).send('vos coordonnées comme mentor sont inscrits')
        }else if(req.body.statut === 'apprenti')
        {
            const sql = `INSERT INTO apprenti (nom_apprenti, prenom_apprenti, mail_apprenti, mdp_apprenti, photo_apprenti) VALUES ('${req.body.nom}', '${req.body.prenom}', '${req.body.mail}', '${hashPW}', '${req.body.photo}')`;
            connection.query(sql)
            res.status(201).send('vos coordonnées comme apprenti sont inscrits')
        }
      })
    
    } catch (err) {
      res.status(400).send('Il y a des errors')
      console.log(err);
    }
  }
);
//--------3. API/post/sign-in
router.post('/sign-in', (req, res) => {
    try {
        if(req.body.statut === 'admin'){
            connection.query("SELECT * FROM admin", function (err, alladmins, fields) {
                let admin = alladmins.filter(elem => elem.mail_admin === req.body.mail)
                if (admin.length > 0) {
                 bcrypt.compare(req.body.mdp, admin[0].mdp_admin).then(function (result) {
                       if (result == true) {
                       const token = generateAccessToken( admin[0].id_admin, admin[0].mail_admin, 'admin');
                       res.status(200).json(token);  //You are authrised
                       console.log('vous êtes bien un admin');
                       } else {
                       res.status(401).send("Vous avez oublié votre mot de pass?")
                       }
                   })
               } else {
                 res.status(404).send("Ce compte nous est inconnu")
               }
           })

        }else if(req.body.statut === 'mentor') {
            connection.query("SELECT * FROM mentor", function (err, allMentors, fields) {
                 let mentor = allMentors.filter(elem => elem.mail_mentor === req.body.mail)
                 if (mentor.length > 0) {
                  bcrypt.compare(req.body.mdp, mentor[0].mdp_mentor).then(function (result) {
                        if (result == true) {
                        const token = generateAccessToken( mentor[0].id_mentor, mentor[0].mail_mentor, 'mentor');
                        res.status(200).json(token);  //You are authrised
                        console.log('vous êtes bien un mentor');
                        } else {
                        res.status(401).send("Vous avez oublié votre mot de pass?")

                        }
                    })
                } else {
                  res.status(404).send("Ce compte nous est inconnu")
                }
            })
        }else if(req.body.statut === 'apprenti') {
            connection.query("SELECT * FROM apprenti", function (err, allapprentis, fields) {
                 let apprenti = allapprentis.filter(elem => elem.mail_apprenti === req.body.mail)
                 if (apprenti.length > 0) {
                  bcrypt.compare(req.body.mdp, apprenti[0].mdp_apprenti).then(function (result) {
                        if (result == true) {
                        const token = generateAccessToken( apprenti[0].id_apprenti, apprenti[0].mail_apprenti, 'apprenti');
                        res.status(200).json(token);  //You are authrised
                        console.log('vous êtes bien un apprenti');
                        } else {
                        res.status(401).send("Vous avez oublié votre mot de pass?")
                        }
                    })
                } else {
                  res.status(404).send("Ce compte nous est inconnu")
                }
            })
        }
    } catch (err) {
      console.log(err);
      res.status(500).send('Il y a une erreur de serveur')
    }
  });
// ------------3.API/get/apprenti/:id
router.get('/apprenti/:id', async (req, res) => {
    try {
     connection.query(`SELECT * FROM apprenti WHERE id_apprenti = ${req.params.id}`, function(err, result){
         if (err) throw err
        res.status(200).json(result[0]); 
     })
    } catch (err) {
      console.log(err);
    }
  });
//-----------------3.API/ GET /mentors
router.get('/mentors', (req, res) => {
    //Select all the mentors
    connection.query("SELECT * FROM mentor", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });
  //-------------3.API/post/admin
  router.post('/new-admin', (req, res)=>{
      try{
            bcrypt.hash(req.body.mdp, saltRounds).then(function (hashPW) {
                const sql = `INSERT INTO admin (mail_admin, mdp_admin) VALUES ('${req.body.mail}', '${hashPW}')`;
                connection.query(sql)
                res.status(201).send('vos coordonnées comme admin sont inscrits')
            })
        }catch(err){
            console.log(err);
        }
    })
//-------------3.API/delete/admin/non-valid/:idMentor
router.delete('/admin/non-valid/:idMentor', (req, res)=>{
    try{ 
        connection.query(`DELETE FROM mentor WHERE id_mentor ='${req.params.idMentor}'`, function (err, result) {
        if (err) throw err
        res.status(400).send('Il y a une erreur');
        console.log("Number of records deleted: " + result.affectedRows);
        res.status(200).send("Le mentor est bien supprimé")
        })
    }catch(err){
      console.log(err);
    }
})
//----------------3.API/post/admin/valid/:idMentor
router.put('/admin/valid/:idMentor', (req, res)=>{
    try{
     connection.query(`UPDATE mentor SET statut_mentor = true WHERE id_mentor = '${req.params.idMentor}'`);
     res.status(200).send("Le mentor est valid maintentant");
    }catch(err){
     console.log(err);
    }
})

module.exports = router;