import React, { Component } from 'react';
import axios from 'axios'
import { Button } from "react-bootstrap";



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
            description: ''
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
                        <b>Nom de Mentor: {this.state.nom_mentor}</b>
                        <p><b>Pour une durée:</b> {this.state.duree}</p>
                        <p><b>Dans une frequence: </b>{this.state.frequence}</p>
                        <p><b>Domaine: </b>{this.state.domaine}</p>
                        <p><b>description:</b><br></br>{this.state.description || 'There is no description'}</p>
                    </div>
                </div>
                {
                    this.state.reserve === 1 ? 
                    <Button className="oneButton" variant="primary" type="submit" >ça m'interesse</Button>
                    : 
                    <Button className="oneButton" variant="primary" type="submit" >choisir cette compétence</Button>
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

                })
            }
        }catch(err){
            console.log(err);
        }
    }
}

export default Competence;