import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Form, Row, Col, Button} from 'react-bootstrap'
import axios from 'axios'
import {changeDataMentor, signOutMentor} from '../../store/actions/mentor'
import FormAddComp from './FormAddComp'
import deleteEmptyValue from '../functions/deleteEmptyValueApprenti'
import CompetencesAjoutes from '../competences/CompetencesAjoutes';

class ProfilMentor extends Component {
    constructor(){
        super()
        this.state ={
            prenom_mentor: '',
            nom_mentor: '',
            mail_mentor: '',
            mdp_mentor: '',
            photo_mentor: '',
            message: '',
            error: false,
        
        }
    }
    render() {
        return(
        <div className="container">
                <h1> Bonjour {this.props.prenom_mentor}</h1>
                <section className="information">
                    <span  className={this.state.error ? "redMessage" : "greenMessage"} >{this.state.message}</span>

                    <h2>Vous voulez changer vos informations personnelles?</h2>
                    <Form>
                        <Row>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Prénom</Form.Label>
                                <Form.Control value={this.state.prenom_mentor} onChange={this.setChange.bind(this)} name="prenom_mentor" placeholder="Saisissez votre prénom" className="inTheLabel" />
                            </Col>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Nom</Form.Label>
                                <Form.Control value={this.state.nom_mentor} onChange={this.setChange.bind(this)} name="nom_mentor" placeholder="Saisissez votre nom" className="inTheLabel" />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Adresse mail</Form.Label>
                                <Form.Control value={this.state.mail_mentor} onChange={this.setChange.bind(this)} name="mail_mentor" placeholder="email@exemple.com" className="inTheLabel"/>
                            </Col>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Mot de passe</Form.Label>
                                <Form.Control type="password" value={this.state.mdp_mentor} onChange={this.setChange.bind(this)} name="mdp_mentor" placeholder="Saisissez votre mot de passe" className="inTheLabel" />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <Form.Label className="float-left label">Photo</Form.Label>
                                <Form.Control value={this.state.photo_mentor} onChange={this.setChange.bind(this)} name="photo_mentor" placeholder="URL de votre photo" className="inTheLabel"/>
                            </Col>
                        </Row>
                        <div className="myButtons">
                        <Button className="oneButton" type="submit" onClick={this.editData.bind(this)}>Modifier</Button>
                        </div>
                    </Form>
                </section>
                <h2> Pour ajouter une nouvelle compétence, veuillez remplir tous les champs:</h2>
                <section className="information">
                    <FormAddComp />

                </section>
                <section className="history">
                <h2>Les compétences que vous avez ajoutées: </h2>
                
                <CompetencesAjoutes/>
                </section>
                <div className="myButtons">
                    <Button className="deleteButton oneButton" type="submit" onClick={this.deleteAccount.bind(this)}>Supprimer votre compte</Button>
                </div>
                
            </div>

        )
    }
    setChange(event) {
        this.setState({
            error: false,
            message:'',
            [event.target.name]: event.target.value
        });
    }
    async editData(e){
        e.preventDefault();
        try{
            let allStateData = deleteEmptyValue(this.state);

            if(Object.keys(allStateData).length > 0){
                let updateResult = await axios.put(`http://localhost:8000/user/mentor/edit-data/${this.props.id_mentor}`, allStateData, {
                    headers: {'Authorization': `${this.props.token_mentor}`}
                  })
                if(updateResult.status === 200){
                    this.props.changeDataMentor({
                        id_mentor: updateResult.data.id_mentor,
                        token_mentor: updateResult.data.token_mentor,
                        mail_mentor: updateResult.data.mail_mentor,
                        photo_mentor: updateResult.data.photo_mentor,
                        prenom_mentor: updateResult.data.prenom_mentor
                    })
                    this.setState({
                        prenom_mentor: '',
                        nom_mentor: '',
                        mail_mentor: '',
                        mdp_mentor: '',
                        photo_mentor: '',
                        error: false,
                        message: 'Vos coodonnées sont bien changées'
                    })
                } else if(updateResult.status=== 403) {
                    this.setState({
                        prenom_mentor: '',
                        nom_mentor: '',
                        mail_mentor: '',
                        mdp_mentor: '',
                        photo_mentor: '',
                        error: true,
                        message: "Vous n'êtes pas autorisés"
                    })
                }
            }else{
                this.setState({
                    error: true,
                    message: 'vous devez remplir au moins un champ pour changer vos coordonnées'
                })
            }
        }catch(err){
            console.log(err);
            alert('vous devez vous connecter à nouveau')
            this.props.signOutMentor()// ou redirecte pq TokenExpiredError: jwt expired
        }
    }
 
    async deleteAccount(e){
        e.preventDefault()
        try{
            let confirmerSuppression = window.confirm("Êtes-vous sûr de vouloir supprimer votre compte?");
            if (confirmerSuppression) {
                 let deletResult = await axios.delete(`http://localhost:8000/user/mentor/delete-compte/${this.props.id_mentor}`,
            {
                headers: {'Authorization': `${this.props.token_mentor}`}
              })
            if(deletResult.status === 200){
               console.log('Account deleted', deletResult);
               this.props.signOutMentor()
            }
               }
        }catch(err){
            console.log(err);
            alert('vous devez vous connecter à nouveau')
            this.props.signOutMentor() // jwt expired
        }
    }
}
const mapStateToProps = (state)=> ({
    prenom_mentor: state.mentorReducer.prenom_mentor,
    photo_mentor: state.mentorReducer.photo_mentor,
    id_mentor: state.mentorReducer.id_mentor,
    token_mentor: state.mentorReducer.token_mentor

})
const mapDispatchToProps ={
    changeDataMentor,
    signOutMentor,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilMentor);