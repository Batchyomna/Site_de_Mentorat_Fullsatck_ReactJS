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
    addCompetence(e){
        e.preventDefault();
        let {titre, domaine, duree, frequence, premiere_date, description} =this.state
        let that = this
        axios.post(`http://localhost:8000/mentor/new-competence/${this.props.id_mentor}`, {titre, domaine, duree, frequence, premiere_date, description} )
        .then((response) =>{
          if(response.status === 201){
            that.props.fillCompetenceMentor( {titre, domaine, duree, frequence, premiere_date, description})
              that.setState({
                titre:'',
                domaine:'',
                duree:'',
                frequence:'',
                premiere_date:'',
                description:'',
                message: 'vous avez bien ajouté une nouvelle compétence',
              })
          }else{
            that.setState({
            titre:'',
           domaine:'',
           duree:'',
           frequence:'',
           premiere_date:'',
           description:'',
                messageError: 'vous devez réessayer encore une fois',
              })
          }
        }).catch((error)=>{
            console.log(error);
        })
    }
    setChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        return (
            <div>
             <span className="greenMessage">{this.state.message}</span>
            <span className="redMessage">{this.state.messageError}</span> 
                    <Form>
                        <Row>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Titre *</Form.Label>
                                <Form.Control value={this.state.titre} onChange={this.setChange.bind(this)} name="titre" placeholder="Saisissez le titre" className="inTheLabel" />
                            </Col>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Domaine *</Form.Label>
                                <Form.Control as="select" onChange={this.setChange.bind(this)} name="domaine" className="inTheLabel" value={this.state.domaine} >
                                    <option value="" className="inTheLabel">Choisissez le domaine</option>
                                    <option value="HTML" className="inTheLabel">HTML,CSS</option>
                                    <option value="JS" className="inTheLabel">JS</option>
                                    <option value="PHP" className="inTheLabel">PHP</option>
                                    <option value="SQL" className="inTheLabel">SQL</option>
                                    <option value="JAVA" className="inTheLabel">JAVA</option>
                                    <option value="Python" className="inTheLabel">Python</option>
                                    <option value="CMS" className="inTheLabel">CMS</option>
                                    <option value="Autre" className="inTheLabel">Autre</option>
                                </Form.Control>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Durée *</Form.Label>
                                <Form.Control as="select" onChange={this.setChange.bind(this)} name="duree" className="inTheLabel" value={this.state.duree} >
                                    <option value="" className="inTheLabel">Choisissez la duree</option>
                                    <option value="1 mois" className="inTheLabel">1 mois</option>
                                    <option value="2 mois" className="inTheLabel">2 mois</option>
                                    <option value="3 mois" className="inTheLabel">3 mois</option>
                                    <option value="4 mois" className="inTheLabel">4 mois</option>
                                    <option value="5 mois" className="inTheLabel">5 mois</option>
                                    <option value="6 mois" className="inTheLabel">6 mois</option>
                                    <option value="10 mois" className="inTheLabel">10 mois</option>
                                    <option value="autre" className="inTheLabel">Autre</option>
                                </Form.Control>                      
                                </Col>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Fréquence *</Form.Label>
                                <Form.Control as="select" onChange={this.setChange.bind(this)} name="frequence" className="inTheLabel" value={this.state.frequence} >
                                    <option value="" className="inTheLabel">Choisissez la frequence</option>
                                    <option value="1 fois par semaine" className="inTheLabel">1 fois par semaine</option>
                                    <option value="2 fois par semaine" className="inTheLabel">2 fois par semaine</option>
                                    <option value="3 fois par semaine" className="inTheLabel">3 fois par semaine</option>
                                    <option value="tout les jours" className="inTheLabel">tout les jours</option>
                                    <option value="2 fois par mois" className="inTheLabel">2 fois par mois</option>
                                    <option value="samedi et dimanche" className="inTheLabel">samedi et dimanche</option>
                                    <option value="chaque soir" className="inTheLabel">chaque soir</option>
                                    <option value="autre" className="inTheLabel">Autre</option>
                                </Form.Control>                              
                            </Col>
                        </Row>
                        <Row>
                        {this.state.duree === 'autre' && 
                            <Col sm={6}>
                                <Form.Label className="float-left label">Précisez la durée</Form.Label>
                                <Form.Control onChange={this.setChange.bind(this)} name="duree" className="inTheLabel" value={this.state.durée} >
                                </Form.Control>
                            </Col>
                        }
                       {this.state.frequence === 'autre' && 
                            <Col sm={6}>
                                <Form.Label className="float-left label">Précisez le fréquence</Form.Label>
                                <Form.Control onChange={this.setChange.bind(this)} name="frequence" className="inTheLabel" value={this.state.frequence} >
                                </Form.Control>
                            </Col>
                        }
                        </Row> 
                        <Row>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Première date *</Form.Label>
                                <Form.Control type ="date"value={this.state.premiere_date} onChange={this.setChange.bind(this)} name="premiere_date" placeholder="Saisissez la premiere date" className="inTheLabel" />
                            </Col>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Description *</Form.Label>
                                <Form.Control value={this.state.description} onChange={this.setChange.bind(this)} name="description" placeholder="Saisissez le description" className="inTheLabel" />
                            </Col>
                        </Row>
                        <div className="myButtons">
                            <Button className="oneButton" type="submit" onClick={this.addCompetence.bind(this)}>Ajouter</Button>
                        </div>
                    </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    id_mentor: state.mentorReducer.id_mentor,
    token_mentor: state.mentorReducer.token_mentor

})
const mapDispatchToProps={
    fillCompetenceMentor
}
export default connect(mapStateToProps, mapDispatchToProps)(FormAddComp) ;