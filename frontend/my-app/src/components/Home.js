import React, { Component } from "react";

class Home extends Component {
    render() {
        return (
            <div className="container">
                <h1>Bienvenue sur notre platform de MENTORAT</h1>
                <div className='intro'>
                <p>
                  Entrez pour découvrir les compétences qui vous intéresse.<br/>
                  Formez-vous à distance.<br/>
                  Prenez de l'aide dans le domaine d'informatique.
                </p>
                </div>
            </div>
        );
    }
}

export default Home;
