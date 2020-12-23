 // eslint-disable-next-line
import { BrowserRouter as Router, Link } from "react-router-dom";
import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";

import Nav from "react-bootstrap/Nav";
import { connect } from 'react-redux'
import {signOutMentor} from '../store/actions/mentor'
import {signOutApprenti} from '../store/actions/apprenti'

class Header extends Component {
  render() {
    return(
     
        <Navbar expand="sm" className="header"  >
        <span href="/" className="logo">Go Together</span>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        {this.props.token_mentor ?  
          (
            
              <Nav className="mr-auto">
                <Link  to="/mentor/profil">Profil</Link>
                <Link  to="/mentor/vos-competence">Vos Compétences</Link>
                <Link  to="/contact">Contact</Link>
                <Link  to="/" onClick={this.signOut.bind(this)}>Se désconnecter</Link>
                <Link  to="/mentor/profil">
                  <img height="40px" width="40px" alt="" src={this.props.photo_mentor} />
                </Link>
              </Nav>
           
          )
      : this.props.token_apprenti ?
         ( 
           
              <Nav className="mr-auto">
                <Link  to="/apprenti/profil">Profil</Link>
                <Link  to="/apprenti/vos-competence">Vos Compétences</Link>
                <Link  to="/contact">Contact</Link>
                <Link  to="/" onClick={this.signOut.bind(this)}> Se désconnecter </Link>
                <Link  to="/apprenti/profil">
                  <img height="40px" width="40px" alt="" src={this.props.photo_apprenti} />
                </Link>
              </Nav>
           
         )
      :
       ( 
          
           
           
            <Nav  className="mr-auto menu">
              <Link to="/" active >Home</Link>
              <Link to="/nos-copmetences"  >Nos Compétences</Link>
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
  }
}
const mapStateToProps = (state) => ({
  token_mentor: state.mentorReducer.token_mentor,
  token_apprenti: state.apprentiReducer.token_apprenti,
  photo_apprenti: state.apprentiReducer.photo_apprenti,
  photo_mentor: state.mentorReducer.photo_mentor,

})
const mapDispatchToProps = {
  signOutMentor,
  signOutApprenti,
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
