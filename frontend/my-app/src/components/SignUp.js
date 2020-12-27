import React, { Component } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import axios from 'axios'
import  { Redirect } from 'react-router-dom'
class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            prenom: '',
            nom: '',
            mail: '',
            mdp: '',
            photo: '',
            statut: '',
            nom_SIREN: null,
            message: '',
            redirect: true,
        }
    }
    render() {
        if (this.state.redirect) {
            return (
                <div className="container">
                    <span className="greenMessage">{this.state.message}<br /></span>
                    <Form>
                        <Row>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Prénom</Form.Label>
                                <Form.Control value={this.state.prenom} onChange={this.setChange.bind(this)} name="prenom" placeholder="Saisissez votre prénom" className="inTheLabel" />
                            </Col>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Nom</Form.Label>
                                <Form.Control value={this.state.nom} onChange={this.setChange.bind(this)} name="nom" placeholder="Saisissez votre nom" className="inTheLabel" />
                            </Col>
                        </Row>

                        <Row>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Adresse mail</Form.Label>
                                <Form.Control value={this.state.mail} onChange={this.setChange.bind(this)} name="mail" placeholder="Saisissez votre mail" className="inTheLabel"/>
                            </Col>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Mot de passe</Form.Label>
                                <Form.Control type="password" value={this.state.mdp} onChange={this.setChange.bind(this)} name="mdp" placeholder="Saisissez votre mot de passe" className="inTheLabel" />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Photo</Form.Label>
                                <Form.Control value={this.state.photo} onChange={this.setChange.bind(this)} name="photo" placeholder="URL de votre photo" className="inTheLabel"/>
                            </Col>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Votre statut</Form.Label>
                                <Form.Control as="select" onChange={this.setChange.bind(this)} name="statut" className="inTheLabel">
                                    <option value="" className="inTheLabel">Choisissez votre statut</option>
                                    <option value="apprenti" className="inTheLabel">Apprenti</option>
                                    <option value="mentor" className="inTheLabel">Mentor</option>
                                </Form.Control>
                            </Col>
                        </Row>
                        {this.state.statut === "mentor" ?
                            (
                                <Row>
                                    <Col sm={12}>
                                        <Form.Label className="float-left label">Votre noméru de SIREN</Form.Label>
                                        <Form.Control value={this.state.nom_SIREN} onChange={this.setChange.bind(this)} name="nom_SIREN" placeholder="Saisissez votre noméro SIREN qui contient 9 chiffres" className="inTheLabel" />
                                    </Col>
                                </Row>
                            )
                            :
                            null
                        }
                        <div className="myButtons">
                            <p className="smallMessage">Vous avez déjà un compte?</p>
                            <Button className="oneButton" type="submit" onClick={() => {this.state({ redirect: false})}}>Sign in</Button>
                            <Button className="oneButton" type="submit" onClick={this.goToSignUp.bind(this)} >Sign up</Button>
                        </div>
                    </Form>
                </div>
            )
        } else {
            return (
                <Redirect to={'/se-connecter/sign-in'} />
            )
        }
    }

    setChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

async goToSignUp(e) {
    e.preventDefault();
    try {
        let result = await axios.post(`http://localhost:8000/sign-up`, { prenom: this.state.prenom, nom: this.state.nom, mail: this.state.mail, mdp: this.state.mdp, photo: this.state.photo, statut: this.state.statut, nom_SIREN: this.state.nom_SIREN })
        console.log(result);
        if (result.status === 201) {
            this.setState({
                prenom: '',
                nom: '',
                mail: '',
                mdp: '',
                photo: '',
                statut: '',
                nom_SIREN: null,
                message: 'Vous êtes bien inscrit, vous pourrez vous connecter',
            })
        }
    } catch (error) {
        this.setState({
            prenom: '',
            nom: '',
            mail: '',
            mdp: '',
            photo: '',
            statut: '',
            nom_SIREN: null,
            message: 'Il y a un problème, vous devriez essayer encore une fois',

        })
        console.error(error);
    }
}
}

export default SignUp;
