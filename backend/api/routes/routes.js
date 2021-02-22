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
//-------------3.API/delete/admin/non-valid/:idMentor
router.delete('/admin/non-valid/:idMentor',authDelete, (req, res) => {
  try {
    connection.query(`DELETE FROM mentor WHERE id_mentor ='${req.params.idMentor}'`, function (err, result) {
      if (err) throw err
      res.status(400).send('Il y a une erreur');
      console.log("Number of records deleted: " + result.affectedRows);
      res.status(200).send("Le mentor est bien supprimé")
    })
  } catch (err) {
    console.log(err);
  }
})
//----------------3.API/put/admin/valid/:idMentor
router.put('/admin/valid/:idMentor', authPut, (req, res) => {
  try {
    connection.query(`UPDATE mentor SET statut_mentor = true WHERE id_mentor = '${req.params.idMentor}'`, function (err, result) {
      if(err) throw res.status(205).json({msg: 'there is un error connection with DB'})
      res.status(200).json({msg:"Le mentor est valid maintentant"});
    });
  } catch (error) {
    console.log(error);
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
//-------------------API/PUT/admin
router.put('/user/admin/edit-data/:id', authPut, (req,res)=>{
  try{
      if (req.body.mdp) {
        bcrypt.hash(req.body.mdp, saltRounds).then(function (hashPW) {
          if (req.body.mail){ 
            connection.query(`UPDATE admin SET mdp_admin = '${hashPW}', mail_admin = '${req.body.mail}' WHERE id_admin = ${req.params.id}`, (error, fresult)=>{
            if (error) throw error
            console.log(fresult);
          })
          }else{
            connection.query(`UPDATE admin SET mdp_admin = '${hashPW}' WHERE id_admin = ${req.params.id}`, (err, sresult)=>{
              if (err) throw err
              console.log(sresult);
            })
          }
        })
        connection.query(`SELECT * FROM admin WHERE id_admin = '${req.params.id}'`, (error, tresult) => {
          if(error) throw error
          res.status(200).json({id_admin: tresult[0].id_admin, token_admin: generateAccessToken(tresult[0].id_admin, tresult[0].mail_admin), mail_admin: tresult[0].mail_admin })
        })             
      }else if (req.body.mail){
          connection.query(`UPDATE admin SET mail_admin = '${req.body.mail}' WHERE id_admin = ${req.params.id}`, (error, foresult)=>{
              if (error) throw error
              console.log(foresult);
            })
          connection.query(`SELECT * FROM admin WHERE id_admin = '${req.params.id}'`, (error, ffresult) => {
            if(error) throw error
            res.status(200).json({id_admin: ffresult[0].id_admin, token_admin: generateAccessToken(ffresult[0].id_admin, ffresult[0].mail_admin), mail_admin: ffresult[0].mail_admin })
          })
      } else{
        res.status(205).json({msg: 'vous avez rien envoyé'})
      }
  }catch(err){
    console.log(err);
  }
})
//--------------3.API/GET/apprenti
router.get('/all/apprentis', (req, res) => {
  connection.query("SELECT * FROM apprenti", function (err, result, fields) {
    if (err) throw err;
    res.status(200).json(result);
  });
});
//----------3. API/post/new-competence
router.post('/mentor/new-competence/:id_mentor',(req, res) => {
  try {
    const sql = `INSERT INTO competence (id_mentor, titre, domaine, frequence, duree, premiere_date, description, reserve) VALUES ('${req.params.id_mentor}', '${req.body.titre}', '${req.body.domaine}', '${req.body.frequence}', '${req.body.duree}', '${req.body.premiere_date}', '${req.body.description}', false)`;
    connection.query(sql)
    res.status(201).send('votre compétence comme mentor est bien inscrit')
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
});
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
// ------------3.API/get/apprenti/all-competences
router.get('/mentor/session-competences/:id', async (req, res) => {
  try {
    connection.query(`SELECT a.*, b.date_session, b.id_session FROM competence as a LEFT JOIN session as b ON a.id_competence = b.id_competence WHERE id_mentor = ${req.params.id} AND reserve = true`, function (err, result) {
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
//-------------3.API/post/new-session
router.post('/new-session', (req, res) => {
  try {
    const sql = `INSERT INTO session (id_competence, date_session) VALUES ('${req.body.id_competence}', '${req.body.date_session}')`;
    connection.query(sql)
    res.status(201).send('votre prochaine session est bien inscrits')
  } catch (err) {
    console.log(err);
  }
})
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
router.put('/competence-choisi',authPut, (req, res) => {
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
//---------------------------3.API/delete/compte/
router.delete('/user/mentor/delete-compte/:id',authDelete, (req, res) => {
    connection.query(`DELETE FROM mentor WHERE id_mentor = '${req.params.id}'`, function (err, result) {
      if (err) throw res.status(400).send('there is an error');
      console.log("Number of mentors deleted: " + result.affectedRows);
      res.status(200).send("Ce mentor est bien supprimé")
    })
})
//---------------------------3.API/delete/compte/
router.delete('/user/admin/delete-compte/:id',authDelete, (req, res) => {
  connection.query(`DELETE FROM admin WHERE id_admin = '${req.params.id}'`, function (err, result) {
    if (err) throw res.status(400).send('there is an error');
    console.log("Number of admins deleted: " + result.affectedRows);
    res.status(200).send("Cet admin est bien supprimé")
  })
})
//---------3.API/get/competence-et-session(pour le mentor on peut ajouter AND b.reserve = true)
router.get('/competence-et-session', (req, res) => {
  try {
    if (req.body.statut === 'mentor') {
      connection.query(`SELECT a.id_apprenti, b.*, c.date_session from apprenti as a LEFT join competence as b ON a.id_apprenti = b.id_apprenti LEFT JOIN session as c ON b.id_competence = c.id_competence WHERE a.id_apprenti = '${req.body.id}'`, (erreur, result) => {
        if (erreur) throw erreur
        res.status(200).json(result)
      })
    } else if (req.body.statut === 'mentor') {
      connection.query(`SELECT a.id_mentor, b.*, c.date_session FROM mentor as a LEFT join competence as b ON a.id_mentor = b.id_mentor LEFT JOIN session as c ON b.id_competence = c.id_competence WHERE a.id_mentor = '${req.body.id}'`, (erreur, result) => {
        if (erreur) throw erreur
        res.status(200).json(result)
      });
    }
  } catch (err) {
    console.log(err);
  }
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
    subject: `${req.body.sujet} || ${req.body.nom} `,
    text: `${req.body.message} ||...Vous devrez utiliser ce mail ( ${req.body.mail} ) pour répondre. `
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