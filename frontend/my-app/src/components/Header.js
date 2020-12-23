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
      <div className="header">
        <a href="/" alt="Go Together"><span className="logo">Go Together</span></a>
        {this.props.token_mentor ?  
          (
            <Navbar className="menu">
              <Nav className="menu mr-auto">
                <Link  to="/mentor/profil">Profil</Link>
                <Link  to="/mentor/vos-competence">Vos Compétences</Link>
                <Link  to="/contact">Contact</Link>
                <Link  to="/" onClick={this.signOut.bind(this)}>Se désconnecter</Link>
                <Link  to="/mentor/profil">
                  <img height="40px" width="40px" alt="" src={this.props.photo_mentor} />
                </Link>
              </Nav>
            </Navbar>
          )
      : this.props.token_apprenti ?
         ( 
            <Navbar className="menu">
              <Nav className="menu mr-auto">
                <Link  to="/apprenti/profil">Profil</Link>
                <Link  to="/apprenti/vos-competence">Vos Compétences</Link>
                <Link  to="/contact">Contact</Link>
                <Link  to="/" onClick={this.signOut.bind(this)}> Se désconnecter </Link>
                <Link  to="/apprenti/profil">
                  <img height="40px" width="40px" alt="" src={this.props.photo_apprenti} />
                </Link>
              </Nav>
            </Navbar>
         )
      :
       ( 
          <Navbar  className="menu" >
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
             <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
            <Nav  className="mr-auto menu">
              <Link  to="/" className="header-link">Home</Link>
              <Link  to="/nos-copmetences">Nos Compétences</Link>
              <Link  to="/nos-copmetences">Contact</Link>
              <Link  to="/se-connecter/sign-up">Se Connecter</Link>
            </Nav>
          </Navbar>
       )
      }
    </div>
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
