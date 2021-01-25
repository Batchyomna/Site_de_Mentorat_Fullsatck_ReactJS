import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux'

import ApprentiCompetences from './ApprentiCompetences';
import MentorCompetences from './MentorCompetences'

class VosCompetences extends Component {
    render() {
        return (
            <div>
                  {this.props.token_apprenti ? 
                ( 
                    <ApprentiCompetences/>
                )
                : this.props.token_mentor ?
                (
                    <MentorCompetences/>
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
});
export default connect(mapStateToProps)(VosCompetences);