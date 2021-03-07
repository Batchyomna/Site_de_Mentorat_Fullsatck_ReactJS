const express = require('express')
const router = express.Router();
const connection = require('../database/connectionDB')
const authSingUp = require('../middleware/authSignUp')


const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const saltRounds = 10 
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
//------------CORS
var cors = require('cors')
router.use(cors())
router.use((req, res, next) => {
res.header('Access-Control-Allow-Origin', '*');  //is a node.js package for providing a Connect/Express middleware 
   next();                                          //that can be used to enable CORS with various options.
 });  
//-----déclare des fonctions
function generateAccessToken(id, mail) {
    return jwt.sign({
      id: id,
      mail: mail
    }, 'MY_TOKEN_SECRET', { expiresIn: '1800s' });  //expires after half an hour (1800 seconds = 30 minutes)
  }

//--------------------sign up---
router.post('/sign-up',authSingUp, function (req, res) {
    try {
      bcrypt.hash(req.body.mdp, saltRounds).then((hashPW) =>{
        if (req.body.statut === 'mentor') {
          let values = [[`${req.body.nom}`, `${req.body.prenom}`, `${req.body.mail}`, `${hashPW}` ,`${req.body.photo}`, `${req.body.nom_SIREN}`, false]]
          const sql =`INSERT INTO mentor (nom_mentor, prenom_mentor, mail_mentor, mdp_mentor, photo_mentor, nom_SIREN, statut_mentor) VALUES ?`;
          connection.query(sql,[values],(err, result) => {
            if (err) throw err
            res.status(201).send('vos coordonnées comme mentor sont inscrits')
        })    
        } else if (req.body.statut === 'apprenti') {
          let values = [[`${req.body.nom}`, `${req.body.prenom}`, `${req.body.mail}`, `${hashPW}` ,`${req.body.photo}`] ]
          const sql = `INSERT INTO apprenti (nom_apprenti, prenom_apprenti, mail_apprenti, mdp_apprenti, photo_apprenti) VALUES ?`;
          connection.query(sql,[values],(err, result) => {
            if (err) throw err
            res.status(201).send('vos coordonnées comme apprenti sont inscrits')
        }) 
        }
      })
    } catch (err) {
      res.status(400).send('Il y a des errors')
      console.log(err);
    }
  }
  );
//-----sign in
router.post('/sign-in', (req, res) => {
    try {
      if (req.body.statut === 'admin') {
        connection.query("SELECT * FROM admin", function (err, alladmins, fields) {
          let admin = alladmins.filter(elem => elem.mail_admin === req.body.mail)
          if (admin.length > 0) {
            bcrypt.compare(req.body.mdp, admin[0].mdp_admin).then(function (result) {
              if (result == true) {
                const token = generateAccessToken(admin[0].id_admin, admin[0].mail_admin);
                res.status(200).json({ token_admin: token, id: admin[0].id_admin });  //You are authrised
                console.log('vous êtes bien un admin');
              } else {
                res.status(201).json({msg:"Vous avez oublié votre mot de passe?"})
              }
            })
          } else {
            console.log('mail inconnu');
            res.status(203).json({msg:"Ce mail nous est inconnu, ou vous peut-être avez selectionné un mauvais statut"})
          }
        })
      } else if (req.body.statut === 'mentor') {
        connection.query("SELECT * FROM mentor", function (err, allMentors, fields) {
          let mentor = allMentors.filter(elem => elem.mail_mentor === req.body.mail)
          if (mentor.length > 0) {
            bcrypt.compare(req.body.mdp, mentor[0].mdp_mentor).then(function (result) {
              if (result == true) {
                const token = generateAccessToken(mentor[0].id_mentor, mentor[0].mail_mentor);
                res.status(200).json({ token_mentor: token, id: mentor[0].id_mentor, photo_mentor: mentor[0].photo_mentor, prenom_mentor: mentor[0].prenom_mentor });  //You are authrised
                console.log('vous êtes bien un mentor');
              } else {
                res.status(201).json({msg:"Vous avez oublié votre mot de passe?"})
              }
            })
          } else {
            console.log('mail inconnu');
            res.status(203).json({msg:"Ce mail nous est inconnu, ou vous peut-être avez selectionné un mauvais statut"})
          }
        })
      } else if (req.body.statut === 'apprenti') {
        connection.query("SELECT * FROM apprenti", function (err, allapprentis, fields) {
          let apprenti = allapprentis.filter(elem => elem.mail_apprenti === req.body.mail)
          if (apprenti.length > 0) {
            bcrypt.compare(req.body.mdp, apprenti[0].mdp_apprenti).then(function (result) {
              if (result == true) {
                const token = generateAccessToken(apprenti[0].id_apprenti, apprenti[0].mail_apprenti);
                res.status(200).json({ token_apprenti: token, id: apprenti[0].id_apprenti, photo_apprenti: apprenti[0].photo_apprenti, prenom_apprenti: apprenti[0].prenom_apprenti });  //You are authrised
                console.log('vous êtes bien un apprenti');
              } else {
                res.status(201).json({msg:"Vous avez oublié votre mot de passe?"})
              }
            })
          } else {
            console.log('mail inconnu');
            res.status(203).json({msg:"Ce mail nous est inconnu, ou vous peut-être avez selectionné un mauvais statut"})
          }
        })
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({msg:'Il y a une erreur de serveur'})
    }
  });

module.exports = router;