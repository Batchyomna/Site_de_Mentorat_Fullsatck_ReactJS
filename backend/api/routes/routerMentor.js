const express = require('express')
const router = express.Router();

const connection = require('../database/connectionDB')
const authPost  = require('../middleware/authPost')
const authDelete  = require('../middleware/authDelete')
const authPut = require('../middleware/authPut')

//pour securiser les password:
const bcrypt = require('bcrypt');
const saltRounds = 10   // cost factor, The cost factor controls how much time is needed to calculate a single BCrypt hash. 
const jwt = require("jsonwebtoken");

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
  }                                          // it is put here where we connect with the database and NOT in the API file

//---------3.API/GET/ avoir toutes les compétence qui sont ajouté par un mentor
router.get('/mentor/:id', async (req, res) => {
    try {
      connection.query(`SELECT * FROM competence WHERE id_mentor = ${req.params.id}`, function (err, result) {
        if (err) throw err
        res.status(200).json(result);
      })
    } catch (err) {
      console.log(err);
    }
});

//------status of mentor
router.get('/mentor/statut/:id', async (req, res) => {
    try {
      connection.query(`SELECT statut_mentor FROM mentor WHERE id_mentor = ${req.params.id}`, function (err, result) {
        if (err) throw err
        res.status(200).json(result[0]);
      })
    } catch (err) {
      console.log(err);
    }
});
//-------delete competence
router.delete('/mentor/delete/competence/:idComp',authDelete, (req, res) => { //delete ses compétences
    try {
      connection.query(`DELETE FROM competence WHERE id_competence ='${req.params.idComp}'`, function (err, result) {
        if (err) throw err
        console.log("Number of records deleted: " + result.affectedRows);
        res.status(200).send("la compétence est bien supprimée")
      })
    } catch (err) {
      console.log(err);
    }
})
//---------3.API/POST/ modifier les data de mentor et sauvegarder les nouveaux data
router.put('/user/mentor/edit-data/:id',authPut, (req, res) => {
    try {
      if(req.body){
        let data = Object.keys(req.body)
        if (req.body.mdp_mentor) {
          bcrypt.hash(req.body.mdp_mentor, saltRounds).then(function (hashPW) {
            var query = `UPDATE mentor SET `
            for (let i = 0; i < data.length; i++) {
              if (data[i] === 'mdp_mentor' & (i == data.length - 1)) {
                query += `${data[i]}` + ' = ' + `'${hashPW}'`               // pour sauvegarder mdp hashé et il est le dernier elem dans body
              }else if (data[i] === 'mdp_mentor' & (i != data.length - 1)){
                query += `${data[i]}` + ' = ' + `'${hashPW}'` + ', '
              } else if (i === data.length - 1) {
                query += `${data[i]}` + ' = ' + `'${req.body[data[i]]}'` //  req.body[prenom_mentor] est un autre façon de dire req.body.prenom_mentor
              } else {
                query += `${data[i]}` + ' = ' + `'${req.body[data[i]]}'` + ', '
              }
            }
            query +=` WHERE id_mentor = ${req.params.id}`;
            console.log(query);
            connection.query(query, function (err, resultat) {
              if (err) throw err;
              connection.query(`SELECT * FROM mentor WHERE id_mentor = '${req.params.id}'`, (error, result) => {
                if (error) throw error
                const token = generateAccessToken(result[0].id_mentor, result[0].mail_mentor);
                res.status(200).json({ id_mentor: result[0].id_mentor, token_mentor: token, prenom_mentor: result[0].prenom_mentor, mail_mentor: result[0].mail_mentor, photo_mentor: result[0].photo_mentor });
              })
            })
          })
        } else {
          var query = `UPDATE mentor SET `
          for (let i = 0; i < data.length; i++) {
            if (i == data.length - 1) {
              query += `${data[i]}` + ' = ' + `'${req.body[data[i]]}'` // req.body.prenom_mentor === req.body[prenom_mentor]
            } else {
              query += `${data[i]}` + ' = ' + `'${req.body[data[i]]}'` + ', '
            }
          }
          query += ` WHERE id_mentor = ${req.params.id}`;
          console.log(query);
          connection.query(query, function (err, resultat) {
            if (err) throw err;
            connection.query(`SELECT * FROM mentor WHERE id_mentor = '${req.params.id}'`, (error, result) => {
              if (error) throw error
              const token = generateAccessToken(result[0].id_mentor, result[0].mail_mentor);
              res.status(200).json({ id_mentor: result[0].id_mentor, token_mentor: token, prenom_mentor: result[0].prenom_mentor, mail_mentor: result[0].mail_mentor, photo_mentor: result[0].photo_mentor});
            })
          })
        }
      }else{
        res.status(205).json({msg: 'vous avez rien envoyé' });
      }
    } catch (err) {
      console.log(err);
    }
})
//----------3. API/post/new-competence
router.post('/mentor/new-competence/:id_mentor',authPost, (req, res) => {
    try {
      let values =[[`${req.params.id_mentor}`, `${req.body.titre}`, `${req.body.domaine}`, `${req.body.frequence}`, `${req.body.duree}`, `${req.body.premiere_date}`, `${req.body.description}`, false]]
      const sql = `INSERT INTO competence (id_mentor, titre, domaine, frequence, duree, premiere_date, description, reserve) VALUES ?`;
      connection.query(sql, [values],(err, result) => {
        if (err) throw err
        console.log(result);
      res.status(201).json({id_competence: result.insertId})
      })
    } catch (err) {
      console.log(err);
    }
})
// ------------3.API/get/mentor/:id
router.get('/mentor/:id', async (req, res) => {
    try {
      connection.query(`SELECT * FROM mentor WHERE id_mentor = ${req.params.id}`, function (err, result) {
        if (err) throw err
        res.status(200).json(result[0]);
      })
    } catch (err) {
      console.log(err);
    }
})
// ------------3.API/get/apprenti/all-competences
router.get('/mentor/session-competences/:id', async (req, res) => {
    try {
      connection.query(`SELECT a.*, b.date_session, b.id_session, c.nom_apprenti, c.mail_apprenti FROM competence as a LEFT JOIN session as b ON a.id_competence = b.id_competence LEFT JOIN apprenti as c ON a.id_apprenti = c.id_apprenti  WHERE id_mentor = ${req.params.id} AND reserve = true`, function (err, result) {
        if (err) throw err    
        res.status(200).json(result);
      })
    } catch (err) {
      console.log(err);
    }
});
//-------------3.API/post/new-session
router.post('/mentor/new-session',authPost, (req, res) => {
    try {
      const sql = `INSERT INTO session (id_competence, date_session) VALUES ('${req.body.id_competence}', '${req.body.date_session}')`;
      connection.query(sql)
      res.status(201).send('votre prochaine session est bien inscrits')
    } catch (err) {
      console.log(err);
    }
})
//---------------------------3.API/delete/compte/
router.delete('/user/mentor/delete-compte/:id',authDelete, (req, res) => {
    connection.query(`DELETE FROM mentor WHERE id_mentor = '${req.params.id}'`, function (err, result) {
      if (err) throw res.status(400).send('there is an error');
      console.log("Number of mentors deleted: " + result.affectedRows);
      res.status(200).send("Ce mentor est bien supprimé")
    })
})
//-------------3. API/GET/avoir tout les detail d'un competence et son mentor
router.get('/one-competence/:id', (req, res) => {
    try {
      connection.query(`SELECT a.*, b.photo_mentor, b.nom_mentor, b.prenom_mentor FROM competence as a LEFT JOIN mentor as b ON a.id_mentor = b.id_mentor WHERE id_competence= ${req.params.id}`, (err, result) => {
        if (err) throw err
        res.status(200).json(result)
      })
    } catch (err) {
      console.log(err);
    }
})
//--------update one compétence
router.put('/mentor/edit/competence/:idComp', (req,res)=>{
    try{
      // let values =[[ `${req.body.titre}`, `${req.body.domaine}`, `${req.body.frequence}`, `${req.body.duree}`, `${req.body.premiere_date}`, `${req.body.description}`]]
      const sql = `UPDATE competence SET titre = '${req.body.titre}', domaine = '${req.body.domaine}', frequence = '${req.body.frequence}', duree = '${req.body.duree}', premiere_date = '${req.body.premiere_date}', description= '${req.body.description}' WHERE id_competence = ${req.params.idComp}`;
      connection.query(sql,(err, result) => {
        if (err) throw err
        console.log(result);
      res.status(204).send('La compétence est mise à jour/ The resource updated successfully')
      })
    }catch(err){
      console.log(err);
    }
})

module.exports = router