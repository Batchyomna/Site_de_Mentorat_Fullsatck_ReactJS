import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap'
import {signOutAdmin} from '../../store/actions/admin'

class NosMentors extends Component {
    constructor(){
        super();
        this.state = {
            allMentors: [],
            message: '',
            error: false
        }
    }
    componentDidMount(){
        axios.get('http://localhost:8000/admin/all/mentors', {
            headers: { 'authorization': `${this.props.token_admin}` }
        })
        .then(response =>{
            this.setState({
                allMentors: response.data
            })
        })
    }
    deleteMentor(idMentor){
        axios.delete(`http://localhost:8000/admin/delete-mentor/${idMentor}`,{
          headers: { 'authorization': `${this.props.token_admin}` }
        }).then(res =>{
            if(res.status === 200){
                let itemForDelete = this.state.allMentors.filter( elem => elem.id_mentor === idMentor)
                let index = this.state.allMentors.indexOf(itemForDelete[0])
                this.setState({
                    error: false,
                    message: 'vous avez bien effectué la suppression',
                    allMentors: [...this.state.allMentors.slice(0, index), ...this.state.allMentors.slice(index+1, this.state.allMentors.length)]
                })
            }
        }).catch((error) => {
            console.log(error);
            alert('vous devez vous connecter à nouveau, jwt expired')
            this.props.signOutAdmin()
        });
    }
    
    render() {
        return (
            <div  className="container">
                <h2>Tous les mentors:</h2>
                <span className={this.state.error ? "redMessage" : "greenMessage"}>{this.state.message}</span>
                 <Table responsive="sm">
                    <thead>
                        <tr className="headTable">
                            <th>Nom et prénom</th>
                            <th>Adresse mail</th>
                            <th>Photo</th>
                            <th>SIREN</th>
                            <th>Evaluation</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.allMentors.length > 0 ?
                        this.state.allMentors.map(item =>(
                            <tr key={item.id_mentor} className="oneCompetence">
                                    <td><b>{item.nom_mentor.toUpperCase()}</b> {item.prenom_mentor}</td>
                                    <td>{item.mail_mentor}</td>
                                    <td><img  height="50px" width="50px" src={(item.photo_mentor === 'undefined' || item.photo_mentor === '') ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC' : item.photo_mentor } alt="notre mentor"/></td>
                                    <td>{item.nom_SIREN}</td>
                                    <td>aucune évaluation</td>
                                    <td>
                                        <Button className="deleteButton oneButton"  onClick={this.deleteMentor.bind(this, item.id_mentor)} >Supprimer</Button>
                                    </td>
                                </tr>
                        ))

                        :
                        <tr><td><span className="smallMessage">Il n'y a pas aucun mentor </span></td></tr>

                    }
                    </tbody>
                </Table> 
            </div>
        );
    }
}
const mapStateToProps = (state)=>({
   token_admin: state.adminReducer.token_admin
})
const mapDispatchToProps ={
    signOutAdmin
}


export default connect(mapStateToProps, mapDispatchToProps)(NosMentors) ;