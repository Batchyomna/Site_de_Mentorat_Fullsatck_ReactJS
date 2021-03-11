const express = require('express')
const router = express.Router();
var cors = require('cors')
router.use(cors())
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');  //is a node.js package for providing a Connect/Express middleware 
  next();                                          //that can be used to enable CORS with various options.
});

const connection = require('../database/connectionDB')
const authPost = require('../middleware/authPost')
const authDelete = require('../middleware/authDelete')
const authPut = require('../middleware/authPut')

const nodemailer = require('nodemailer');

//pour securiser les password:
const bcrypt = require('bcrypt');
const saltRounds = 10   // cost factor, The cost factor controls how much time is needed to calculate a single BCrypt hash. 
const jwt = require("jsonwebtoken");

//-----déclare des fonctions
function generateAccessToken(id, mail) {
  return jwt.sign({
    id: id,
    mail: mail
  }, 'MY_TOKEN_SECRET', { expiresIn: '1800s' });  //expires after half an hour (1800 seconds = 30 minutes)
}                                          // it is put here where we connect with the database and NOT in the API file

// ------------3.API/get/apprenti/:id
router.get('/apprenti/:id', async (req, res) => {
  try {
    connection.query(`SELECT * FROM apprenti WHERE id_apprenti = ${req.params.id}`, function (err, result) {
      if (err) throw err
      res.status(200).json(result[0]);
    })
  } catch (err) {
    console.log(err);
  }
});
//------------3. API/PUT/user/apprenti/edit-data
router.put('/user/apprenti/edit-data/:id', authPut, (req, res) => {
  try {
    if (req.body) {
      let data = Object.keys(req.body)
      if (req.body.mdp_apprenti) {
        bcrypt.hash(req.body.mdp_apprenti, saltRounds).then(function (hashPW) {
          var query = `UPDATE apprenti SET `
          for (let i = 0; i < data.length; i++) {
            if (data[i] === 'mdp_apprenti' & (i == data.length - 1)) {
              query += `${data[i]}` + ' = ' + `'${hashPW}'`               // pour sauvegarder mdp hashé et il est le dernier elem dans body
            } else if (data[i] === 'mdp_apprenti' & (i != data.length - 1)) {
              query += `${data[i]}` + ' = ' + `'${hashPW}'` + ', '
            } else if (i == data.length - 1) {
              query += `${data[i]}` + ' = ' + `'${req.body[data[i]]}'` // req.body.prenom_apprenti === req.body[prenom_apprenti]
            } else {
              query += `${data[i]}` + ' = ' + `'${req.body[data[i]]}'` + ', '
            }
          }
          query += ` WHERE id_apprenti = ${req.params.id}`;
          console.log('avec mdp ==>', query);
          connection.query(query, function (err, result) {
            if (err) throw err;
            connection.query(`SELECT * FROM apprenti WHERE id_apprenti = '${req.params.id}'`, (error, result) => {
              if (error) throw error
              const token = generateAccessToken(result[0].id_apprenti, result[0].mail_apprenti);
              res.status(200).json({ id_apprenti: result[0].id_apprenti, token_apprenti: token, prenom_apprenti: result[0].prenom_apprenti, mail_apprenti: result[0].mail_apprenti, photo_apprenti: result[0].photo_apprenti });
            })
          })
        })
      } else {
        var query = `UPDATE apprenti SET `
        for (let i = 0; i < data.length; i++) {
          if (i == data.length - 1) {
            query += `${data[i]}` + ' = ' + `'${req.body[data[i]]}'` // req.body.prenom_apprenti === req.body[prenom_apprenti]
          } else {
            query += `${data[i]}` + ' = ' + `'${req.body[data[i]]}'` + ', '
          }
        }
        query += ` WHERE id_apprenti = ${req.params.id}`;
        console.log(query);
        connection.query(query, function (err, result) {
          if (err) throw err;
          connection.query(`SELECT * FROM apprenti WHERE id_apprenti = '${req.params.id}'`, (error, result) => {
            if (error) throw error
            const token = generateAccessToken(result[0].id_apprenti, result[0].mail_apprenti);
            res.status(200).json({ id_apprenti: result[0].id_apprenti, token_apprenti: token, prenom_apprenti: result[0].prenom_apprenti, mail_apprenti: result[0].mail_apprenti, photo_apprenti: result[0].photo_apprenti });
          })
        })
      }
    } else {
      res.status(205).json({ msg: 'vous avez rien envoyé' });
    }
  } catch (err) {
    console.log(err);
  }
})
// ------------3.API/get/apprenti/all-competences
router.get('/apprenti/session-competences/:idApprenti', async (req, res) => {
  try {
    connection.query(`SELECT a.*, b.date_session, b.id_session, c.mail_mentor, c.nom_mentor FROM competence as a LEFT JOIN session as b ON a.id_competence = b.id_competence LEFT JOIN mentor as c ON a.id_mentor = c.id_mentor WHERE id_apprenti = ${req.params.idApprenti}`, function (err, result) {
      if (err) throw err
      res.status(200).json(result);
    })
  } catch (err) {
    console.log(err);
  }
});
//----------------3.API/put/competence-choisi
router.put('/apprenti/competence-choisi', authPut, (req, res) => {
  try {
    connection.query(`UPDATE competence SET id_apprenti = '${req.body.id_apprenti}', reserve = true WHERE id_competence = '${req.body.id_competence}'`);
    res.status(200).send("Cette compétence est bien reservée");
  } catch (err) {
    console.log(err);
  }
})
//---------------------------3.API/delete/compte/
router.delete('/user/apprenti/delete-compte/:id', authDelete, (req, res) => {
  connection.query(`DELETE FROM apprenti WHERE id_apprenti = '${req.params.id}'`, function (err, result) {
    if (err) throw res.status(400).send('there is an error');
    console.log("Number of apprentis deleted: " + result.affectedRows);
    res.status(200).send("Cet apprenti est bien supprimé")
  })
});
//-------3. API/GET/avoir l'histoire de chaque apprenti
router.get('/apprenti/history-of-competence/:id', (req, res) => {
  try {
    connection.query(`SELECT b.titre, b.domaine, b.id_competence FROM mycompetence as a LEFT JOIN competence as b ON a.id_competence = b.id_competence
      WHERE a.id_apprenti = ${req.params.id}`, (err, result) => {
      if (err) throw err
      res.status(200).json(result)
    })
  } catch (err) {
    console.log(err);
  }
})
//---------contact le mentor
router.post('/apprenti/contact-mentor', authPost,(req, res)=>{
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com', //Simple Mail Transfer Protocol
    port: 465,
    secure: true,
    auth: {
      user: 'kh.yomna@gmail.com',
      pass: 'Google2moi'
    }
  });
  const mailOptions = {
    from: 'kh.yomna@gmail.com',
    to: `${req.body.mail_mentor}, kh.yomna@gmail.com`,
    subject: `${req.body.sujet}`,
    text: `Madame, Monsieur ${req.body.nom_mentor.bold()} \nVous avez reçu un mail de l'apprenant: ${req.body.nom.bold()}\nCOMPETENCE: ${req.body.titre.bold()}\nMESSAGE:\n ${req.body.message}.`
  };
  transporter.sendMail(mailOptions, function (error, data) {
    if (error) {
      res.status(400).send({ mesg: 'Excusez_nous, il y a des problèmes' })
      console.log(error, { mesg: 'Excusez_nous, il y a des problèmes' });
    } else {
      console.log('Email sent: ' + data.response, { mesg: 'Votre email est bien envoyé' });
      res.status(200).send({ mesg: 'Votre email est bien envoyé' })
    }
  });

})
//---------3. API/POST/ à la fin de l'engagement de compétence pour sauvegarder l'histoire de chaque apprenti
router.post('/apprenti/finish-competence', authPost, (req, res) => {
  try {
    connection.query(`INSERT INTO mycompetence (id_apprenti, id_competence) VALUES ('${req.body.id_apprenti}', '${req.body.id_competence}')`, (err, result) => {
      if (err) throw err
      res.status(200).send("c'est bon")
    })
  } catch (err) {
    console.log(err);
  }
})
module.exports = router