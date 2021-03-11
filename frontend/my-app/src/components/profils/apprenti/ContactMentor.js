import React, { Component } from 'react';
import { Button, Form, Row, Col } from "react-bootstrap";
import { connect} from 'react-redux'
import axios from 'axios'
import { signOutApprenti} from '../../../store/actions/apprenti'
class ContactMentor extends Component {
    constructor(){
        super();
        this.state = {
        nom: '',
        sujet:'',
        titre: '',
        message:'',
        response: ''
        }
    }
    render() {
        return (
            <div className="container">
                <h2>Contactez votre mentor</h2>
                <span className="greenMessage">{this.state.response}</span><br/>
                <p className="smallMessage">Veuillez remplir tous les champs</p>

                <Form>
                    <Row>
                        <Col sm={4}>
                            <Form.Label className="float-left label">Votre nom *</Form.Label>
                            <Form.Control value={this.state.nom} onChange={this.setChange.bind(this)} name="nom" placeholder="Saisissez votre nom" className="inTheLabel" />
                        </Col>
                        <Col sm={4}>
                            <Form.Label className="float-left label">Sujet *</Form.Label>
                            <Form.Control value={this.state.sujet} onChange={this.setChange.bind(this)} name="sujet" placeholder="Le sujet de votre message" className="inTheLabel" />
                           </Col> 
                           <Col sm={4}>
                            <Form.Label className="float-left label">Compétence titre *</Form.Label>
                            <Form.Control value={this.state.titre} onChange={this.setChange.bind(this)} name="titre" placeholder="Saisissez le titre" className="inTheLabel" />
                           </Col> 
                        </Row>
                    <Row > 
                       <Col sm={12}> 
                          <Form.Group controlId="exampleForm.ControlTextarea1" >
                            <Form.Label className="float-left label">Votre message</Form.Label>
                            <Form.Control as="textarea" rows={5} value={this.state.message} onChange={this.setChange.bind(this)} name="message"  className="inTheLabel"/>
                           </Form.Group>
                       </Col>
                    </Row>
                    <Button className="oneButton float-right" type="submit" onClick={this.contactMentor.bind(this)}>Envoyer</Button>
                </Form>
            </div>
        );
    }
    setChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }    

    async contactMentor(e) { 
       e.preventDefault();
       try{
        let x = window.location.pathname.split('/')  
        //  let mentorMail =x[x.length - 1]
        // let mentorNom = x[x.length - 2]
        let  result = await axios.post(`http://localhost:8000/apprenti/contact-mentor`, {mail_mentor:x[x.length - 1], nom_mentor:x[x.length - 2], titre: this.state.titre ,sujet:this.state.sujet, nom:this.state.nom, message: this.state.message},
        {
         headers: {'authorization': `${this.props.token_apprenti}`}
       })
        if(result.status === 200){
            console.log(result.data);
            this.setState({
             nom: '',
             sujet:'',
             titre: '',
             message:'',  
             response : 'Votre mail est bien envoyé' // marche pas à cause d'actulisation de la page
            })
        }else{
         this.setState({
             nom: '',
             sujet:'',
             titre: '',
             message:'', 
             response : "Nous avons des problèmes, veuillez ressayer", // marche pas à cause d'actulisation de la page
         })
        }
       }catch(err){
        alert('vous devez vous connecter à nouveau, jwt expired')
        this.props.signOutApprenti()
       }
      
    }
}
const mapStateToProps = (state) =>({
    id_apprenti : state.apprentiReducer.id_apprenti,
    token_apprenti: state.apprentiReducer.token_apprenti
})
const mapDispatchToProps ={
    signOutApprenti
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactMentor);