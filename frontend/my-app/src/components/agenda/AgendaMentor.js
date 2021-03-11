import React, { Component } from 'react';
import './assets/style/agenda.css'
import { connect } from 'react-redux'
import axios from 'axios';
import futureDate from '../functions/futureDate'
import Table from 'react-bootstrap/Table'
import agendaPhoto from './assets/img/agenda2.jpg'

class AgendaMentor extends Component {
    constructor() {
        super()
        this.state = {
            message: '',
            messageError: '',
            futureSession: []
        }
    }
    componentDidMount() {
        let that = this
        axios.get(`http://localhost:8000/mentor/session-competences/${this.props.id_mentor}`)
            .then((response) => {
                let x = response.data.filter((elemFromAPI) => {
                    if (futureDate(elemFromAPI.date_session)) {
                        return true
                    } else {
                        return false
                    }
                })
                for (let i = 0; i < x.length; i++) {
                    if (that.state.length === 0 || that.state.futureSession.findIndex((elmState) => (elmState.id_competence === x[i].id_competence)) < 0) {
                        that.setState({
                            futureSession: [...that.state.futureSession, x[i]]
                        })
                    }
                }

            })
            .catch((err) => {
                console.log(err);
            })
    }
    render() {
        return (
            <div className="container">
                   <h1>Mentor {this.props.prenom_mentor}</h1>
                   <h2> Vous allez trouver ici vos prochaines sessions</h2>
                <section >
                    <img src={agendaPhoto} alt="agenda" id="agendaPhoto"/>
                </section>
                <section className="history">
                 <p/>
                    <Table responsive="sm">
                            <thead>
                                <tr className="headTable">
                                    <th>Titre</th>
                                    <th>Domaine</th>
                                    <th>Nom apprenti</th>
                                    <th>Date</th>
                                    <th>Fini</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.futureSession.length > 0 ?
                            
                                this.state.futureSession.map(item => (
                                    <tr key={item.id_session} className="agendaTable">
                                        <td>{item.titre}</td>
                                        <td>{item.domaine}</td>
                                        <td>{item.nom_apprenti.toUpperCase()}</td>
                                        <td>{item.date_session}</td>
                                        <td><a className="lire" href={`/session-competences/done/${item.id_competence}`} alt="détails">Done</a></td>
                                    </tr>
                                ))
                             :
                              <tr><td><span className="smallMessage">Vous n'avez aucune session dans l'avenir </span></td></tr>   
                             }
                             </tbody>
                        </Table>
                   

                </section>

            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    id_mentor: state.mentorReducer.id_mentor,
    prenom_mentor: state.mentorReducer.prenom_mentor

})

export default connect(mapStateToProps)(AgendaMentor);