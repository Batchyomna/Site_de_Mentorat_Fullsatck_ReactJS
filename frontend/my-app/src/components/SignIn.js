import React, { Component } from "react";
import { connect } from 'react-redux'

import { Button, Form, Row, Col } from "react-bootstrap";
import axios from 'axios'
import  { Redirect } from 'react-router-dom'

import {signInMentor, mentorCompetences} from '../store/actions/mentor'
import {signInApprenti, apprentiCompetences} from '../store/actions/apprenti'
import { signInAdmin} from '../store/actions/admin'
class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            mail: '',
            mdp: '',
            statut: '',
            signinFlag: true,
            message: ''
        }
    }
    render() {
        if(this.props.token_mentor || this.props.token_apprenti || this.props.token_admin){
          return  <Redirect to={'/user/profil'}/>
        }else if (this.state.signinFlag) {
            return (
                <div className="container">
                     <h2>Se Connecter</h2>
                    <span className="greenMessage">{this.state.message}<br /></span>
                    <p className="smallMessage">Tout les champs sont obligatoires</p>
                    <Form>
                        <Row>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Adresse mail</Form.Label>
                                <Form.Control value={this.state.mail} onChange={this.setChange.bind(this)} name="mail" placeholder="Saisissez votre mail" className="inTheLabel"/>
                            </Col>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Mot de passe</Form.Label>
                                <Form.Control type="password" value={this.state.mdp} onChange={this.setChange.bind(this)} name="mdp" placeholder="Saisissez votre mot de passe" className="inTheLabel"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <Form.Label className="float-left label">Votre statut</Form.Label>
                                <Form.Control as="select" onChange={this.setChange.bind(this)} name="statut" className="inTheLabel">
                                    <option value="" className="inTheLabel">Choisissez votre statut</option>
                                    <option value="apprenti" className="inTheLabel">Apprenti</option>
                                    <option value="mentor" className="inTheLabel">Mentor</option>
                                    <option value="admin" className="inTheLabel">Admin</option>
                                </Form.Control>
                            </Col>
                        </Row>
                        <div className="myButtons">
                           <Button className="oneButton" type="submit" onClick={this.goToSignIn.bind(this)}>Sign in</Button>
                            <p className="smallMessage">Si vous n'avez pas encore un compte, entrez ici pour le créer</p>
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
            [event.target.name]: event.target.value
        });
    }
    goToSignUp(e){
        e.preventDefault();
        this.setState({
            signinFlag: false,
        })
    }

    async goToSignIn(e) {
        e.preventDefault();
        try {
            let result = await axios.post(`http://localhost:8000/sign-in`, { mail: this.state.mail, mdp: this.state.mdp, statut: this.state.statut})
            if (result.status === 200) {
                if(this.state.statut === "mentor"){
                    this.props.signInMentor({token_mentor:result.data.token, id_mentor: result.data.id, mail_mentor:this.state.mail, photo_mentor: result.data.photo_mentor })
                }else if(this.state.statut === "apprenti"){
                    this.props.signInApprenti({token_apprenti:result.data.token, id_apprenti: result.data.id, mail_apprenti:this.state.mail, photo_apprenti: result.data.photo_apprenti})
                }else if(this.state.statut === 'admin'){
                    this.props.signInAdmin({token_admin:result.data.token, id_admin: result.data.id, mail_admin:this.state.mail})
                }
            }
        } catch (error) {
            this.setState({
                mail: '',
                mdp: '',
                statut: '',
                message: 'Excusez-nous mais vous devez réessayer'
            })
            console.error(error);
        }
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
    mentorCompetences,
    apprentiCompetences,
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
