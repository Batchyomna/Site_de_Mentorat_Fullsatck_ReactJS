 // eslint-disable-next-line
import { BrowserRouter as Router, Link } from "react-router-dom";
import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { connect } from 'react-redux'
import {signOutMentor} from '../../store/actions/mentor'
import {signOutApprenti} from '../../store/actions/apprenti'
import {signOutAdmin} from '../../store/actions/admin'


class Header extends Component {
  render() {
    return(
        <Navbar expand="sm" className="header">
        <a href="/" className="logo">Go Together</a>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        {this.props.token_mentor ?  
          (
              <Nav className="mr-auto menu">                
                <Link to="/nos-competences"  >Nos Compétences</Link>
                <Link  to="/contact">Contact</Link>
                <Link  to="/user/agenda">votre agenda</Link>
                <Link  to="/user/profil">
                  <img height="50px" width="50px" alt="Mentoring" src={this.props.photo_mentor} />
                </Link>
                <Link  to="/" onClick={this.signOut.bind(this)}>
                   <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                      <path  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                      <path  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                   </svg>
                </Link>
              </Nav>
          )
      : this.props.token_apprenti ?
         ( 
              <Nav className="mr-auto menu">
                <Link to="/nos-competences"  >Nos Compétences</Link>
                <Link  to="/contact">Contact</Link>
                <Link  to="/user/agenda">votre agenda</Link>
                <Link  to="/user/profil">
                  <img height="50px" width="50px" alt="apprentissge" src={this.props.photo_apprenti} />
                </Link>
                <Link  to="/" onClick={this.signOut.bind(this)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                    <path d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                    <path d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                  </svg>
                  </Link>
              </Nav>
         )
      :this.props.token_admin ?
      ( 
           <Nav className="mr-auto menu">
             <Link  to="/user/profil">Profil</Link>
             <Link to="/nos-competences"  >Nos Compétences</Link>
             <Link to="/contact" >Contact</Link>
             <Link  to="/" onClick={this.signOut.bind(this)}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                    <path d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                    <path d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                  </svg>
              </Link>
           </Nav>
      )
      :
       ( 
            <Nav  className="mr-auto menu">
              <Link to="/">Accueil</Link>
              <Link to="/nos-competences" >Nos Compétences</Link>
              <Link to="/contact" >Contact</Link>
              <Link to="/se-connecter/sign-up" >Se Connecter</Link>
            </Nav>
       )
      }
       </Navbar.Collapse>
      </Navbar>
    )
  }
  
  signOut() {
    this.props.signOutMentor()
    this.props.signOutApprenti()
    this.props.signOutAdmin()

  }
}
const mapStateToProps = (state) => ({
  token_mentor: state.mentorReducer.token_mentor,
  token_apprenti: state.apprentiReducer.token_apprenti,
  photo_apprenti: state.apprentiReducer.photo_apprenti,
  photo_mentor: state.mentorReducer.photo_mentor,
  token_admin: state.adminReducer.token_admin

})
const mapDispatchToProps = {
  signOutMentor,
  signOutApprenti,
  signOutAdmin
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
