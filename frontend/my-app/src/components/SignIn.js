import React, { Component } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import axios from 'axios'
import  { Redirect } from 'react-router-dom'
class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            mail: '',
            mdp: '',
            statut: '',
            redirect: true,
            message: ''
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
                                <Form.Label className="float-left">Adresse mail</Form.Label>
                                <Form.Control value={this.state.mail} onChange={this.setChange.bind(this)} name="mail" placeholder="Saisissez votre mail" />
                            </Col>
                            <Col sm={6}>
                                <Form.Label className="float-left">Mot de passe</Form.Label>
                                <Form.Control type="password" value={this.state.mdp} onChange={this.setChange.bind(this)} name="mdp" placeholder="Saisissez votre mot de passe" />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <Form.Label className="float-left">Votre statut</Form.Label>
                                <Form.Control as="select" onChange={this.setChange.bind(this)} name="statut">
                                    <option value="">Choisissez votre statut</option>
                                    <option value="apprenti">Apprenti</option>
                                    <option value="mentor">Mentor</option>
                                    <option value="admin">Admin</option>
                                </Form.Control>
                            </Col>
                        </Row>
                        <div className="myButtons">
                            <p>Si vous n'avez pas encore un compte, allez créer un compte?</p>
                            <Button className="oneButton" type="submit"  >Sign up</Button>
                            <Button className="oneButton" type="submit" onClick={this.goToSignIn.bind(this)}>Sign in</Button>
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

async goToSignIn(e) {
    e.preventDefault();
    try {
        let result = await axios.post(`http://localhost:8000/sign-in`, { mail: this.state.mail, mdp: this.state.mdp, statut: this.state.statut})
        console.log(result);
        if (result.status === 201) {
            this.setState({
                mail: '',
                mdp: '',
                statut: '',
            })

        }
    } catch (error) {
        this.setState({
            mail: '',
            mdp: '',
            statut: '',

        })
        console.error(error);
    }
}
}

export default SignIn;
