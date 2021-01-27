import React, { Component } from "react";

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
                        <h4 className='lire'>
                            <a href="/se-connecter/sign-up" alt="informatique"> Rejoignez le club et vous informez toute l'année ! </a>
                        </h4>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
