// const mysql = require('mysql2');
const express = require('express')
const router = express.Router();

//--- pour envoyer des mails
const nodemailer = require('nodemailer');

const connection = require('../database/connectionDB')
const authPost  = require('../middleware/authPost')
const authDelete  = require('../middleware/authDelete')
const authPut = require('../middleware/authPut')

//pour securiser les password:
const bcrypt = require('bcrypt');
const saltRounds = 10   // cost factor, The cost factor controls how much time is needed to calculate a single BCrypt hash. 
const jwt = require("jsonwebtoken");

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
function generateAccessToken(id, mail) {
  return jwt.sign({
    id: id,
    mail: mail
  }, 'MY_TOKEN_SECRET', { expiresIn: '1800s' });  //expires after half an hour (1800 seconds = 30 minutes)
}

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


//-----------------3.API/ GET /mentors
router.get('/admin/mentors/all-not-valid', (req, res) => {
  connection.query("SELECT id_mentor, prenom_mentor, nom_mentor, nom_SIREN, statut_mentor FROM mentor", function (err, result, fields) {
    if (err) throw err;
    let notValidMentors = result.filter(elem=> elem.statut_mentor === 0)
    res.status(200).json(notValidMentors);
  });
});
//-------------3.API/post/admin
router.post('/admin/new-admin',authPost, (req, res) => {
  try {
    bcrypt.hash(req.body.mdp, saltRounds).then(function (hashPW) {
      const sql = `INSERT INTO admin (mail_admin, mdp_admin) VALUES ('${req.body.mail}', '${hashPW}')`;
      connection.query(sql)
      res.status(201).send('vos coordonnées comme admin sont inscrits')
    })
  } catch (err) {
    console.log(err);
  }
})


