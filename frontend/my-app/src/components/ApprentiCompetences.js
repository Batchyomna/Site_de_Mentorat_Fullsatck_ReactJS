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
                <p className="smallMessage">Les compétences que vous avez déjà acquises</p>
                {
                    this.state.items.length > 0 ?
                     (this.state.items.map(item=>(
                         <div key={item.id_competence}>
                             <h6>{item.titre}</h6>
                             <p>{item.domaine}</p>
                         </div>
                     ))
                    )
                    :null
                }
                </section>
            </div>
        );
    }
    async componentDidMount(){
        try{
          let result = await axios.get(`http://localhost:8000/user/history-competence/${this.props.id_apprenti}`)
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