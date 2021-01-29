import React, { Component } from 'react';
import axios from 'axios'
import { Button } from "react-bootstrap";
import {connect} from 'react-redux'



class Competence extends Component {
    constructor() {
        super();
        this.status = {
            nom_mentor: '',
            reserve: null,
            titre: '',
            duree: '',
            frequence: '',
            photo_mentor: '',
            domaine: '',
            description: '',
            premiere_date: '',
            id_mentor: null,
            id_apprenti: null
        }
    }
    render() {
        if(this.state){
             return (
            <div className="container">
                  {this.state.reserve === 1 ?
                    <p className="token">indisponsible</p>
                    :
                    <p className="nontoken">disponsible</p>
                    }
                    <br/>
                <h2>{this.state.titre}</h2>
                <div className="photAndDescription">
                    <img src={this.state.photo_mentor} alt='Mentor_photo' width="10%"  height="10%"/>
                    <div className="description">
                        <b>Nom et prénom de Mentor: {this.state.nom_mentor} {this.state.prenom_mentor}</b>
                        <p><b>Domaine: </b>{this.state.domaine}</p>
                        <p><b>Première date: </b>{this.state.premiere_date}</p>
                        <p><b>Pour une durée:</b> {this.state.duree}</p>
                        <p><b>Dans une frequence: </b>{this.state.frequence}</p>
                        <p><b>description:</b><br></br>{this.state.description || 'There is no description'}</p>
                    </div>
                </div>
                {
                    this.props.token_admin ?
                    <Button className="oneButton" variant="primary" type="submit" >Supprimer</Button>
                    :
                    this.props.id_mentor === this.state.id_mentor && this.state.reserve === 1 ?
                      <span className="redMessage">Vous ne pouvez pas modifier cette compétence pour l'instant.</span>
                    :
                    this.props.id_mentor === this.state.id_mentor && this.state.reserve === 0 ?
                    <>
                      <Button className="oneButton" variant="primary" type="submit" >Modifier</Button>
                      <Button className="oneButton" variant="primary" type="submit" >Supprimer</Button>
                    </>

                    :
                    this.props.id_apprenti === null  ?
                      <p className="smallMessage">Connectez-vous sur notre plateforme dans la page <a href="/se-connecter/sign-up">Se connecter</a> pour participer à cette compétence.</p>
                    :
                    this.state.reserve === 1 && this.props.id_apprenti !== this.state.id_apprenti ? 
                      <>
                        <p className="smallMessage">Souhaitez-vous être informé(e) par email ?</p>
                        <p className="smallMessage"> Nous vous informerons dès que cette compétence sera à nouveau disponible.</p>
                        <input type='text' value={this.props.mail_apprenti}/>
                        <Button className="oneButton" variant="primary" type="submit" >Me prévenir par mail</Button>
                      </>
                    : 
                    this.state.reserve === 1 && this.props.id_apprenti === this.state.id_apprenti ? 
                    <p className="smallMessage">Vous êtes en train de suivre cette compétence</p>
                    :
                    this.state.reserve === 0 && this.props.id_apprenti ? 
                    <Button className="oneButton" variant="primary" type="submit" >choisir cette compétence</Button>
                    :
                    null
                }
            </div>
        )
        }else{
          return  <div> else</div>
        }
    }
    async componentDidMount() {
        try{
            let x = window.location.pathname.split('/')
            let compId = parseInt(x[x.length - 1])
            let details = await axios.get(`http://localhost:8000/one-competence/${compId}`)
            if (details.status === 200) {
                console.log(details.data);
                this.setState({
                    nom_mentor: details.data[0].nom_mentor,
                    reserve: details.data[0].reserve,
                    titre: details.data[0].titre,
                    duree: details.data[0].duree,
                    frequence: details.data[0].frequence,
                    photo_mentor: details.data[0].photo_mentor,
                    domaine: details.data[0].domaine,
                    description : details.data[0].description,
                    id_mentor: details.data[0].id_mentor,
                    id_apprenti: details.data[0].id_apprenti,
                    prenom_mentor: details.data[0].prenom_mentor,
                    premiere_date: details.data[0].premiere_date
                })
            }
        }catch(err){
            console.log(err);
        }
    }
}
const mapStateToProps =(state) => ({
    id_mentor: state.mentorReducer.id_mentor,
    id_apprenti: state.apprentiReducer.id_apprenti,
    mail_apprenti: state.apprentiReducer.mail_apprenti,
    token_admin: state.adminReducer.token_admin
})
export default connect(mapStateToProps)(Competence);