//------------3. API/PUT/user/apprenti/edit-data
router.put('/user/apprenti/edit-data/:id',authPut, (req, res) => {
  try {
    if(req.body){
       let data = Object.keys(req.body)
    if (req.body.mdp_apprenti) {
      bcrypt.hash(req.body.mdp_apprenti, saltRounds).then(function (hashPW) {
        var query = `UPDATE apprenti SET `
        for (let i = 0; i < data.length; i++) {
          if (data[i] === 'mdp_apprenti' & (i == data.length - 1)) {
            query += `${data[i]}` + ' = ' + `'${hashPW}'`               // pour sauvegarder mdp hashé et il est le dernier elem dans body
          }else if (data[i] === 'mdp_apprenti' & (i != data.length - 1)){
            query += `${data[i]}` + ' = ' + `'${hashPW}'` + ', '
          }else if (i == data.length - 1) {
            query += `${data[i]}` + ' = ' + `'${req.body[data[i]]}'` // req.body.prenom_apprenti === req.body[prenom_apprenti]
          } else {
            query += `${data[i]}` + ' = ' + `'${req.body[data[i]]}'` + ', '
          }
        }
        query += ` WHERE id_apprenti = ${req.params.id}`;
        console.log('avec mdp==>', query);
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
    }else{
      res.status(205).json({msg: 'vous avez rien envoyé' });
    }
  } catch (err) {
    console.log(err);
  }
})




// ------------3.API/get/all/competences
router.get('/all/competences', async (req, res) => {
  try {
    connection.query('SELECT * FROM competence', function (err, result) {
      if (err) throw err
      res.status(200).json(result);
    })
  } catch (err) {
    console.log(err);
  }
});
// ------------3.API/get/apprenti/all-competences
router.get('/apprenti/session-competences/:id', async (req, res) => {
  try {
    connection.query(`SELECT a.*, b.date_session, b.id_session FROM competence as a LEFT JOIN session as b ON a.id_competence = b.id_competence WHERE id_apprenti = ${req.params.id}`, function (err, result) {
      if (err) throw err
      res.status(200).json(result);
    })
  } catch (err) {
    console.log(err);
  }
});

// ------------3.API/get/domaine/:domaine
router.get('/domaine/:domaine', async (req, res) => {
  try {
    connection.query(`SELECT * FROM competence WHERE domaine = '${req.params.domaine}'`, function (err, result) {
      if (err) throw err
      res.status(200).json(result);
    })
  } catch (err) {
    console.log(err);
  }
});
// ------------3.API/get/all/domaines
router.get('/all/domaines', async (req, res) => {
  try {
    connection.query(`SELECT domaine, id_competence FROM competence`, function (err, result) {
      if (err) throw err
      res.status(200).json(result);
    })
  } catch (err) {
    console.log(err);
  }
});

// ------------3.API/get/sessions_des_competences
router.get('/sessions_des_competences', async (req, res) => {
  try {
    let compsIds = Object.values(req.body)
    connection.query(`SELECT * FROM session WHERE id_competence IN (${compsIds})`, (err, result) => {
      if (err) throw err
      console.log(result)
      res.status(200).json(result);
    })
  } catch (err) {
    console.log(err);
  }
});
//----------------3.API/put/competence-choisi
router.put('/apprenti/competence-choisi',authPut, (req, res) => {
  try {
    connection.query(`UPDATE competence SET id_apprenti = '${req.body.id_apprenti}', reserve = true WHERE id_competence = '${req.body.id_competence}'`);
    res.status(200).send("Cette compétence est bien reservée");
  } catch (err) {
    console.log(err);
  }
})
//---------------------------3.API/delete/compte/
router.delete('/user/apprenti/delete-compte/:id',authDelete, (req, res) => {
    connection.query(`DELETE FROM apprenti WHERE id_apprenti = '${req.params.id}'`, function (err, result) {
      if (err) throw res.status(400).send('there is an error');
      console.log("Number of apprentis deleted: " + result.affectedRows);
      res.status(200).send("Cet apprenti est bien supprimé")
    })
});


//---------3.API/get/competence-et-session(pour le mentor on peut ajouter AND b.reserve = true)
router.get('/competence-et-session', (req, res) => {
  try {
    if (req.body.statut === 'apprenti') {
      connection.query(`SELECT a.id_apprenti, b.*, c.date_session from apprenti as a LEFT join competence as b ON a.id_apprenti = b.id_apprenti LEFT JOIN session as c ON b.id_competence = c.id_competence WHERE a.id_apprenti = '${req.body.id}'`, (erreur, result) => {
        if (erreur) throw erreur
        res.status(200).json(result)
      })
    } else if (req.body.statut === 'mentor') {
      connection.query(`SELECT a.id_mentor, b.*, c.date_session FROM mentor as a LEFT join competence as b ON a.id_mentor = b.id_mentor LEFT JOIN session as c ON b.id_competence = c.id_competence WHERE a.id_mentor = '${req.body.id}' AND b.reserve = true`, (erreur, result) => {
        if (erreur) throw erreur
        res.status(200).json(result)
      });
    }
  } catch (err) {
    console.log(err);
  }
})


//--------------3.API/POST/
router.post('/contact', (req, res) => {
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
    from: req.body.mail,
    to: 'kh.yomna@gmail.com',
    subject: `${req.body.sujet} FROM ${req.body.nom.toUpperCase()} `,
    text: `${req.body.message} ||...cliquez ici ( ${req.body.mail} ) pour répondre. `
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
//-------3. API/GET/avoir l'histoire de chaque apprenti
router.get('/user/history-competence/:id', (req, res) => {
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
//---------3. API/POST/ à la fin de l'engagement de compétence pour sauvegarder l'histoire de chaque apprenti
router.post('/user/finish-competence',authPost, (req, res) => {
  try {
    connection.query(`INSERT INTO mycompetence (id_apprenti, id_competence) VALUES ('${req.body.id_apprenti}', '${req.body.id_competence}')`, (err, result) => {
      if (err) throw err
      res.status(200).send("c'est bon")
    })
  } catch (err) {
    console.log(err);
  }
})
module.exports = router;