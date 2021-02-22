import React, { Component } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import detectAttack from '../functions/detectAttack'
import deleteEmptyValueApprenti from '../functions/deleteEmptyValueApprenti'
import deleteEmptyValueMentor from '../functions/deleteEmptyValueMentor'
import testMail from '../functions/testMail'

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
            signupFlag: true,
            errorMail: false,
            mailExsite: false,
            error: false
        }
    }
    render() {
        if (this.state.signupFlag) {
            return (
                <div className="container">
                    <h2>Saisissez vos informations personnelles</h2>
                    {this.state.error ?
                        <span className="redMessage">{this.state.message}</span>
                        :
                        <span className="greenMessage">{this.state.message}</span>
                    }
                    {this.state.errorMail &&
                        <span className="redMessage">Vous devez utiliser un mail valide<br /></span>
                    }
                    {this.state.mailExsite &&
                        <span className="redMessage">Vous devez choisir un autre mail, car ce mail existe déjà</span>
                    }
                    <p className="smallMessage">Les champs marqués d'un astérisque * sont obligatoires</p>
                    <Form>
                        <Row>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Prénom *</Form.Label>
                                <Form.Control value={this.state.prenom} onChange={this.setChange.bind(this)} name="prenom" placeholder="Saisissez votre prénom" className="inTheLabel" />
                            </Col>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Nom *</Form.Label>
                                <Form.Control value={this.state.nom} onChange={this.setChange.bind(this)} name="nom" placeholder="Saisissez votre nom" className="inTheLabel"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Adresse mail *</Form.Label>
                                {
                                    this.state.errorMail ?
                                        <Form.Control value={this.state.mail} onChange={this.setChange.bind(this)} name="mail" className="errorClasse"  />
                                        :
                                        <Form.Control value={this.state.mail} onChange={this.setChange.bind(this)} name="mail" placeholder="email@exemple.com" className="inTheLabel" />
                                }
                            </Col>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Mot de passe *</Form.Label>
                                <Form.Control type="password" value={this.state.mdp} onChange={this.setChange.bind(this)} name="mdp" placeholder="Saisissez votre mot de passe" className="inTheLabel" />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Photo</Form.Label>
                                <Form.Control value={this.state.photo} onChange={this.setChange.bind(this)} name="photo" placeholder="URL de votre photo" className="inTheLabel" />
                            </Col>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Votre statut *</Form.Label>
                                <Form.Control as="select" onChange={this.setChange.bind(this)} name="statut" className="inTheLabel" value={this.state.statut}>
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
                                        <Form.Label className="float-left label">Votre noméru de SIREN *</Form.Label>
                                        <Form.Control value={this.state.nom_SIREN} onChange={this.setChange.bind(this)} name="nom_SIREN" placeholder="Saisissez votre numéro SIREN qui comprend 9 chiffres" className="inTheLabel" />
                                    </Col>
                                </Row>
                            )
                            :
                            null
                        }
                        <div className="myButtons">
                            <Button className="oneButton" type="submit" onClick={this.goToSignUp.bind(this)} >Sign up</Button>
                            <p className="smallMessage">Vous avez déjà un compte? Connectez-vous ici.</p>
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
            errorMail: false,
            mailExsite: false,
            error: false,
            message: '',
            [event.target.name]: event.target.value
        });
    }
    goToSignIn(e) {
        e.preventDefault();
        this.setState({
            signupFlag: false,
        })
    }

    async goToSignUp(e) {
        e.preventDefault();
        try {
            let allStateDataApprenti = deleteEmptyValueApprenti(this.state)
            let allStateDataMentor = deleteEmptyValueMentor(this.state)

            if(detectAttack(allStateDataApprenti) || detectAttack(allStateDataMentor)){
                this.setState({
                    message: 'Réessayez, car vous avez utilisé des caractères spéciaux.', error: true, signupFlag: true,
                })
            } else if (this.state.mail && !testMail(this.state.mail)) {
                    this.setState({ mail: '', errorMail: true , signupFlag: true})
            } else if (this.state.prenom && this.state.nom && this.state.mdp && this.state.statut && testMail(this.state.mail)) {
                if (this.state.statut === 'apprenti' ) {
                    let result = await axios.post(`http://localhost:8000/sign-up`, allStateDataApprenti)
                    if (result.status === 201) {
                        this.setState({
                            prenom: '',
                            nom: '',
                            mail: '',
                            mdp: '',
                            photo: '',
                            statut: '',
                            nom_SIREN: null,
                            message: 'Vous êtes bien inscrit, vous pouvez vous connecter',
                            signupFlag: true,
                        })
                    } else if (result.status === 202) {
                        this.setState({
                            mailExsite: true,
                            prenom: '',
                            nom: '',
                            mail: '',
                            mdp: '',
                            photo: '',
                            statut: '',
                            nom_SIREN: null,
                            errorMail: false,
                            signupFlag: true,
                        })
                    }
                }else if (this.state.statut === 'mentor' && this.state.nom_SIREN !== null) {
                    let result = await axios.post(`http://localhost:8000/sign-up`, allStateDataMentor)
                    if (result.status === 201) {
                        this.setState({
                            prenom: '',
                            nom: '',
                            mail: '',
                            mdp: '',
                            photo: '',
                            statut: '',
                            nom_SIREN: null,
                            message: 'Vous êtes bien inscrit, vous pouvez vous connecter',
                            signupFlag: true,
                        })
                    } else if (result.status === 202) {
                        this.setState({
                            prenom: '',
                            nom: '',
                            mail: '',
                            mdp: '',
                            photo: '',
                            statut: '',
                            nom_SIREN: null,
                            mailExsite: true,
                            errorMail: false,
                            signupFlag: true,
                        })
                    }
                }else if(this.state.statut === 'mentor'  && this.state.nom_SIREN === null ){
                    this.setState({
                        message: 'Vous devez saisir votre numéro SIREN',
                        error: true,
                        prenom: '',
                        nom: '',
                        mail: '',
                        mdp: '',
                        photo: '',
                        statut: '',
                        nom_SIREN: null,
                        signupFlag: true,
                    }) 
                }           
            }else {
                this.setState({
                    message: 'Réessayez, car vous avez oublié de remplir tous les champs obligatoirs',
                    error: true,
                    signupFlag: true,
                    prenom: '',
                    nom: '',
                    mail: '',
                    mdp: '',
                    photo: '',
                    statut: '',
                    nom_SIREN: null,
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
        }
    }
}

export default SignUp;
