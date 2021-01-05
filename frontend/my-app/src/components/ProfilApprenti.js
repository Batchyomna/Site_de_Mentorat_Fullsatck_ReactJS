import React, { Component } from 'react';
import {connect} from 'react-redux'
import { Form, Row, Col, Button} from 'react-bootstrap'
import axios from 'axios'

class ProfilApprenti extends Component {
    constructor(){
        super()
        this.state ={
            prenom_apprenti: '',
            nom_apprenti: '',
            mail_apprenti: '',
            mdp_apprenti: '',
            photo_apprenti: ''
        }
    }
    render() {
        return (
            <div className="container">
                <h2> Bonjour {this.props.prenom_apprenti}</h2>
                <section className="information">
                    <p className="smallMessage">Vous voulez changer vos coordonées?</p>
                    <Form>
                        <Row>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Prénom</Form.Label>
                                <Form.Control value={this.state.prenom_apprenti} onChange={this.setChange.bind(this)} name="prenom_apprenti" placeholder="Saisissez votre prénom" className="inTheLabel" />
                            </Col>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Nom</Form.Label>
                                <Form.Control value={this.state.nom_apprenti} onChange={this.setChange.bind(this)} name="nom_apprenti" placeholder="Saisissez votre nom" className="inTheLabel" />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Adresse mail</Form.Label>
                                <Form.Control value={this.state.mail_apprenti} onChange={this.setChange.bind(this)} name="mail_apprenti" placeholder="Saisissez votre mail" className="inTheLabel"/>
                            </Col>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Mot de passe</Form.Label>
                                <Form.Control type="password" value={this.state.mdp_apprenti} onChange={this.setChange.bind(this)} name="mdp_apprenti" placeholder="Saisissez votre mot de passe" className="inTheLabel" />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <Form.Label className="float-left label">Photo</Form.Label>
                                <Form.Control value={this.state.photo_apprenti} onChange={this.setChange.bind(this)} name="photo_apprenti" placeholder="URL de votre photo" className="inTheLabel"/>
                            </Col>
                        </Row>
                        <div className="myButtons">
                        <Button className="oneButton float-left" type="submit" onClick={this.editData.bind(this)}>Modifier</Button>
                        </div>
                    </Form>
                </section>
            
            </div>
        );
    }
    setChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
   
    async editData(){
        try{
            let x = this.state;
            for (let key in x) {
              if (x[key] === '') {
                delete x[key]
              }
            }
            let result = await axios.put(`http://localhost:8000/user/apprenti/edit-data/${this.props.id_apprenti}`, x)
            if(result.status===200){
                console.log(result.data);
            }

        }catch(err){
            console.log(err);
        }
    }
}
const mapStateToProps = (state)=> ({
    prenom_apprenti: state.apprentiReducer.prenom_apprenti,
    photo_apprenti: state.apprentiReducer.photo_apprenti,
    id_apprenti: state.apprentiReducer.id_apprenti,

})
export default connect(mapStateToProps)(ProfilApprenti);