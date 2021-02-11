import React, { Component } from 'react';
import FormAddComp from './FormAddComp'
import {connect} from 'react-redux'
import axios from 'axios';
import futureDate from '../functions/futureDate'


class MentorCompetences extends Component {
    constructor(){
        super()
        this.state ={
            message: '',
            messageError:'',
            futureSession: []
        }
    }
    componentDidMount(){
            let that = this
            axios.get(`http://localhost:8000/mentor/session-competences/${this.props.id_mentor}`)
            .then((response)=>{
                let x = response.data.filter((elmAPI )=> 
                        {
                        if(futureDate(elmAPI.date_session)){
                            return true
                        }else{
                            return false
                        }
                        }) 
                   for (let i=0; i< x.length; i++){
                       if ( that.state.length === 0 || that.state.futureSession.findIndex((elmState) => (elmState.id_competence === x[i].id_competence) ) < 0){
                            that.setState({
                            futureSession: [...that.state.futureSession, x[i]]
                            })
                        } 
                    }
                    
                })
            .catch((err)=>{
            console.log(err);
        })
    }
    render() {
        return (
            <div className="container">
                <h1>En tant qu'un mentor {this.props.prenom_mentor}</h1>
                <h2> Pour ajouter une nouvelle compétence, veuillez remplir tous les champs:</h2>
                <section className="information">
                <FormAddComp/>
                  
                </section>
                <section className="history">
                <h2>Vos prochaines sessions</h2>
                    {this.state.futureSession.length > 0 ?
                        this.state.futureSession.map(item=>(
                            <div key={item.id_session} className="profilOneCompetence">
                                <h6>{item.titre}</h6>
                                <p>Dans le domaine: {item.domaine}</p>
                                <p>Le: {item.date_session}</p>
                                <a className="lire"  href={`/session-competences/done/${item.id_competence}`} alt="Cliquez ici pour plus de détails">Done</a>
                            </div>
                        ))
                        :
                        <span className="message">Vous n'avez aucune session dans l'avenir </span>
                    }

                </section>
               
            </div>
        );
    }
}
const mapStateToProps = (state) =>({
    id_mentor: state.mentorReducer.id_mentor,
    prenom_mentor: state.mentorReducer.prenom_mentor

})

export default connect(mapStateToProps)(MentorCompetences);