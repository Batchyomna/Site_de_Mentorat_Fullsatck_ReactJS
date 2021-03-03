const express = require('express')
const router = express.Router();

const connection = require('../database/connectionDB')
const authPost = require('../middleware/authPost')
const authDelete = require('../middleware/authDelete')
const authPut = require('../middleware/authPut')
//const authChangeMail = require('../middleware/authChangeMail')

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
//-------------3.API/post/admin
router.post('/admin/new-admin', authPost, (req, res) => {
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
//-----------------3.API/ GET /mentors pour les valider
router.get('/admin/mentors/all-not-valid', (req, res) => {
    connection.query("SELECT id_mentor, prenom_mentor, nom_mentor, nom_SIREN, statut_mentor FROM mentor", function (err, result, fields) {
        if (err) throw err;
        let notValidMentors = result.filter(elem => elem.statut_mentor === 0)
        res.status(200).json(notValidMentors);
    });
});
//----------------3.API/put/admin/valid/:idMentor
router.put('/admin/valid/:idMentor',authPut, (req, res) => {
    try {
        connection.query(`UPDATE mentor SET statut_mentor = true WHERE id_mentor = '${req.params.idMentor}'`, function (err, result) {
            if (err) throw err
            res.status(200).json({ msg: "Le mentor est validé maintentant" });
        });
    } catch (error) {
        console.log(error);
    }
})
//-------------3.API/delete/admin/non-valid/:idMentor
router.delete('/admin/non-valid/:idMentor', authDelete, (req, res) => { // delete ses compétences
    try {
        connection.query(`DELETE FROM mentor WHERE id_mentor ='${req.params.idMentor}'`, function (err, result) {
            if (err) throw err
            console.log("Number of records deleted: " + result.affectedRows);
            res.status(200).send("Le mentor est bien supprimé")
        })
    } catch (err) {
        console.log(err);
    }
})
//-------------3.API/delete/delete-admin/apprenti/:idApprenti
router.delete('/admin/delete-apprenti/:idApprenti', authDelete, (req, res) => { // delete ses compétences
    try {
        connection.query(`DELETE FROM apprenti WHERE id_apprenti ='${req.params.idApprenti}'`, function (err, result) {
            if (err) throw err
            console.log("Number of records deleted: " + result.affectedRows);
            res.status(200).send("L'apprenti est bien supprimé")
        })
    } catch (err) {
        console.log(err);
    }
})
//-------------3.API/delete/delete-admin/mentor/:idMentor
router.delete('/admin/delete-mentor/:idMentor', authDelete, (req, res) => { // delete ses compétences
    try {
        connection.query(`DELETE FROM mentor WHERE id_mentor ='${req.params.idMentor}'`, function (err, result) {
            if (err) throw err
            console.log("Number of records deleted: " + result.affectedRows);
            res.status(200).send("L'mentor est bien supprimé")
        })
    } catch (err) {
        console.log(err);
    }
})
//-------------------API/PUT/admin
router.put('/user/admin/edit-data/:id', authPut, (req, res) => {
    if (!req.body.mdp && !req.body.mail){
        res.status(205).json({ msg: 'vous avez rien envoyé' })
    }else if (req.body.mdp && req.body.mail) {
        bcrypt.hash(req.body.mdp, saltRounds).then(function (hashPW) {
                connection.query(`UPDATE admin SET mdp_admin = '${hashPW}', mail_admin = '${req.body.mail}' WHERE id_admin = ${req.params.id}`, (error, firstResult) => {
                    if (error) throw error
                    console.log(firstResult);
                })
            }).catch(err=>{console.log(err);})
    }else if(req.body.mdp && !req.body.mail){
        bcrypt.hash(req.body.mdp, saltRounds).then(function (hashPW) {
                connection.query(`UPDATE admin SET mdp_admin = '${hashPW}' WHERE id_admin = ${req.params.id}`, (err, secondResult) => {
                    if (err) throw err
                    console.log(secondResult);
                })
            }).catch(err=>{console.log(err);})
    }else if(!req.body.mdp && req.body.mail){
        connection.query(`UPDATE admin SET mail_admin = '${req.body.mail}' WHERE id_admin = ${req.params.id}`, (error, foresult) => {
            if (error) throw error
            console.log(foresult);
        })
    }
    connection.query(`SELECT * FROM admin WHERE id_admin = '${req.params.id}'`, (error, thirdResult) => {
        if (error) throw error
        res.status(200).json({ id_admin: thirdResult[0].id_admin, token_admin: generateAccessToken(thirdResult[0].id_admin, thirdResult[0].mail_admin), mail_admin: thirdResult[0].mail_admin })
    })
    
})
//--------------3.API/GET/all the apprenti
router.get('/admin/all/apprentis', (req, res) => {
    connection.query("SELECT * FROM apprenti", function (err, result, fields) {
        if (err) throw err;
        res.status(200).json(result);
    });
});
//----------API/GET/ all the mentor
router.get('/admin/all/mentors', (req, res) => {
    connection.query("SELECT * FROM mentor", function (err, result, fields) {
        if (err) throw err;
        res.status(200).json(result);
    });
});
//---------------------------3.API/delete/compte/
router.delete('/user/admin/delete-compte/:id', authDelete, (req, res) => {
    connection.query(`DELETE FROM admin WHERE id_admin = '${req.params.id}'`, function (err, result) {
        if (err) throw res.status(400).send('there is an error');
        console.log("Number of admins deleted: " + result.affectedRows);
        res.status(200).send("Cet admin est bien supprimé")
    })
})
module.exports = router;