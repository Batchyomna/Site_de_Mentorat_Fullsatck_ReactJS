import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Form, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios'
import { changeDataAdmin, signOutAdmin } from '../../../store/actions/admin'
import testMail from '../../functions/testMail';
import detectAttack from '../../functions/detectAttack';
import deleteEmptyValueAdmin from '../../functions/deleteEmptyValueAdmin'
import MentorNotValide from './MentorNotValide';

class ProfilAdmin extends Component {
    constructor() {
        super()
        this.state = {
            mail_admin: '',
            mdp_admin: '',
            mail_new_admin: '',
            mdp_new_admin: '',
            message: '',
            error: false,
        }
    }
    setChange(event) {
        this.setState({
            error: false,
            message:'',
            [event.target.name]: event.target.value
        });
    }
    async editData(e) {
        e.preventDefault();
        try {
            let dataOfState = deleteEmptyValueAdmin(this.state) 
            if (detectAttack(dataOfState)) {
                this.setState({
                    error: true, message: 'Réessayez, car vous avez utilisé des caractères spéciaux.'
                })
            } else if (this.state.mail_admin && !testMail(this.state.mail_admin)){
                this.setState({
                    error: true,
                    message: 'Vous devez utiliser un mail valide'
                })
            } else if( !this.state.mail_admin && !this.state.mdp_admin){
                this.setState({
                    error: true, message: 'vous devez remplir au moins un champ pour changer vos informations'
                })
            }else if (this.state.mdp_admin && this.state.mail_admin) {
                    let updateRresult = await axios.put(`http://localhost:8000/user/admin/edit-data/${this.props.id_admin}`, { mail: this.state.mail_admin, mdp: this.state.mdp_admin }, {
                        headers: { 'authorization': `${this.props.token_admin}` }
                    })
                    if (updateRresult.status === 200) {
                        this.props.changeDataAdmin({ id_admin: updateRresult.data.id_admin, token_admin: updateRresult.data.token_admin, mail_admin: updateRresult.data.mail_admin })
                        this.setState({
                            mail_admin: '',
                            mdp_admin: '',
                            error: false,
                            message: 'Vos coordonnées sont bien changées'
                        })
                    }
            }else if (this.state.mail_admin && !this.state.mdp_admin ){
                    let anotherUpdateRresult = await axios.put(`http://localhost:8000/user/admin/edit-data/${this.props.id_admin}`, { mail: this.state.mail_admin}, {
                        headers: { 'authorization': `${this.props.token_admin}` }
                    })
                    if (anotherUpdateRresult.status === 200) {
                        this.props.changeDataAdmin({ id_admin: anotherUpdateRresult.data.id_admin, token_admin: anotherUpdateRresult.data.token_admin, mail_admin: anotherUpdateRresult.data.mail_admin })
                        this.setState({
                            mail_admin: '',
                            mdp_admin: '',
                            error: false,
                            message: 'Vos coordonnées sont bien changées'
                        })
                    }                
            } else if(this.state.mdp_admin && !this.state.mail_admin){
                let anotherUpdateRresult = await axios.put(`http://localhost:8000/user/admin/edit-data/${this.props.id_admin}`, {mdp: this.state.mdp_admin}, {
                    headers: { 'authorization': `${this.props.token_admin}` }
                })
                if (anotherUpdateRresult.status === 200) {
                    this.props.changeDataAdmin({ id_admin: anotherUpdateRresult.data.id_admin, token_admin: anotherUpdateRresult.data.token_admin, mail_admin: anotherUpdateRresult.data.mail_admin })
                    this.setState({
                        mail_admin: '',
                        mdp_admin: '',
                        error: false,
                        message: 'Vos coordonnées sont bien changées'
                    })
                }
            }
        } catch (err) {
            console.log(err);
            alert('vous devez vous connecter à nouveau, jwt expired')
            this.props.signOutAdmin()
        }
    }
    async addAdmin(e) {
        e.preventDefault();
        let { mail_new_admin, mdp_new_admin } = this.state
        try {
            if(!mail_new_admin || !mdp_new_admin) {
                this.setState({
                    mail_new_admin: '',
                    mdp_new_admin: '',
                    error: true,
                    message: 'vous devez remplir les deux champs'
                })
            }else if (detectAttack({ mail:mail_new_admin, mdp:mdp_new_admin })) {
                this.setState({
                    error: true, message: 'Réessayez, car vous avez utilisé des caractères spéciaux.'
                })
            }else if (mail_new_admin && !testMail(mail_new_admin)){
                this.setState({
                    error: true,
                    message: 'Vous devez utiliser un mail valide'
                })
            }else if (mail_new_admin && mdp_new_admin) {
                let addNewAdmin = await axios.post('http://localhost:8000/admin/new-admin', { mail: mail_new_admin, mdp: mdp_new_admin }, {
                    headers: { 'authorization': `${this.props.token_admin}` }
                })
                if (addNewAdmin.status === 201) {
                    this.setState({
                        mail_new_admin: '',
                        mdp_new_admin: '',
                        error: false,
                        message: 'vous avez bien ajouté un nouvel admin'
                    })
                }
            } 
            
        } catch (err) {
            console.log(err);
            alert('vous devez vous connecter à nouveau, jwt expired')
            this.props.signOutAdmin()
        }
    }
    async deleteAccount(e) {
        e.preventDefault();
        try {
            let deletResult = await axios.delete(`http://localhost:8000/user/admin/delete-compte/${this.props.id_admin}`,
                {
                    headers: { 'authorization': `${this.props.token_admin}` }
                })
            if (deletResult.status === 200) {
                console.log(deletResult);
                this.props.signOutAdmin()
            }
        } catch (err) {
            console.log(err);
            alert('vous devez vous connecter à nouveau, jwt expired')
            this.props.signOutAdmin()
        }
    }
    
    
    render() {
        return (
            <div className="container">
                <h1>Bonjour Admin </h1>
                <section className="information">
                    <span className={this.state.error ? "redMessage" : "greenMessage"}>{this.state.message}</span>
                    <h2>Vous voulez changer vos informations personnelles?</h2>
                    <Form>
                        <Row>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Adresse mail</Form.Label>
                                <Form.Control value={this.state.mail_admin} onChange={this.setChange.bind(this)} name="mail_admin" placeholder="email@exemple.com" className="inTheLabel" />
                            </Col>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Mot de passe</Form.Label>
                                <Form.Control type="password" value={this.state.mdp_admin} onChange={this.setChange.bind(this)} name="mdp_admin" placeholder="Saisissez votre mot de passe" className="inTheLabel" />
                            </Col>
                        </Row>
                        <div className="myButtons">
                            <Button className="oneButton" type="submit" onClick={this.editData.bind(this)}>Modifier</Button>
                        </div>
                    </Form>
                </section>
                <section>
                    <h2>Vous voulez ajouter un nouvel administrateur? </h2>
                    <h2>Veuillez remplir tous les champs: </h2>
                    <Form>
                        <Row>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Adresse mail</Form.Label>
                                <Form.Control value={this.state.mail_new_admin} onChange={this.setChange.bind(this)} name="mail_new_admin" placeholder="email@exemple.com" className="inTheLabel" />
                            </Col>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Mot de passe</Form.Label>
                                <Form.Control type="password" value={this.state.mdp_new_admin} onChange={this.setChange.bind(this)} name="mdp_new_admin" placeholder="Saisissez votre mot de passe" className="inTheLabel" />
                            </Col>
                        </Row>
                        <div className="myButtons">
                            <Button className="oneButton" type="submit" onClick={this.addAdmin.bind(this)}>Ajouter</Button>
                        </div>
                    </Form>
                </section>
                <MentorNotValide/>
                <div className="myButtons">
                    <Button className="deleteButton oneButton" type="submit" onClick={this.deleteAccount.bind(this)}>Supprimer mon compte</Button>
                </div>
            </div>
        );
    }


}
const mapStateToProps = (state) => ({
    id_admin: state.adminReducer.id_admin,
    token_admin: state.adminReducer.token_admin

})
const mapDispatchToProps = {
    changeDataAdmin,
    signOutAdmin

}
export default connect(mapStateToProps, mapDispatchToProps)(ProfilAdmin);