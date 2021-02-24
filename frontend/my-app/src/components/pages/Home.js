import React, { Component } from "react";
import {connect} from 'react-redux'

class Home extends Component {
    render() {
        return (
            <div className="homePage">

                <div className="container">
                    <h1>Bienvenue sur notre platform de MENTORAT</h1>
                    <h2>VOIR PLUS CLAIR</h2>
                    <div className='intro'>
                        <p>
                        Entrez pour découvrir les compétences qui vous intéressent.<br/>
                        Formez-vous à distance.<br/>
                        Trouvez l'aide dans le domaine d'informatique, pour acquérir des nouvelles compétences.
                        </p>
                        <h4 >
                            {this.props.token_mentor || this.props.token_apprenti || this.props.token_admin ? 
                            <p> Rejoignez le club et formez-vous en ligne à un métier d’avenir !</p>
                            :
                            <a href="/se-connecter/sign-up" alt="informatique" className='lire'> Rejoignez le club et formez-vous en ligne à un métier d’avenir ! </a>

                        }
                        </h4>
                        
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state)=> ({
   token_admin : state.adminReducer.token_admin,
    token_mentor: state.mentorReducer.token_mentor,
    token_apprenti : state.apprentiReducer.token_apprenti

})

export default connect(mapStateToProps)(Home);
