import React, { Component } from 'react';
import { Button, Form, Row, Col } from "react-bootstrap";

const nodemailer = require('nodemailer');

class Contact extends Component {
    constructor(){
        super();
        this.state = {
        prenom: '',
        nom: '',
        sujet:'',
        mail: '',
        message:'',
        }
    }
    render() {
        return (
            <div className="container">
                <h2>Contactez nous</h2>
                <p className="smallMessage">Vous avez des questions? Ecrivez-nous et nous vous répondrons le plus vite possible</p>
                <Form>
                    <Row>
                        <Col sm={6}>
                            <Form.Label className="float-left label">Prénom *</Form.Label>
                            <Form.Control value={this.state.prenom} onChange={this.setChange.bind(this)} name="prenom" placeholder="Saisissez votre prénom" className="inTheLabel" />
                        </Col>
                        <Col sm={6}>
                            <Form.Label className="float-left label">Nom *</Form.Label>
                            <Form.Control value={this.state.nom} onChange={this.setChange.bind(this)} name="nom" placeholder="Saisissez votre nom" className="inTheLabel" />
                        </Col>
                        </Row> 
                        <Row>
                        <Col sm={6}>
                            <Form.Label className="float-left label">Sujet de votre message *</Form.Label>
                            <Form.Control value={this.state.sujet} onChange={this.setChange.bind(this)} name="sujet" placeholder="Le sujet de votre message" className="inTheLabel" />
                           </Col> 
                           <Col sm={6}>
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
        console.log(this.state);
    }
    sendEmail() {  //Simple Mail Transfer Protocol
        const transporter = nodemailer.createTransport({
          service: 'gmail',
        });
        
        const mailOptions = {
          from: 'khalilsleaby@hotmail.com',
          to: 'kh.yomna@gmail.com',
          subject: 'test',
          text: 'HELOOOOOO YOMNA!'
        };
        console.log('my options',mailOptions);
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            alert('Votre message est bien envoyé')
            console.log('Email sent: ' + info.response);
          }
        });  
    }
}

export default Contact;