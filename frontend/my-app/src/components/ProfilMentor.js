import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Form, Row, Col, Button} from 'react-bootstrap'
import axios from 'axios'
import {changeDataMentor, signOutMentor} from '../store/actions/mentor'

class ProfilMentor extends Component {
    constructor(){
        super()
        this.state ={
            prenom_mentor: '',
            nom_mentor: '',
            mail_mentor: '',
            mdp_mentor: '',
            photo_mentor: '',
            items: [],
            // message: ''
        }
    }
    render() {
        return(
        <div className="container">
                <h2> Bonjour {this.props.prenom_mentor}</h2>
                <section className="information">
                    {/* <span className="message">{this.state.message}</span> */}
                    <p className="smallMessage">Vous voulez changer vos coordonnées?</p>
                    <Form>
                        <Row>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Prénom</Form.Label>
                                <Form.Control value={this.state.prenom_mentor} onChange={this.setChange.bind(this)} name="prenom_mentor" placeholder="Saisissez votre prénom" className="inTheLabel" />
                            </Col>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Nom</Form.Label>
                                <Form.Control value={this.state.nom_mentor} onChange={this.setChange.bind(this)} name="nom_mentor" placeholder="Saisissez votre nom" className="inTheLabel" />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Adresse mail</Form.Label>
                                <Form.Control value={this.state.mail_mentor} onChange={this.setChange.bind(this)} name="mail_mentor" placeholder="Saisissez votre mail" className="inTheLabel"/>
                            </Col>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Mot de passe</Form.Label>
                                <Form.Control type="password" value={this.state.mdp_mentor} onChange={this.setChange.bind(this)} name="mdp_mentor" placeholder="Saisissez votre mot de passe" className="inTheLabel" />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <Form.Label className="float-left label">Photo</Form.Label>
                                <Form.Control value={this.state.photo_mentor} onChange={this.setChange.bind(this)} name="photo_mentor" placeholder="URL de votre photo" className="inTheLabel"/>
                            </Col>
                        </Row>
                        <div className="myButtons">
                        <Button className="oneButton" type="submit" onClick={this.editData.bind(this)}>Modifier</Button>
                        </div>
                    </Form>
                </section>
                <section className="history">
                <p className="smallMessage">Les compétences que vous avez ajoutées: </p>
                {
                    this.state.items.length > 0 ?
                     (this.state.items.map(item=>(
                         <div key={item.id_competence} className="profilOneCompetence">
                             <h5>{item.titre}</h5>
                             <p>Dans le domaine: {item.domaine}</p>
                             <a className="lire"  href={`/nos-competences/${item.id_competence}`} alt="Cliquez ici pour plus de détails">Pour modifier</a>
                         </div>
                     ))
                    )
                    :
                    <span className="message">Vous n'avez pas ajouté encore aucune compétence </span>
                }
                </section>
                <div className="myButtons">
                    <Button className="oneButton" type="submit" onClick={this.deleteAcount.bind(this)}>Supprimer votre compte</Button>
                </div>
            </div>
        )
    }
    setChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    async componentDidMount(){
        try{
          let result = await axios.get(`http://localhost:8000/mentor/${this.props.id_mentor}`)
          if(result.status === 200){
              this.setState({
                  items: result.data
              })
          }
        }catch(err){
            console.log(err);
        }
    }
   
    async editData(e){
        e.preventDefault();
        try{
            let allStateData = this.state;
            for (let key in allStateData) {
              if (key === 'items' || allStateData[key] === '') {
               delete allStateData[key]
              }
            }
            if(allStateData){
                let updateResult = await axios.put(`http://localhost:8000/user/mentor/edit-data/${this.props.id_mentor}`, allStateData)
                if(updateResult.status === 200){
                    this.props.changeDataMentor({id_mentor: updateResult.data.id_mentor, token_mentor: updateResult.data.token_mentor, mail_mentor: updateResult.data.mail_mentor, photo_mentor: updateResult.data.photo_mentor, prenom_mentor: updateResult.data.prenom_mentor })
                }
            }
        }catch(err){
            console.log(err);
        }
    }
    async deleteAcount(e){
        e.preventDefault()
        try{
            let deletResult = await axios.delete(`http://localhost:8000/user/mentor/delete-compte/${this.props.id_mentor}`)
            if(deletResult.status === 200){
               console.log('Account deleted', deletResult);
               this.props.signOutMentor()
            }
        }catch(err){
            console.log(err);
        }
    }
}
const mapStateToProps = (state)=> ({
    prenom_mentor: state.mentorReducer.prenom_mentor,
    photo_mentor: state.mentorReducer.photo_mentor,
    id_mentor: state.mentorReducer.id_mentor,

})
const mapDispatchToProps ={
    changeDataMentor,
    signOutMentor,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilMentor);