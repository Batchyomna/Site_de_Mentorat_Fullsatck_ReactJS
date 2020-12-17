// const mysql = require('mysql2');
const express = require('express')
const router = express.Router();


const connection = require('../database/connectionDB')
// const myAuth  = require('../middleware/authentication')
// const authSingUp = require('../middleware/authSignUp')
// const authDelete  = require('../middleware/authDelete')

// const jwt = require("jsonwebtoken");



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
 

//-----------------------------------------Sign up--------------
router.post('/sign-up', function (req, res) {
    try {
      bcrypt.hash(req.body.mdp, saltRounds).then(function (hashPW) {
        if(req.body.statut === 'mentor')
        {
            const sql = `INSERT INTO mentor (nom_mentor, prenom_mentor, mail_mentor, MDP_mentor, photo_mentor, nom_SIREN, statut_mentor) VALUES ('${req.body.nom}', '${req.body.prenom}', '${req.body.mail}', '${hashPW}', '${req.body.photo}', '${req.body.nom_SIREN}', 'false')`;
            connection.query(sql)
            res.status(201).send('vos coordonnées comme mentor sont inscrits')
        }else if(req.body.statut === 'apprenti')
        {
            const sql = `INSERT INTO apprenti (nom_apprenti, prenom_apprenti, mail_apprenti, MDP_apprenti, photo_apprenti) VALUES ('${req.body.nom}', '${req.body.prenom}', '${req.body.mail}', '${hashPW}', '${req.body.photo}')`;
            connection.query(sql)
            res.status(201).send('vos coordonnées comme apprenti sont inscrits')
        }
      })
    
    } catch (err) {
      console.log(err);
    }
  }
);
//----------------- GET /apprenti/ id
router.get('/mentors', (req, res) => {
    //Select all the mentors
    connection.query("SELECT * FROM mentor", function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
  });


  module.exports = router;