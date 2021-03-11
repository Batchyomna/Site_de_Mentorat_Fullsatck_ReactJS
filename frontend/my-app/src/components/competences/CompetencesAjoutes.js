import React, { Component } from 'react';
import { connect } from 'react-redux'
import Table from 'react-bootstrap/Table'
import '../competences/CompetenceStyle.css'
import axios from 'axios'
import {signOutMentor, deleteCompetenceMentor} from '../../store/actions/mentor'


class CompetencesAjoutes extends Component {
    constructor(){
        super();
        this.state= {
            message: "",
            error: false
        }
    }
    render() {
        return (
            <>
             {/* <span className={this.state.error ? "redMessage" : "greenMessage"}>{this.state.message}</span> */}
            <Table responsive="sm">
                <thead>
                    <tr className="headTable">
                        <th>Titre</th>
                        <th>Domaine</th>
                        <th>Statut</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                    this.props.competencesDeMentor.length > 0 ?
                            this.props.competencesDeMentor.map(item => (
                                <tr key={item.id_competence} className="oneCompetence">
                                    <td>{item.titre}</td>
                                    <td>{item.domaine}</td>
                                    <td>{item.reserve ? <p className="token">indisponsible</p> : <p className="nontoken">disponsible</p>}</td>
                                    {
                                    item.reserve ?
                                    <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-slash-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708z"/>
                                  </svg></td>
                                    :
                                    <td><a className="lire" href={`/edit/one-competence/${item.id_competence}`} alt="modifier Compétence">Modifier</a> / <span className="lire"  onClick={this.deleteCompetence.bind(this, item.id_competence)}>supprimer</span></td>
                                    }
                                </tr>
                            ))
                    :
                     <tr><td><span className="smallMessage">Vous n'avez pas ajouté encore aucune compétence </span></td></tr>   
                }
                </tbody>
            </Table>
            </>
        )
    }

    deleteCompetence( competenceId){
        let confirmDelete = window.confirm("Êtes-vous sûr que vous voulez supprimer cette compétence?")
        if(confirmDelete){
            let that= this;
            axios.delete(`http://localhost:8000/mentor/delete/competence/${competenceId}`,{
                headers: {'authorization': `${that.props.token_mentor}`}
              })
            .then((res) =>{
                that.props.deleteCompetenceMentor(competenceId)
                if(res.status === 200){
                    // that.setState({
                    //     message:'votre compétence est bien supprimée',
                    //     error: false
                    // })
                    alert('votre compétence est bien supprimée')
                }
            })
            .catch((err) =>{
                alert('vous devez vous connecter à nouveau, jwt expired')
                that.props.signOutMentor()
                console.log(err);
            })
        }
        
    }
};
const mapStateToProps = (state) => ({
    competencesDeMentor: state.mentorReducer.competencesDeMentor,
    token_mentor: state.mentorReducer.token_mentor
})
const mapDispatchToProps ={
    signOutMentor,
    deleteCompetenceMentor
}

export default connect(mapStateToProps, mapDispatchToProps)(CompetencesAjoutes);