 // eslint-disable-next-line
import { BrowserRouter as Router, Link } from "react-router-dom";
import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { connect } from 'react-redux'
import {signOutMentor} from '../store/actions/mentor'
import {signOutApprenti} from '../store/actions/apprenti'
import {signOutAdmin} from '../store/actions/admin'


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
                <Link  to="/user/vos-competences">Vos Compétences</Link>
                <Link to="/nos-competences"  >Nos Compétences</Link>
                <Link  to="/contact">Contact</Link>
                <Link  to="/" onClick={this.signOut.bind(this)}></Link>
                <Link  to="/" onClick={this.signOut.bind(this)}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-power" viewBox="0 0 16 16">
                    <path d="M7.5 1v7h1V1h-1z"/>
                    <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z"/>
                  </svg></Link>
                <Link  to="/user/profil">
                  <img height="50px" width="50px" alt="Mentoring" src={this.props.photo_mentor} />
                </Link>
              </Nav>
          )
      : this.props.token_apprenti ?
         ( 
              <Nav className="mr-auto menu">
                <Link  to="/user/vos-competences">Vos Compétences</Link>
                <Link to="/nos-competences"  >Nos Compétences</Link>
                <Link  to="/contact">Contact</Link>
                <Link  to="/" onClick={this.signOut.bind(this)}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-power" viewBox="0 0 16 16" alt="sign-out">
            <path d="M7.5 1v7h1V1h-1z"/>
            <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z"/>
          </svg></Link>
                <Link  to="/user/profil">
                  <img height="50px" width="50px" alt="Goal,Organisation" src={this.props.photo_apprenti} />
                </Link>
              </Nav>
         )
      :this.props.token_admin ?
      ( 
           <Nav className="mr-auto menu">
             <Link  to="/user/profil">Profil</Link>
             <Link to="/nos-competences"  >Nos Compétences</Link>
             <Link to="/contact" >Contact</Link>
             <Link  to="/" onClick={this.signOut.bind(this)}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-power" viewBox="0 0 16 16">
                  <path d="M7.5 1v7h1V1h-1z"/>
                  <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z"/>
                </svg></Link>
           </Nav>
      )
      :
       ( 
            <Nav  className="mr-auto menu">
              <Link to="/">Accueil</Link>
              <Link to="/nos-competences"  >Nos Compétences</Link>
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
