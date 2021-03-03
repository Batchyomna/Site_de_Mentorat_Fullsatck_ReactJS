import React, { Component } from 'react';
import axios from 'axios'
import { Button } from "react-bootstrap";
import {connect} from 'react-redux'
import {signOutMentor,deleteCompetenceMentor} from '../../store/actions/mentor'
import {signOutAdmin} from '../../store/actions/admin'



class Competence extends Component {
    constructor() {
        super();
        this.status = {
            nom_mentor: '',
            reserve: null,
            titre: '',
            duree: '',
            frequence: '',
            photo_mentor: '',
            domaine: '',
            description: '',
            premiere_date: '',
            id_mentor: null,
            id_apprenti: null
        }
    }
    render() {
        if(this.state){
             return (
            <div className="container">
                  {this.state.reserve === 1 ?
                    <p className="token">indisponsible</p>
                    :
                    <p className="nontoken">disponsible</p>
                    }
                    <br/>
                <h2>{this.state.titre}</h2>
                <div className="photAndDescription">
                    <img src={(this.state.photo_mentor === 'undefined' || this.state.photo_mentor === '') ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC' : this.state.photo_mentor } alt='Mentor_photo' width="10%"  height="10%"/>
                    <div className="description">
                       <p><b>Nom et prénom de Mentor:</b> {this.state.nom_mentor} {this.state.prenom_mentor}</p> 
                        <p><b>Domaine: </b>{this.state.domaine}</p>
                        <p><b>Première date: </b>{this.state.premiere_date.split('T')[0]}</p>
                        <p><b>Pour une durée:</b> {this.state.duree}</p>
                        <p><b>Dans une frequence: </b>{this.state.frequence}</p>
                        <p><b>Description:</b> {this.state.description || "Il n'y a pas une description"}</p>
                    </div>
                </div>
                {
                    this.props.token_admin ?
                    <Button className="oneButton" variant="primary" type="submit" onClick={this.deleteCompetence.bind(this)}>Supprimer</Button>
                    :
                    this.props.id_mentor === this.state.id_mentor && this.state.reserve === 1 ?
                      <span className="redMessage">Vous ne pouvez pas modifier cette compétence pour l'instant.</span>
                    :
                    this.props.id_mentor === this.state.id_mentor && this.state.reserve === 0 ?
                    <>
                      <Button className="oneButton" variant="primary" type="submit" onClick={this.goToEdit.bind(this)}>Modifier</Button>
                      <Button className="oneButton" variant="primary" type="submit" onClick={this.deleteCompetence.bind(this)}>Supprimer</Button>
                    </>

                    :
                    this.props.id_apprenti === null  ?
                      <p className="smallMessage">Connectez-vous sur notre plateforme dans la page <a href="/se-connecter/sign-up">Se connecter</a> pour participer à cette compétence.</p>
                    :
                    this.state.reserve === 1 && this.props.id_apprenti !== this.state.id_apprenti ? 
                      <>
                        <p className="smallMessage">Souhaitez-vous être informé(e) par email ?</p>
                        <p className="smallMessage"> Nous vous informerons dès que cette compétence sera à nouveau disponible.</p>
                        <input type='text' value={this.props.mail_apprenti}/>
                        <Button className="oneButton" variant="primary" type="submit" >Me prévenir par mail</Button>
                      </>
                    : 
                    this.state.reserve === 1 && this.props.id_apprenti === this.state.id_apprenti ? 
                    <p className="smallMessage">Vous êtes en train de suivre cette compétence</p>
                    :
                    this.state.reserve === 0 && this.props.id_apprenti ? 
                    <Button className="oneButton" variant="primary" type="submit" >choisir cette compétence</Button>
                    :
                    null
                }
            </div>
        )
        }else{
          return  <div className="container">Il n'y a pas des informations sur cette compétence</div>
        }
    }
    async componentDidMount() {
        try{
            let x = window.location.pathname.split('/') // x is an array of 3 elem 
            let compId = parseInt(x[x.length - 1])
            let details = await axios.get(`http://localhost:8000/one-competence/${compId}`)
            if (details.status === 200) {
                this.setState({
                    nom_mentor: details.data[0].nom_mentor,
                    reserve: details.data[0].reserve,
                    titre: details.data[0].titre,
                    duree: details.data[0].duree,
                    frequence: details.data[0].frequence,
                    photo_mentor: details.data[0].photo_mentor,
                    domaine: details.data[0].domaine,
                    description : details.data[0].description,
                    id_mentor: details.data[0].id_mentor,
                    id_apprenti: details.data[0].id_apprenti,
                    prenom_mentor: details.data[0].prenom_mentor,
                    premiere_date: details.data[0].premiere_date
                })
            }
        }catch(err){
            console.log(err);
        }
    }
    deleteCompetence(){
        let confirmDelete = window.confirm("Êtes-vous sûr que vous voulez supprimer cette compétence?")
        if(confirmDelete){
            let x = window.location.pathname.split('/')
            let that= this;
           let token = that.props.token_mentor ? that.props.token_mentor : that.props.token_admin ? that.props.token_admin: null
            axios.delete(`http://localhost:8000/mentor/delete/competence/${parseInt(x[x.length - 1])}`,{
                headers: {'Authorization': `${token}`}
              })
            .then((res) =>{
                if(res.status === 200 && that.props.token_mentor){
                    that.props.deleteCompetenceMentor(parseInt(x[x.length - 1]))
                    alert('votre compétence est bien supprimée')
                    window.location.replace('/nos-competences')
                }else if(res.status === 200 && that.props.token_admin){
                    alert('Cette compétence est bien supprimée')
                    window.location.replace('/nos-competences')
                }
            })
            .catch((err) =>{
                alert('vous devez vous connecter à nouveau, jwt expired')
                that.props.signOutMentor()
                that.props.signOutAdmin()
                console.log('err delete comp',err);
            })
        }
        
    }
    goToEdit(){
        let strURL = window.location.pathname.split('/')
        window.location.replace(`/edit/one-competence/${parseInt(strURL[strURL.length - 1])}`)
    }
}
const mapStateToProps =(state) => ({
    id_mentor: state.mentorReducer.id_mentor,
    id_apprenti: state.apprentiReducer.id_apprenti,
    mail_apprenti: state.apprentiReducer.mail_apprenti,
    token_admin: state.adminReducer.token_admin,
    token_mentor: state.mentorReducer.token_mentor

})
const mapDispatchToProps ={
    deleteCompetenceMentor,
    signOutMentor,
    signOutAdmin
}
export default connect(mapStateToProps, mapDispatchToProps)(Competence);