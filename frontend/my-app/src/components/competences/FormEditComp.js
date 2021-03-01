import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Form, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios'
import { editCompetenceMentor } from '../../store/actions/mentor'
import emptyValue from '../functions/emptyValue'
import detectAttack from '../functions/detectAttack'

class FormEditComp extends Component {
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
            error: false,
            dureeAutre:'',
            frequenceAutre:'',
        }
    }
    componentDidMount(){
        let strURL = window.location.pathname.split('/')
        let that = this
     axios.get(`http://localhost:8000/one-competence/${parseInt(strURL[strURL.length - 1])}`)
     .then(res=>{
         if(res.status === 200){
             that.setState({
                titre:res.data[0].titre,
                domaine: res.data[0].domaine,
                duree: res.data[0].duree,
                frequence: res.data[0].frequence,
                premiere_date :res.data[0].premiere_date.split('T')[0],
                description : res.data[0].description
            })
         }
     })
     .catch(err=>{
         console.log(err);
     })
    }
    editCompetence(e){
        e.preventDefault();
        let strURL = window.location.pathname.split('/')
        let {titre, domaine, duree, frequence, premiere_date, description} =this.state
        if(this.state.duree === 'autre'){
         duree = this.state.dureeAutre
        } 
        if(this.state.frequence === 'autre'){
          frequence = this.state.frequenceAutre
        }
        if(detectAttack({titre, domaine, duree, frequence, premiere_date, description})){
            this.setState({
                error: true ,message: "Vous ne devez pas utiliser des caratères spéciaux."
            })
        }else if( emptyValue({titre, domaine, duree, frequence, premiere_date, description})){
            this.setState({
                error: true ,message: "Vous avez oublié de remplir tous les champs"
            })
        }else{
            let that = this
            axios.put(`http://localhost:8000/mentor/edit/competence/${parseInt(strURL[strURL.length - 1])}`, {titre, domaine, duree, frequence, premiere_date, description},  {
                headers: {'authorization': `${this.props.token_mentor}`}
              })
            .then((response) =>{
            if(response.status === 204){
                that.props.editCompetenceMentor({id_competence:parseInt(strURL[strURL.length - 1]), titre, domaine, duree, frequence, premiere_date, description, reserve:0})
                that.setState({
                    message: 'vous avez bien modifié cette compétence',
                    error: false,
                })
            }else{
                that.setState({
                message: 'vous devez réessayer encore une fois',
                error: true,
                })
            }
            }).catch((error)=>{
                console.log(error);
            })
        }
    }
    setChange(event) {
        this.setState({
            message: '',
            error: false,
            [event.target.name]: event.target.value
        });
    }
    setChangeAutre(event){
      if(event.target.name ==='duree' ){ 
        this.setState({dureeAutre: event.target.value, message:''})
      }else{
        this.setState({frequenceAutre: event.target.value, message:''})
      }
    }
    render() {
        return (
            <div className="container">
             <span className={this.state.error ? "redMessage" : "greenMessage"}>{this.state.message}</span>
             <h2>Veuillez modifier ce que vous souhaitez modifier à propose de cette compétence</h2>

                    <Form>
                        <Row>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Titre *</Form.Label>
                                <Form.Control value={this.state.titre} onChange={this.setChange.bind(this)} name="titre" placeholder="Saisissez le titre" className="inTheLabel editInfo" />
                            </Col>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Domaine *</Form.Label>
                                <Form.Control as="select" onChange={this.setChange.bind(this)} name="domaine" className="inTheLabel editInfo" value={this.state.domaine} >
                                    <option value="" className="inTheLabel editInfo">Choisissez le domaine</option>
                                    <option value="HTML" className="inTheLabel editInfo">HTML,CSS</option>
                                    <option value="JS" className="inTheLabel editInfo">JS</option>
                                    <option value="PHP" className="inTheLabel editInfo">PHP</option>
                                    <option value="SQL" className="inTheLabel editInfo">SQL</option>
                                    <option value="JAVA" className="inTheLabel editInfo">JAVA</option>
                                    <option value="Python" className="inTheLabel editInfo">Python</option>
                                    <option value="CMS" className="inTheLabel editInfo">CMS</option>
                                    <option value="Autre" className="inTheLabel editInfo">Autre</option>
                                </Form.Control>
                            </Col>
                        </Row>
                        <Row>
                        {this.state.duree === 'autre' ?
                            <Col sm={6}>
                                <Form.Label className="float-left label">Précisez la durée *</Form.Label>
                                <Form.Control onChange={this.setChangeAutre.bind(this)} name="duree" className="inTheLabel editInfo" value={this.state.dureeAutre} >
                                </Form.Control>
                            </Col>
                           :
                            <Col sm={6}>
                                <Form.Label className="float-left label">Durée *</Form.Label>
                                <Form.Control as="select" onChange={this.setChange.bind(this)} name="duree" className="inTheLabel editInfo" value={this.state.duree} >
                                    <option value="" className="inTheLabel editInfo">Choisissez la duree</option>
                                    <option value="1 mois" className="inTheLabel editInfo">1 mois</option>
                                    <option value="2 mois" className="inTheLabel editInfo">2 mois</option>
                                    <option value="3 mois" className="inTheLabel editInfo">3 mois</option>
                                    <option value="4 mois" className="inTheLabel editInfo">4 mois</option>
                                    <option value="5 mois" className="inTheLabel editInfo">5 mois</option>
                                    <option value="6 mois" className="inTheLabel editInfo">6 mois</option>
                                    <option value="10 mois" className="inTheLabel editInfo">10 mois</option>
                                    <option value="autre" className="inTheLabel editInfo">Autre</option>
                                </Form.Control>                      
                                </Col>
                            }
                              
                       {this.state.frequence === 'autre' ? 
                            <Col sm={6}>
                                <Form.Label className="float-left label">Précisez la fréquence</Form.Label>
                                <Form.Control onChange={this.setChangeAutre.bind(this)} name="frequence" className="inTheLabel editInfo" value={this.state.frequenceAutre} >
                                </Form.Control>
                            </Col>
                        :
                            <Col sm={6}>
                                <Form.Label className="float-left label">Fréquence *</Form.Label>
                                <Form.Control as="select" onChange={this.setChange.bind(this)} name="frequence" className="inTheLabel editInfo" value={this.state.frequence} >
                                    <option value="" className="inTheLabel editInfo">Choisissez la frequence</option>
                                    <option value="1 fois par semaine" className="inTheLabel editInfo">1 fois par semaine</option>
                                    <option value="2 fois par semaine" className="inTheLabel editInfo">2 fois par semaine</option>
                                    <option value="3 fois par semaine" className="inTheLabel editInfo">3 fois par semaine</option>
                                    <option value="tout les jours" className="inTheLabel editInfo">tout les jours</option>
                                    <option value="2 fois par mois" className="inTheLabel editInfo">2 fois par mois</option>
                                    <option value="samedi et dimanche" className="inTheLabel editInfo">samedi et dimanche</option>
                                    <option value="chaque soir" className="inTheLabel editInfo">chaque soir</option>
                                    <option value="autre" className="inTheLabel editInfo">Autre</option>
                                </Form.Control>                              
                            </Col>
                        }
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Première date *</Form.Label>
                                <Form.Control type ="date"value={this.state.premiere_date} onChange={this.setChange.bind(this)} name="premiere_date" placeholder="Saisissez la premiere date" className="inTheLabel editInfo" />
                            </Col>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Description *</Form.Label>
                                <Form.Control value={this.state.description} onChange={this.setChange.bind(this)} name="description" placeholder="Saisissez le description" className="inTheLabel editInfo" />
                            </Col>
                        </Row>
                        <div className="myButtons">
                            <Button className="oneButton" type="submit" onClick={this.editCompetence.bind(this)}>Modifier</Button>
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
    editCompetenceMentor
}
export default connect(mapStateToProps, mapDispatchToProps)(FormEditComp) ;