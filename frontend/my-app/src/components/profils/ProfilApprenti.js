import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Form, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios'
import { changeDataApprenti, signOutApprenti } from '../../store/actions/apprenti'
import deleteEmptyValue from '../functions/deleteEmptyValueApprenti'

class ProfilApprenti extends Component {
    constructor() {
        super()
        this.state = {
            prenom_apprenti: '',
            nom_apprenti: '',
            mail_apprenti: '',
            mdp_apprenti: '',
            photo_apprenti: '',
            message: '',
            error: false
        }
    }
    render() {
        return (
            <div className="container">
                <h1> Bonjour {this.props.prenom_apprenti}</h1>
                <section className="information">
                    <span className={this.state.error ? "redMessage" : "greenMessage"}>{this.state.message}</span>
                    <h2 className="smallMessage">Vous voulez changer vos informations personnelles?</h2>
                    <Form>
                        <Row>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Prénom</Form.Label>
                                <Form.Control value={this.state.prenom_apprenti} onChange={this.setChange.bind(this)} name="prenom_apprenti" placeholder="Saisissez votre prénom" className="inTheLabel" />
                            </Col>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Nom</Form.Label>
                                <Form.Control value={this.state.nom_apprenti} onChange={this.setChange.bind(this)} name="nom_apprenti" placeholder="Saisissez votre nom" className="inTheLabel" />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Adresse mail</Form.Label>
                                <Form.Control value={this.state.mail_apprenti} onChange={this.setChange.bind(this)} name="mail_apprenti" placeholder="email@exemple.com" className="inTheLabel" />
                            </Col>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Mot de passe</Form.Label>
                                <Form.Control type="password" value={this.state.mdp_apprenti} onChange={this.setChange.bind(this)} name="mdp_apprenti" placeholder="Saisissez votre mot de passe" className="inTheLabel" />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <Form.Label className="float-left label">Photo</Form.Label>
                                <Form.Control value={this.state.photo_apprenti} onChange={this.setChange.bind(this)} name="photo_apprenti" placeholder="URL de votre photo" className="inTheLabel" />
                            </Col>
                        </Row>
                        <div className="myButtons">
                            <Button className="oneButton" type="submit" onClick={this.editData.bind(this)}>Modifier</Button>
                        </div>
                    </Form>
                </section>
                <section className="history">
                    <h2 className="smallMessage">Les compétences que vous avez déjà acquises: </h2>
                    {
                        this.props.competencesDePasse.length > 0 ?
                            (this.props.competencesDePasse.map(item => (
                                <div key={item.id_competence} className="profilOneCompetence">
                                    <h5>{item.titre}</h5>
                                    <p>Dans le domaine: {item.domaine}</p>
                                    <a className="lire" href={`/nos-competences/${item.id_competence}`} alt="Cliquez ici pour plus de détails">Pour voir plus</a>
                                </div>
                            ))
                            )
                            :
                            <span className="message">Vous n'avez encore suivi aucune compétence </span>
                    }
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

    async editData(e) {
        e.preventDefault();
        try {
            let allStateData = deleteEmptyValue(this.state);

            if (Object.keys(allStateData).length > 0) {
                let updateRresult = await axios.put(`http://localhost:8000/user/apprenti/edit-data/${this.props.id_apprenti}`, allStateData,{
                    headers: {'Authorization': `${this.props.token_apprenti}`}
                  })
                if (updateRresult.status === 200) {
                    this.props.changeDataApprenti({id_apprenti: updateRresult.data.id_apprenti, token_apprenti: updateRresult.data.token_apprenti, mail_apprenti: updateRresult.data.mail_apprenti, photo_apprenti: updateRresult.data.photo_apprenti, prenom_apprenti: updateRresult.data.prenom_apprenti })
                    this.setState({
                        prenom_apprenti: '',
                        nom_apprenti: '',
                        mail_apprenti: '',
                        mdp_apprenti: '',
                        photo_apprenti: '',
                        message: 'Vos coordonnées sont bien changées'
                    })
                } else {
                    this.setState({
                        prenom_mentor: '',
                        nom_mentor: '',
                        mail_mentor: '',
                        mdp_mentor: '',
                        photo_mentor: '',
                        error:true,
                        message: 'Excusez-nous, mais vous devrez ressayer'
                    })
                }
            } else {
                this.setState({
                    error: true,
                    message: 'vous devez remplir au moins un champ pour changer ves coordonnées'
                })
            }
        } catch (err) {
            console.log(err);
             alert('vous devez vous connecter à nouveau')
            this.props.signOutApprenti()// jwt expired
           
        }
    }
    async deleteAccount(e) {
        e.preventDefault();
        try {
            let deletResult = await axios.delete(`http://localhost:8000/user/apprenti/delete-compte/${this.props.id_apprenti}`,
            {
                headers: {'Authorization': `${this.props.token_apprenti}`}
              })
            if (deletResult.status === 200) {
                console.log(deletResult);
                alert('vous devez vous connecter à nouveau')
                this.props.signOutApprenti()
            }
        } catch (err) {
            console.log(err);
            alert('vous devez vous connecter à nouveau')
            this.props.signOutApprenti()// jwt expired
        }
    }
}
const mapStateToProps = (state) => ({
    prenom_apprenti: state.apprentiReducer.prenom_apprenti,
    photo_apprenti: state.apprentiReducer.photo_apprenti,
    id_apprenti: state.apprentiReducer.id_apprenti,
    competencesDePasse: state.apprentiReducer.competencesDePasse,
    token_apprenti: state.apprentiReducer.token_apprenti

})
const mapDispatchToProps = {
    changeDataApprenti,
    signOutApprenti

}
export default connect(mapStateToProps, mapDispatchToProps)(ProfilApprenti);