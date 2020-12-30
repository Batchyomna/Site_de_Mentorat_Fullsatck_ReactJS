import React, { Component } from "react";
import "./App.css";
import {connect} from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Header from './components/Header'
import Footer from './components/Footer'
// import ProfilApprenti from './components/ProfilApprenti'
import ApprentiCompetence from './components/ApprentiCompetence'
import Profil from './components/Profil'
import MentorCompetence from './components/MentorCompetence'
import Home from './components/Home'
import NosCompetences from './components/NosCompetences'
import Contact from './components/Contact'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Competence from './components/Competence'

class App extends Component {
  render() {
   return (
      <div>
        <Router>
          <Header />
          <Switch>
            <Route exact={true} path="/profil"> {this.props.token_mentor || this.props.token_apprenti|| this.props.token_admin ? <Profil/> : <Redirect to="/"/>}</Route>
            <Route exact={true} path="/mentor/vos-competence"> {this.props.token_mentor ? <MentorCompetence/>: <Redirect to="/"/>} </Route>
            {/* <Route exact={true} path="/apprenti/profil"> {(this.props.token_apprenti) ? (<ProfilApprenti/>) :( <Redirect to="/"/>)}</Route> */}
            <Route exact={true} path="/apprenti/vos-competence"> {(this.props.token_apprenti) ? <ApprentiCompetence/> :( <Redirect to="/"/>)} </Route>
            <Route exact={true} path="/contact"><Contact/></Route>
            <Route exact={true}  path="/nos-copmetences"> <NosCompetences/></Route>
            <Route exact={true}  path="/nos-competences/:id" ><Competence/> </Route>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/se-connecter/sign-in" component={SignIn} />
            <Route exact={true} path="/se-connecter/sign-up" component={SignUp} />
            <Route path="*" ><div className="container">404 NOT FOUND</div></Route>
          </Switch>
          <Footer/>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token_mentor: state.mentorReducer.token_mentor,
  token_apprenti: state.apprentiReducer.token_apprenti,
  token_admin: state.adminReducer.token_admin,

})
export default connect(mapStateToProps)(App);
