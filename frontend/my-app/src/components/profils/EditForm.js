// import React, { Component } from 'react';
// import { connect } from 'react-redux'
// import { Form, Row, Col, Button } from 'react-bootstrap'
// import axios from 'axios'
// import { changeDataApprenti, signOutApprenti } from '../../store/actions/apprenti'

// class FormModifier extends Component {
//     constructor() {
//         super()
//         this.state = {
//             prenom: '',
//             nom: '',
//             mail: '',
//             mdp: '',
//             photo: '',
//             message: '',
//             messageError: ''
//         }
//     }
//     render() {
//         return (
//             <div>
//                     <Form>
//                         <Row>
//                             <Col sm={6}>
//                                 <Form.Label className="float-left label">Prénom</Form.Label>
//                                 <Form.Control value={this.state.prenom} onChange={this.setChange.bind(this)} name="prenom" placeholder="Saisissez votre prénom" className="inTheLabel" />
//                             </Col>
//                             <Col sm={6}>
//                                 <Form.Label className="float-left label">Nom</Form.Label>
//                                 <Form.Control value={this.state.nom} onChange={this.setChange.bind(this)} name="nom" placeholder="Saisissez votre nom" className="inTheLabel" />
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col sm={6}>
//                                 <Form.Label className="float-left label">Adresse mail</Form.Label>
//                                 <Form.Control value={this.state.mail} onChange={this.setChange.bind(this)} name="mail" placeholder="Saisissez votre mail" className="inTheLabel" />
//                             </Col>
//                             <Col sm={6}>
//                                 <Form.Label className="float-left label">Mot de passe</Form.Label>
//                                 <Form.Control type="password" value={this.state.mdp} onChange={this.setChange.bind(this)} name="mdp" placeholder="Saisissez votre mot de passe" className="inTheLabel" />
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col sm={12}>
//                                 <Form.Label className="float-left label">Photo</Form.Label>
//                                 <Form.Control value={this.state.photo} onChange={this.setChange.bind(this)} name="photo" placeholder="URL de votre photo" className="inTheLabel" />
//                             </Col>
//                         </Row>
//                         <div className="myButtons">
//                             <Button className="oneButton" type="submit" onClick={this.editData.bind(this)}>Modifier</Button>
//                         </div>
//                     </Form>
//             </div>
//         );
//     }
//     async editDat(e){
//         e.preventDefault();
//          let dataToEdit = deleteEmptyValue(this.state)
//         if (Object.keys(dataToEdit).length > 0) {
//             if(this.props.token_apprenti){
//             let updateRresult = await axios.put(`http://localhost:8000/user/apprenti/edit-data/${this.props.id_apprenti}`, dataToEdit,{
//                 headers: {'Authorization': `${this.props.token_apprenti}`}
//             })
//             if (updateRresult.status === 200) {
//                 this.props.changeDataApprenti({id_apprenti: updateRresult.data.id_apprenti, token_apprenti: updateRresult.data.token_apprenti, mail_apprenti: updateRresult.data.mail_apprenti, photo_apprenti: updateRresult.data.photo_apprenti, prenom_apprenti: updateRresult.data.prenom_apprenti })
//                 this.setState({
//                     prenom: '',
//                     nom: '',
//                     mail: '',
//                     mdp: '',
//                     photo: '',
//                     message: 'Vos coordonnées sont bien changées'
//                 })
//         }else if(this.props.token_mentor){

//         }else if(this.props.token_admin){

//         }
//             if (updateRresult.status === 200) {
//                 this.props.changeDataApprenti({id_apprenti: updateRresult.data.id_apprenti, token_apprenti: updateRresult.data.token_apprenti, mail_apprenti: updateRresult.data.mail_apprenti, photo_apprenti: updateRresult.data.photo_apprenti, prenom_apprenti: updateRresult.data.prenom_apprenti })
//                 this.setState({
//                     prenom_apprenti: '',
//                     nom_apprenti: '',
//                     mail_apprenti: '',
//                     mdp_apprenti: '',
//                     photo_apprenti: '',
//                     message: 'Vos coordonnées sont bien changées'
//                 })
//             } else {
//                 this.setState({
//                     prenom_mentor: '',
//                     nom_mentor: '',
//                     mail_mentor: '',
//                     mdp_mentor: '',
//                     photo_mentor: '',
//                     messageError: 'Excusez-nous, mais vous devrez ressayer'
//                 })
//             }
//         } else {
//             this.setState({
//                 messageError: 'vous devez remplir au moins un champ pour changer ves coordonnées'
//             })
//         }
//     }  
//     deleteEmptyValue(objet){
//         const regex = /[<]*<[\s\u200B]*script[\s\u200B]*>.*[/]*[<]*<[\s\u200B]*\/[\s\u200B]*script[\s\u200B]*>/ig;
//         for (let key in objet) {
//             if (objet[key] === '' || regex.test(objet[key])) {
//                 delete objet[key]
//             }
//         }
//         return objet
//     }
// }

// export default FormModifier;