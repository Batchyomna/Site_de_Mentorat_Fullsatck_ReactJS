import React, { Component } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Redirect } from 'react-router-dom'
import detectAttack from '../functions/detectAttack'
import { default as signUpUser } from '../functions/signUpUser'
import testMail from '../functions/testMail'
import deleteEmptyValueApprenti from '../functions/deleteEmptyValueApprenti'
import deleteEmptyValueMentor from '../functions/deleteEmptyValueMentor'


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
                        <span className={this.state.error ? "redMessage" : "greenMessage"}>{this.state.message}</span>
                    {this.state.errorMail &&
                        <span className="redMessage">Vous devez utiliser un mail valide<br /></span>
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
                                <Form.Control value={this.state.nom} onChange={this.setChange.bind(this)} name="nom" placeholder="Saisissez votre nom" className="inTheLabel" />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Adresse mail *</Form.Label>
                                {
                                    this.state.errorMail ?
                                        <Form.Control value={this.state.mail} onChange={this.setChange.bind(this)} name="mail" className="errorClasse" />
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
                                        <Form.Control type="number" value={this.state.nom_SIREN} onChange={this.setChange.bind(this)} name="nom_SIREN" placeholder="Saisissez votre numéro SIREN qui comprend 9 chiffres" className="inTheLabel" />
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
        console.log(this.state.nom_SIREN);
        console.log('statut', this.state.statut);
    }
    goToSignIn(e) {
        e.preventDefault();
        this.setState({
            signupFlag: false,
        })
    }

    async goToSignUp(e) {
        e.preventDefault();
        try{
            let newUser ='';
            let allStateDataApprenti = deleteEmptyValueApprenti({nom: this.state.nom, prenom: this.state.prenom, mail: this.state.mail, mdp: this.state.mdp, photo: this.state.photo })
            let allStateDataMentor = deleteEmptyValueMentor({nom: this.state.nom, prenom: this.state.prenom, mail: this.state.mail, mdp: this.state.mdp, photo: this.state.photo, nom_SIREN: this.state.nom_SIREN })
            console.log('data mentor',allStateDataMentor);
            console.log('data apprenti',allStateDataApprenti);

            if(detectAttack(allStateDataApprenti) || detectAttack(allStateDataMentor)){
                this.setState({
                    message: 'Réessayez, car vous avez utilisé des caractères spéciaux.', error: true, signupFlag: true,
                })
            }else if(this.state.mail && !testMail(this.state.mail)){
                this.setState({
                    message: 'Vous devez utiliser un mail valide',
                    error: true,
                    signupFlag: true,
                })
            }else {
                if (this.state.statut === "mentor"){
                    console.log('in mentor avant foncion', this.state);
                    newUser = await signUpUser({statut: "mentor", nom: this.state.nom, prenom: this.state.prenom, mail: this.state.mail, mdp: this.state.mdp, photo: this.state.photo, nom_SIREN: this.state.nom_SIREN })
               
                } else {
                    newUser = await signUpUser({statut: "apprenti", nom: this.state.nom, prenom: this.state.prenom, mail: this.state.mail, mdp: this.state.mdp, photo: this.state.photo})
                }
                console.log('newUser', newUser);
                switch (newUser) {
                    case 'ok':
                        this.setState({
                            message: 'Vous êtes bien inscrit, vous pouvez vous connecter',
                            error: false,
                            signupFlag: true,
                        })
                        break;
                    case 'mail-existe':
                        this.setState({
                            message: 'Vous devez utiliser un autre mail',
                            error: true,
                            signupFlag: true,
                        })
                        break;
                    case 'SIREN-missed':
                        this.setState({
                            message: 'Vous devez saisir votre numéro SIREN ',
                            error: true,
                            signupFlag: true,
                        })
                        break;
                    case 'champ-vide':
                        this.setState({
                            message: 'Réessayez, car vous avez oublié de remplir tous les champs obligatoirs',
                            error: true,
                            signupFlag: true,
                        })
                        break;
                    default:
                        this.setState({
                            message: 'Essayez encore fois car il y a un problème',
                            error: true,
                            signupFlag: true,
                        })
                }

            }

        }catch(err){
            console.log(err);
        }
    }
}

export default SignUp;
