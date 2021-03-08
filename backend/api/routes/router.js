const express = require('express')
const router = express.Router();
const connection = require('../database/connectionDB')
var cors = require('cors')
router.use(cors())
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');  //is a node.js package for providing a Connect/Express middleware 
  next();                                          //that can be used to enable CORS with various options.
});

//--- pour envoyer des mails
const nodemailer = require('nodemailer');

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
    subject: `${req.body.sujet}`,
    text: `NOM: ${req.body.nom.toUpperCase().bold()} \nMAIL: ${req.body.mail.bold()} \n ${req.body.message}.`
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

module.exports = router;

// ------------3.API/get/sessions_des_competences
// router.get('/sessions_des_competences', async (req, res) => {
//   try {
//     let compsIds = Object.values(req.body)
//     connection.query(`SELECT * FROM session WHERE id_competence IN (${compsIds})`, (err, result) => {
//       if (err) throw err
//       console.log(result)
//       res.status(200).json(result);
//     })
//   } catch (err) {
//     console.log(err);
//   }
// });