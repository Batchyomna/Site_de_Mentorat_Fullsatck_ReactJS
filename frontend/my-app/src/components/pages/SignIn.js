import React, { Component } from "react";
import { connect } from 'react-redux'

import { Button, Form, Row, Col } from "react-bootstrap";
import axios from 'axios'
import { Redirect } from 'react-router-dom'

import { signInMentor, fillCompetenceMentor } from '../../store/actions/mentor'
import { signInApprenti, fillCompetenceApprenti } from '../../store/actions/apprenti'
import { signInAdmin } from '../../store/actions/admin'
import testMail from '../functions/testMail'
import detectAttack from '../functions/detectAttack'
import deleteEmptyValue from '../functions/deleteEmptyValueApprenti'
class SignIn extends Component {
    async goToSignIn(e) {
        e.preventDefault();
        try {
            let allStateData = deleteEmptyValue(this.state)
            if(detectAttack(allStateData)){
                this.setState({
                    message: 'Réessayez, car vous avez utilisé des caractères spéciaux.', signinFlag: true,
                })
            }else if (this.state.mail && !testMail(this.state.mail)) {
                this.setState({
                    mail: '',  errorMail: true,  signinFlag: true, message: 'Vous devez utiliser un mail valide',
                })
            } else if (this.state.mdp && this.state.statut && testMail(this.state.mail)) {
                let result = await axios.post(`http://localhost:8000/sign-in`, allStateData)
        
                if (result.status === 200) {
                    if (this.state.statut === "mentor") {
                        this.props.signInMentor({ token_mentor: result.data.token_mentor, id_mentor: result.data.id, mail_mentor: this.state.mail, photo_mentor: result.data.photo_mentor, prenom_mentor: result.data.prenom_mentor })
                        let mentorCompetences = await axios.get(`http://localhost:8000/mentor/${result.data.id}`)
                        if (mentorCompetences.status === 200) {
                            mentorCompetences.data.map(elem => this.props.fillCompetenceMentor(elem))
                        }
                    } else if (this.state.statut === "apprenti") {
                        this.props.signInApprenti({ token_apprenti: result.data.token_apprenti, id_apprenti: result.data.id, mail_apprenti: this.state.mail, photo_apprenti: result.data.photo_apprenti, prenom_apprenti: result.data.prenom_apprenti })
                        let apprentiCompetences = await axios.get(`http://localhost:8000/apprenti/history-of-competence/${result.data.id}`)
                        if (apprentiCompetences.status === 200) {
                            apprentiCompetences.data.map(elem => this.props.fillCompetenceApprenti(elem))
                        }
                    } else if (this.state.statut === 'admin') {
                        this.props.signInAdmin({ token_admin: result.data.token_admin, id_admin: result.data.id, mail_admin: this.state.mail })
                    }
                } else if (result.status === 201) {
                    this.setState({
                        message: "Vous avez oublié votre mot de passe? ou bien vous avez oublié de le remplir?",
                        mdp: '',
                        statut: '',
                        mail: '',
                        errorPSW: true,
                        signinFlag:true,
                    })
                } else if (result.status === 203) {
                    this.setState({
                        message: 'Ce mail nous est inconnu, vous avez peut-être sélectionné un mauvais statut',
                        mail: '',
                        mdp: '',
                        statut: ' ',
                        errorPSW: false,
                        errorMail: false,
                        signinFlag:true,
                    })
                }
            }else{
                this.setState({
                    message: 'Vous avez oublié de remplir tous les champs, ou vous avez utilisé des symboles spéciaux',
                    mail: '',
                    mdp: '',
                    statut: ' ',
                    errorPSW: false,
                    errorMail: false,
                    signinFlag:true,
                })
            }
        } catch (error) {
            this.setState({
                errorPSW: false,
                errorMail: false,
                mail: '',
                mdp: '',
                statut: ' ',
                message: 'Vous devrez réessayer, car il y a des problèmes de connexion'
            })
            console.error(error);
        }
    }
    constructor() {
        super();
        this.state = {
            mail: '',
            mdp: '',
            statut: '',
            signinFlag: true,
            message: '',
            errorPSW: false,
            errorMail: false,
        }
    }
    
    render() {
        if (this.props.token_mentor || this.props.token_apprenti || this.props.token_admin) {
            return <Redirect to={'/user/profil'} />
        } else if (this.state.signinFlag) {
            return (
                <div className="container">
                    <h2>Vous connecter</h2>
                    <span className="redMessage">{this.state.message}<br /></span>
                    <p className="smallMessage">Tous les champs sont obligatoires</p>
                    <Form>
                        <Row>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Adresse mail</Form.Label>
                                {
                                    this.state.errorMail ?
                                        <Form.Control value={this.state.mail} onChange={this.setChange.bind(this)} name="mail" className="errorClasse"/>
                                        :
                                        <Form.Control value={this.state.mail} onChange={this.setChange.bind(this)} name="mail" placeholder="email@exemple.com" className="inTheLabel"/>
                                }
                            </Col>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Mot de passe</Form.Label>
                                {
                                this.state.errorPSW ?
                                    <Form.Control type="password" value={this.state.mdp} onChange={this.setChange.bind(this)} name="mdp" className="errorClasse"/>
                                    :
                                    <Form.Control type="password" value={this.state.mdp} onChange={this.setChange.bind(this)} name="mdp" placeholder="Saisissez votre mot de passe" className="inTheLabel" />
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <Form.Label className="float-left label">Votre statut</Form.Label>
                                <Form.Control as="select" onChange={this.setChange.bind(this)} name="statut" className="inTheLabel" value={this.state.statut}>
                                    <option value='' className="inTheLabel">Choisissez votre statut</option>
                                    <option value="apprenti" className="inTheLabel">Apprenti</option>
                                    <option value="mentor" className="inTheLabel">Mentor</option>
                                    <option value="admin" className="inTheLabel">Admin</option>
                                </Form.Control>
                            </Col>
                        </Row>
                        <div className="myButtons">
                            <Button className="oneButton" type="submit" onClick={this.goToSignIn.bind(this)}>Sign in</Button>
                            <p className="smallMessage">Si vous n'avez pas encore du compte, entrez ici pour le créer</p>
                            <Button className="oneButton" type="submit" onClick={this.goToSignUp.bind(this)} >Sign up</Button>
                        </div>
                    </Form>
                </div>
            )
        } else {
            return (
                <Redirect to={'/se-connecter/sign-up'} />
            )
        }
    }

    setChange(event) {
        this.setState({
            message: '',
            errorPSW: false,
            errorMail: false,
            [event.target.name]: event.target.value
        });
    }
    goToSignUp(e) {
        e.preventDefault();
        this.setState({
            signinFlag: false,
        })
    }

    
}
const mapStateToProps = (state) => ({
    token_mentor: state.mentorReducer.token_mentor,
    token_apprenti: state.apprentiReducer.token_apprenti,
    token_admin: state.adminReducer.token_admin,
});

const mapDispatchToProps = {
    signInMentor,
    signInApprenti,
    signInAdmin,
    fillCompetenceMentor,
    fillCompetenceApprenti,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
