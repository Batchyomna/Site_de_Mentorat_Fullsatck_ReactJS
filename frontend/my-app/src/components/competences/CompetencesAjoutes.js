import React, { Component } from 'react';
import { connect } from 'react-redux'
import Table from 'react-bootstrap/Table'
import '../competences/CompetenceStyle.css'


class CompetencesAjoutes extends Component {
    render() {
        return (
            <Table responsive="sm">
                <thead>
                    <tr className="headTable">
                        <th>Titre</th>
                        <th>Domaine</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {
                    this.props.competencesDeMentor.length > 0 ?
                        <tbody>
                            {this.props.competencesDeMentor.map(item => (
                                <tr key={item.id_competence} className="oneCompetence">
                                    <td>{item.titre}</td>
                                    <td>{item.domaine}</td>
                                    <td><a className="lire" href={`/nos-competences/${item.id_competence}`} alt="Cliquez ici pour plus de détails">Modifier/Supprimer</a></td>
                                </tr>
                            ))
                            }
                        </tbody>
                        :
                        <span className="message">Vous n'avez pas ajouté encore aucune compétence </span>
                }
            </Table>
        )
    }


};
const mapStateToProps = (state) => ({
    competencesDeMentor: state.mentorReducer.competencesDeMentor
})

export default connect(mapStateToProps)(CompetencesAjoutes);