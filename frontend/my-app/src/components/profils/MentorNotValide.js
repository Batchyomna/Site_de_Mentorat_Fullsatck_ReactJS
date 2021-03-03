import React, { Component } from 'react';
import { connect } from 'react-redux'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
import { Button } from 'react-bootstrap'

import { signOutAdmin } from '../../store/actions/admin'

class MentorNotValide extends Component {
    constructor(){
        super();
        this.state={
            mentors: [],
            error: false,
            message: ''
        }
    }
    componentDidMount() {
        axios.get('http://localhost:8000/admin/mentors/all-not-valid')
            .then((response) => {
                this.setState({
                    mentors: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            })
            
    }
    async validMentor(idMentor) {
        try {
            let updateResult = await axios.put(`http://localhost:8000/admin/valid/${idMentor}`,{}, // on doit préciser le body
            {
                headers: { 'authorization': `${this.props.token_admin}` }
            })
            if (updateResult.status === 200) {
                let item = this.state.mentors.filter( elem => elem.id_mentor === idMentor)
                let index = this.state.mentors.indexOf(item[0])
                this.setState({
                    error: false,
                    message: 'vous avez bien effectué la validation',
                    mentors: [...this.state.mentors.slice(0, index), ...this.state.mentors.slice(index+1, this.state.mentors.length)]
                })
            } else {
                this.setState({
                    error: true,
                    message: 'vous devez réessayer à cause de problème de connexion'
                })
            }
        } catch (err) {
            console.log(err);
            alert('vous devez vous connecter à nouveau, jwt expired')
            this.props.signOutAdmin()
        }
    }
    deleteMentor(idMentor) {
        let that = this
        axios.delete(`http://localhost:8000/admin/non-valid/${idMentor}`, // on n'a pas besoin de préciser le body
         {
            headers: { 'authorization': `${that.props.token_admin}` }
        }).then((response) => {
            if(response.status === 200){
                let itemForDelete = that.state.mentors.filter( elem => elem.id_mentor === idMentor)
                let index = that.state.mentors.indexOf(itemForDelete[0])
                that.setState({
                    error: false,
                    message: 'vous avez bien effectué la suppression',
                    mentors: [...that.state.mentors.slice(0, index), ...that.state.mentors.slice(index+1, that.state.mentors.length)]
                })
            }
        }).catch((error) => {
            console.log(error);
            alert('vous devez vous connecter à nouveau, jwt expired')
            that.props.signOutAdmin()
        });
    }
    render() {
        return (
            <section className="history">
             <span className={this.state.error ? "redMessage" : "greenMessage"}>{this.state.message}</span>
            <h2>Les mentors qui attendent votre permission:</h2>
            <Table responsive="sm">
                <thead>
                    <tr className="headTable">
                        <th>NOM et prénom</th>
                        <th>Numéro SIREN</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                       this.state.mentors && this.state.mentors.length > 0 ?
                            this.state.mentors.map(item => (
                                <tr key={item.id_mentor} className="oneCompetence">
                                    <td><b>{item.nom_mentor.toUpperCase()}</b> {item.prenom_mentor}</td>
                                    <td>{item.nom_SIREN}</td>
                                    <td>
                                        <Button className="validButton oneButton"  onClick={this.validMentor.bind(this, item.id_mentor)} >Valider</Button>
                                        <Button className="deleteButton oneButton"  onClick={this.deleteMentor.bind(this, item.id_mentor)} >Invalider</Button>
                                    </td>
                                </tr>
                            )
                            )
                            :
                            <tr><td><span className="smallMessage">Il n'y a pas aucun mentor sans validation </span></td></tr>
                    }
                </tbody>
            </Table>
        </section>

        );
    }
}
const mapStateToProps = (state) => ({
    id_admin: state.adminReducer.id_admin,
    token_admin: state.adminReducer.token_admin

})
const mapDispatchToProps = {
    signOutAdmin
}
export default connect(mapStateToProps, mapDispatchToProps)(MentorNotValide);