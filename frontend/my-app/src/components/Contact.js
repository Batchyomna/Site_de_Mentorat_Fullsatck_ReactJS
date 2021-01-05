import React, { Component } from 'react';
import { Button, Form, Row, Col } from "react-bootstrap";
import axios from 'axios'
class Contact extends Component {
    constructor(){
        super();
        this.state = {
        nom: '',
        sujet:'',
        mail: '',
        message:'',
        response: ''
        }
    }
    render() {
        return (
            <div className="container">
                <h2>Contactez nous</h2>
                <span className="greenMessage">{this.state.response}</span><br/>
                <p className="smallMessage">Vous avez des questions? Ecrivez-nous et nous vous répondrons le plus vite possible</p>
                <Form>
                    <Row>
                        <Col sm={4}>
                            <Form.Label className="float-left label">Nom *</Form.Label>
                            <Form.Control value={this.state.nom} onChange={this.setChange.bind(this)} name="nom" placeholder="Saisissez votre nom" className="inTheLabel" />
                        </Col>
                        <Col sm={4}>
                            <Form.Label className="float-left label">Sujet *</Form.Label>
                            <Form.Control value={this.state.sujet} onChange={this.setChange.bind(this)} name="sujet" placeholder="Le sujet de votre message" className="inTheLabel" />
                           </Col> 
                           <Col sm={4}>
                            <Form.Label className="float-left label">Adresse mail *</Form.Label>
                            <Form.Control value={this.state.mail} onChange={this.setChange.bind(this)} name="mail" placeholder="Saisissez votre mail" className="inTheLabel" />
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
                    <Button className="oneButton float-right" type="submit" onClick={this.sendEmail.bind(this)}>Envoyer</Button>
                </Form>
            </div>
        );
    }
    setChange(event){
        this.setState({
            [event.target.name]: event.target.value
        });
    }    

    async sendEmail() {  
       let  result = await axios.post('http://localhost:8000/contact', {mail: this.state.mail ,sujet:this.state.sujet, nom:this.state.nom, message: this.state.message})
       if(result.status === 200){
           console.log(result.data);
           this.setState({
               response : 'Votre mail est bien envoyé' // marche pas à cause d'actulisation de la page
           })
       }else{
        this.setState({
            response : 'Excusez-nous, mais il y a des problèmes'// marche pas à cause d'actulisation de la page
        })
           console.log(result.data.mesg);
       }
    }
}

export default Contact;