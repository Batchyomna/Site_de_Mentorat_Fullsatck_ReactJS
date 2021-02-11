import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Form, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios'
import { changeDataAdmin, signOutAdmin } from '../../store/actions/admin'
class ProfilAdmin extends Component {
    constructor(){
        super()
        this.state ={
            mail_admin: '',
            mdp_admin: '',
            mail_new_admin: '',
            mdp_new_admin: '',
            message: '',
            error: false,
            mentors: []
        }
    }
    componentDidMount(){
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
     setChange =  (event) => {
        this.setState({
            message: '',
            error: false,
            [event.target.name]: event.target.value
        });
    }
        async editData(e){
            e.preventDefault();
            try{
            if (this.state.mail_admin || this.state.mdp_admin) {
                let updateRresult = await axios.put(`http://localhost:8000/user/admin/edit-data/${this.props.id_admin}`, {mail:this.state.mail_admin, mdp:this.state.mdp_admin},{
                    headers: {'Authorization': `${this.props.token_admin}`}
                })
                if(updateRresult.status === 200) {
                    this.props.changeDataAdmin({id_admin: updateRresult.data.id_admin, token_admin: updateRresult.data.token_admin, mail_admin: updateRresult.data.mail_admin })
                    this.setState({
                        mail_admin: '',
                        mdp_admin: '',
                        error: false,
                        message: 'Vos coordonnées sont bien changées'
                    })
                } else {
                    this.setState({
                        mail_admin: '',
                        mdp_admin: '',
                        error: false,
                        messageError: 'Excusez-nous, mais vous devrez réessayer'
                    })
                }
            } else {
                this.setState({
                    error: true,
                    message: 'vous devez remplir au moins un champ pour changer vos informations'
                })
            }
        } catch (err) {
            console.log(err);
            alert('vous devez vous connecter à nouveau')
            this.props.signOutAdmin() // jwt expired
        }
    }
    async addAdmin(e){
        e.preventDefault();
        let {mail_new_admin, mdp_new_admin} = this.state
        try{
            if(mail_new_admin && mdp_new_admin){
                let addNewAdmin = await axios.post('http://localhost:8000/admin/new-admin',{mail: mail_new_admin, mdp: mdp_new_admin}, {
                    headers: {'Authorization': `${this.props.token_admin}`}
                  })
                if(addNewAdmin.status === 201){
                    this.setState({
                        mail_new_admin: '',
                        mdp_new_admin: '',
                        error: false,
                        message: 'vous avez bien ajouté un nouveau admin'
                    })
                }else{
                    this.setState({
                        mail_new_admin: '',
                        mdp_new_admin: '',
                        error: true,
                        message: 'vous devez réssayer, car il y a des problème de conniexion'
                    })
                }
            }else{
                this.setState({
                    mail_new_admin: '',
                    mdp_new_admin: '',
                    error: true,
                    message: 'vous devez remplir les deux champs'
                })
            }
        }catch(err){
            console.log(err);
            alert('vous devez vous connecter à nouveau')
            this.props.signOutAdmin()// jwt expired
        }
    }
    async deleteAccount(e) {
        e.preventDefault();
        try {
            let deletResult = await axios.delete(`http://localhost:8000/user/admin/delete-compte/${this.props.id_admin}`,
            {
                headers: {'Authorization': `${this.props.token_admin}`}
            })
            if (deletResult.status === 200) {
                console.log(deletResult);
                this.props.signOutAdmin()
            }
        } catch (err) {
            console.log(err);
            alert('vous devez vous connecter à nouveau')
            this.props.signOutAdmin()// jwt expired
        }
    }
    deleteMentor(idMentor) {
        let that = this
        axios.delete(`http://localhost:8000/admin/non-valid/${idMentor}`, {
            headers: {'Authorization': `${this.props.token_admin}`}
        }).then((response) => {
            console.log(response);
            that.setState({
                error: false,
                message: 'vous avez bien effectué la suppression'
            })
        }).catch((error)=> {
            console.log(error);
            alert('vous devez vous connecter à nouveau') 
            this.props.signOutAdmin()// jwt expired

        });
    }
    async validMentor(idMentor){
        try{
            let updateResult = await axios.put(`http://localhost:8000/admin/valid/${idMentor}`,{
                headers: {'Authorization': `${this.props.token_admin}`}
            })
            if (updateResult.status === 200) {
                this.setState({
                    error: false,
                    message: 'vous avez bien effectué la validation'
                })
            }else{
                this.setState({
                    error: true,
                    message: 'vous devez réessayer à cause de problème de connexion'
                })
            }
        }catch(err){
            console.log(err);
            alert('vous devez vous connecter à nouveau')
            this.props.signOutAdmin()// jwt expired
        }
    }
    render() {
        return (
            <div className="container">
                 <h1> En tant qu'un Admin </h1>
                {/* <span className="redMessage">{this.state.messageError}</span>  */}
                <section className="information">
                    <span className={this.state.error ? "redMessage" : "greenMessage"}>{this.state.message}</span>
                    <h2 className="smallMessage">Vous voulez changer vos informations personnelles?</h2>
                    <Form>
                        <Row>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Adresse mail</Form.Label>
                                <Form.Control value={this.state.mail_admin} onChange={this.setChange.bind(this)} name="mail_admin" placeholder="email@exemple.com" className="inTheLabel"/>
                            </Col>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Mot de passe</Form.Label>
                                <Form.Control type="password" value={this.state.mdp_admin} onChange={this.setChange.bind(this)} name="mdp_admin" placeholder="Saisissez votre mot de passe" className="inTheLabel" />
                            </Col>
                        </Row>
                        <div className="myButtons">
                        <Button className="oneButton" type="submit" onClick={this.editData.bind(this)}>Modifier</Button>
                        </div>
                    </Form>
                </section>
                <section>
                <h2 className="smallMessage">Vous voulez ajouter un nouveau adimnistrateur? </h2>
                <h2 className="smallMessage">Saisissez ses informations</h2>
                    <Form>
                        <Row>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Adresse mail</Form.Label>
                                <Form.Control value={this.state.mail_new_admin} onChange={this.setChange.bind(this)} name="mail_new_admin" placeholder="email@exemple.com" className="inTheLabel"/>
                            </Col>
                            <Col sm={6}>
                                <Form.Label className="float-left label">Mot de passe</Form.Label>
                                <Form.Control type="password" value={this.state.mdp_new_admin} onChange={this.setChange.bind(this)} name="mdp_new_admin" placeholder="Saisissez votre mot de passe" className="inTheLabel" />
                            </Col>
                        </Row>
                        <div className="myButtons">
                        <Button className="oneButton" type="submit" onClick={this.addAdmin.bind(this)}>Ajouter</Button>
                        </div>
                    </Form>
                </section>
                <section className="history">
                <h2 className="smallMessage">Les mentors qui attendent votre permission:</h2>
                {
                    this.state.mentors.length >0 ?
                    this.state.mentors.map(item=>(
                        <div key={item.id_mentor} className="profilOneCompetence">
                            <h6>{item.prenom_mentor} <b>{item.nom_mentor}</b></h6>
                            <p>SIREN: {item.nom_SIREN}</p>
                            <div className="myButtons">
                                <Button className="validButton oneButton"  onClick={this.validMentor.bind(this, item.id_mentor)} >Valider ce mentor</Button>
                                <Button className="deleteButton oneButton"  onClick={this.deleteMentor.bind(this, item.id_mentor)} >Supprimer ce mentor</Button>
                            </div> 
                        </div>
                    )
                   )
                   :
                   <span className="message">Il n'y a pas aucun mentor sans validation </span>
                }
                </section>
                <div className="myButtons">
                    <Button className="deleteButton oneButton" type="submit" onClick={this.deleteAccount.bind(this)}>Supprimer votre compte</Button>
                </div> 
            </div>
        );
    }
    
    
}
const mapStateToProps = (state)=> ({
    id_admin: state.adminReducer.id_admin,
    token_admin: state.adminReducer.token_admin

})
const mapDispatchToProps = {
    changeDataAdmin,
    signOutAdmin

}
export default connect(mapStateToProps, mapDispatchToProps)(ProfilAdmin);