import React, { Component } from 'react';
import FormAddComp from './FormAddComp'
import {connect} from 'react-redux'
import axios from 'axios';


class MentorCompetences extends Component {
    constructor(){
        super()
        this.state ={
            message: '',
            messageError:'',
            items: []
        }
    }
    componentDidMount(){
       
            axios.get(`http://localhost:8000/mentor/session-competences/${this.props.id_mentor}`)
            .then((response)=>{
                console.log('Mount',response);

            })
            .catch((err)=>{
            console.log(err);
        })
    }
    render() {
        return (
            <div className="container">
            <h2> Bonjour {this.props.prenom_mentor}</h2>
            <section className="information">
            <h3 className="smallMessage">vos prochaines sessions</h3>


            </section>
            <FormAddComp/>
            </div>
        );
    }
}
const mapStateToProps = (state) =>({
    id_mentor: state.mentorReducer.id_mentor,
    prenom_mentor: state.mentorReducer.prenom_mentor

})

export default connect(mapStateToProps)(MentorCompetences);