import React, { Component } from "react";
import "./App.css";
import {connect} from 'react-redux'
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Header from './components/autres/Header'
import Footer from './components/autres/Footer'
import Profil from './components/profils/Profil'
import AgendaUser from './components/agenda/AgendaUser'
import Home from './components/pages/Home'
import NosCompetences from './components/pages/NosCompetences'
import Contact from './components/pages/Contact'
import SignIn from './components/pages/SignIn'
import SignUp from './components/pages/SignUp'
import Competence from './components/competences/Competence'
import FormEditComp from "./components/competences/FormEditComp";
import NosApprentis from './components/profils/admin/NosApprentis'
import NosMentors from './components/profils/admin/NosMentors'
import ContactMentor from './components/profils/apprenti/ContactMentor'

class App extends Component {
  render() {
   return (
      <div>
        <Router>
          <Header />
          <Switch>
            <Route exact={true} path="/user/profil" > {this.props.token_mentor || this.props.token_apprenti|| this.props.token_admin ? <Profil /> : <Redirect to="/"/>}</Route>
            <Route exact={true} path="/user/agenda"> {this.props.token_mentor || this.props.token_apprenti ? <AgendaUser/>: <Redirect to="/"/>} </Route>
            <Route exact={true} path="/contact"><Contact/></Route>
            <Route exact={true}  path="/nos-competences"> <NosCompetences/></Route>
            <Route exact={true}  path="/nos-competences/:id" ><Competence/> </Route>
            <Route exact={true}  path="/edit/one-competence/:id" ><FormEditComp/> </Route>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/all-mentors"><NosMentors/></Route>
            <Route exact={true} path="/all-apprentis"><NosApprentis/></Route>
            <Route exact={true} path="/contact-mentor/:nom/:mail">{this.props.token_apprenti ? <ContactMentor/> :  <Redirect to="/"/>} </Route>
            <Route exact={true} path="/se-connecter/sign-in" component={SignIn} />
            <Route exact={true} path="/se-connecter/sign-up" component={SignUp} />
            <Route path="*" component={Home} />
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
