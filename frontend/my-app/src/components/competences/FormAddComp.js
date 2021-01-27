import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Form, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios'
import { fillCompetenceMentor } from '../../store/actions/mentor'

class FormAddComp extends Component {
    constructor() {
        super()
        this.state = {
           titre:'',
           domaine:'',
           duree:'',
           frequence:'',
           premiere_date:'',
           description:'',
            message: '',
            messageError: ''
        }
    }
    render() {
        return (
            <div>
                    <Form>
                        <Row>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Titre *</Form.Label>
                                <Form.Control value={this.state.titre} onChange={this.setChange.bind(this)} name="titre" placeholder="Saisissez le titre" className="inTheLabel" />
                            </Col>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Domaine *</Form.Label>
                                <Form.Control as="select" onChange={this.setChange.bind(this)} name="domaine" className="inTheLabel" value={this.state.domaine} required>
                                    <option value="" className="inTheLabel">Choisissez le domaine</option>
                                    <option value="HTML" className="inTheLabel">HTML,CSS</option>
                                    <option value="JS" className="inTheLabel">JS</option>
                                    <option value="PHP" className="inTheLabel">PHP</option>
                                    <option value="SQL" className="inTheLabel">SQL</option>
                                    <option value="JAVA" className="inTheLabel">JAVA</option>
                                    <option value="Python" className="inTheLabel">Python</option>
                                    <option value="JS" className="inTheLabel">JS</option>

                                </Form.Control>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Adresse mail</Form.Label>
                                <Form.Control value={this.state.mail} onChange={this.setChange.bind(this)} name="mail" placeholder="Saisissez votre mail" className="inTheLabel" />
                            </Col>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Mot de passe</Form.Label>
                                <Form.Control type="password" value={this.state.mdp} onChange={this.setChange.bind(this)} name="mdp" placeholder="Saisissez votre mot de passe" className="inTheLabel" />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <Form.Label className="float-left label">Photo</Form.Label>
                                <Form.Control value={this.state.photo} onChange={this.setChange.bind(this)} name="photo" placeholder="URL de votre photo" className="inTheLabel" />
                            </Col>
                        </Row>
                        <div className="myButtons">
                            <Button className="oneButton" type="submit" onClick={this.editData.bind(this)}>Modifier</Button>
                        </div>
                    </Form>
            </div>
        );
    }
    async editData(e){
        e.preventDefault();
        //  let dataToEdit = deleteEmptyValue(this.state)
        if (Object.keys(this.state).length > 0) {
            if(this.props.token_apprenti){
                let updateRresult = await axios.put(`http://localhost:8000/user/apprenti/edit-data/${this.props.id_apprenti}`,this.state,{
                    headers: {'Authorization': `${this.props.token_apprenti}`}
                })
                if (updateRresult.status === 200) {
                    this.props.fillCompetenceMentor({id_apprenti: updateRresult.data.id_apprenti, token_apprenti: updateRresult.data.token_apprenti, mail_apprenti: updateRresult.data.mail_apprenti, photo_apprenti: updateRresult.data.photo_apprenti, prenom_apprenti: updateRresult.data.prenom_apprenti })
                    this.setState({
                        prenom: '',
                        nom: '',
                        mail: '',
                        mdp: '',
                        photo: '',
                        message: 'Vos coordonnées sont bien changées'
                    })
                }
            }
        } else {
            this.setState({
                messageError: 'vous devez remplir au moins un champ pour changer ves coordonnées'
            })
        }
    }  
    // deleteEmptyValue(objet){
    //     for (let key in objet) {
    //         if (objet[key] === '') {
    //             delete objet[key]
    //         }
    //     }
    //     return objet
    // }
}

const mapStateToProps = (state) => ({
    id_mentor: state.mentorReducer.id_mentor

})
const mapDispatchToProps={
    fillCompetenceMentor
}
export default connect(mapStateToProps, mapDispatchToProps)(FormAddComp) ;