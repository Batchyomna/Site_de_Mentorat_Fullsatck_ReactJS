import React, { Component } from 'react';
import axios from 'axios'
import { Form } from "react-bootstrap";
class NosCompetences extends Component {
    constructor() {
        super();
        this.state = {
            allCompetences: [],
            allDomaine: [],
            domaineSelected: '',
            id_Comp: null
        }
    }
    async componentDidMount() {
        try {
            let result = await axios.get('http://localhost:8000/all/competences')
            if (result.status === 200) {
                this.setState({ allCompetences: result.data })
            }
            let resutDomaine = await axios.get('http://localhost:8000/all/domaines')
            if(resutDomaine.status === 200){
                this.setState({ allDomaine: resutDomaine.data});
            }
        } catch (err) {
            console.error(err)
        }

    }
    render() {
        return (
            <div className="container">
                <div id="imageNosCopms">
                    <img src="https://images.unsplash.com/photo-1589828994379-7a8869c4f519?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGFwZXIlMjBhcnJvd3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="mentor" width="40%" />
                </div>
                <Form>
                    <Form.Control as="select" onChange={this.setChange.bind(this)} name="domaineSelected" className="inTheLabel" onClick={this.selectDomaine.bind(this)} value={this.state.domaineSelected}>
                        <option value="" className="inTheLabel">All domaines</option>
                        <option value="HTML, CSS" className="inTheLabel">HTML, CSS</option>
                        <option value="JS" className="inTheLabel">JS</option>
                        <option value="PHP" className="inTheLabel">PHP</option>
                        <option value="SQL" className="inTheLabel">SQL</option>
                        <option value="JAVA" className="inTheLabel">JAVA</option>
                        <option value="Python" className="inTheLabel">Python</option>
                        <option value="CMS" className="inTheLabel">CMS</option>
                        <option value="Autre" className="inTheLabel">Autre</option>
                        
                    </Form.Control>
                </Form>
                <h2>Nos Compétences</h2>
                <div className="allComps">
                    {this.state.allCompetences.length > 0 ? this.state.allCompetences.map((item) => {
                        return (
                            <div key={item.id_competence} className="oneComp">
                                {item.reserve ?
                                    <b className="token">indisponsible</b>
                                    :
                                    <b className="nontoken">disponsible</b>
                                    }
                                    <br/>
                                <h4>{item.titre}</h4>
                                <b>Domaine:</b> <p className="smallMessage">{item.domaine}</p>
                                <b>Durée: </b><p className="smallMessage">{item.duree}</p>
                                <a className="lire"  href={`/nos-competences/${item.id_competence}`} alt=" cliquez ici pour plus de détails">Lire plus</a>
                            </div>
                        )
                    })
                    :<div> Il n'a y pas des compétences </div>
                    }
                </div>
            </div>
        )
    }
    setChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
  async  selectDomaine(event){
        if(event.target.value===''){
            this.componentDidMount()
        }else{
            let compsOfDomaine = await axios.get(`http://localhost:8000/domaine/${this.state.domaineSelected}`)
            if(compsOfDomaine.status === 200){
                this.setState({ allCompetences: compsOfDomaine.data })
            }
        }
    }
}

export default NosCompetences;