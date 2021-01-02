import React, { Component } from 'react';
import { connect } from 'react-redux'

import ProfilApprenti from './ProfilApprenti'
import ProfilMentor from './ProfilMentor'
import ProfilAdmin from './ProfilAdmin'
import { Redirect } from 'react-router';


class Profil extends Component {
    render() {
        return (
            <div>
                {this.props.token_apprenti ? 
                ( 
                    <ProfilApprenti/>
                )
                : this.props.token_mentor ?
                (
                    <ProfilMentor/>
                )
                : this.props.token_admin ?
                (
                    <ProfilAdmin/>
                )
                : 
                <Redirect to="/"/>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) =>({
    token_apprenti : state.apprentiReducer.token_apprenti,
    token_mentor : state.mentorReducer.token_mentor,
    token_admin: state.adminReducer.token_admin
});

export default connect(mapStateToProps)(Profil);