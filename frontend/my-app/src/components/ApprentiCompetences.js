import axios from 'axios';
import React, { Component } from 'react';
import {connect} from 'react-redux'
class ApprentiCompetences extends Component {
    constructor(){
        super()
        this.state ={
            items:[]
        }
    }
    render() {
        return (
            <div className="container">
                 <section className="history">
                <p className="smallMessage">Les compétences que vous êtes en train de suivre</p>
                {
                    this.state.items.length > 0 ?
                     (this.state.items.map(item=>(
                         <div key={item.id_competence} className='profilOneCompetence'>
                             <h6><b>Titre:</b> {item.titre}</h6>
                             <p><b>Domaine:</b> {item.domaine}</p>
                             <p><b>Prochaine session:</b> {item.date_session}</p>
                         </div>
                     ))
                    )
                    :<div>Vous n'avez pas des compétences</div>
                }
                </section>
            </div>
        );
    }
    async componentDidMount(){
        try{
          let result = await axios.get(`http://localhost:8000/apprenti/all-competences/${this.props.id_apprenti}`)
          if(result.status === 200){
              this.setState({
                  items: result.data
              })
            console.log(result);
          }
        }catch(err){
            console.log(err);
        }
    }
}
const mapStateToProps = (state) => ({
    id_apprenti: state.apprentiReducer.id_apprenti,

})

export default connect(mapStateToProps)(ApprentiCompetences);