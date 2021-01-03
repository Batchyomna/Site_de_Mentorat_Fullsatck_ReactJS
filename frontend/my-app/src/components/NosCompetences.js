import React, { Component } from 'react';
import axios from 'axios'
import { Form } from "react-bootstrap";
import  { Redirect } from 'react-router-dom'

class NosCompetences extends Component {
    constructor() {
        super();
        this.state = {
            allCompetences: [],
            allDomaine: [],
            domaineSelected: '',
            flagOneComp: false,
            id_Comp: null
        }
    }
    render() {
        if (!this.state.flagOneComp) {
            return (
                <div className="container">
                    <div id="imageNosCopms">
                        <img src="https://images.unsplash.com/photo-1589828994379-7a8869c4f519?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGFwZXIlMjBhcnJvd3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="mentor" width="40%" />
                    </div>
                    <Form>
                        <Form.Control as="select" onChange={this.setChange.bind(this)} name="domaineSelected" className="inTheLabel">
                            <option value="" className="inTheLabel">Choisissez un domaine</option>
                            {this.state.allDomaine.length !== 0 ? this.state.allDomaine.map((elem) => {
                                return <option value={elem} className="inTheLabel">{elem}</option>

                            })
                                : null}
                        </Form.Control>
                    </Form>

                    <div className="allComps">
                        {this.state.allCompetences.length > 0 ? this.state.allCompetences.map((item) => {
                            return (
                                <div key={item.id_competence} className="oneComp">
                                    {item.reserve ?
                                    <><h4 className="taken">{item.titre} </h4><b>(indisponsible)</b></>
                                     :
                                     <h4 className="nontaken">{item.titre}</h4>
                                     }
                                    
                                    <h6><b>Domaine:</b> {item.domaine}</h6>
                                    <p><b>Description: </b>{item.description}</p>
                                    <p className="lire" onClick={this.readMore.bind(this, item.id_competence)}>Lire plus</p>

                                </div>
                            )

                        }
                        )
                        : <div> else </div>
                        }
                    </div>
                </div>
            );
        }else{
            return <Redirect to={`/nos-competences/${this.state.id_Comp}`}/>
        }

    }

    async componentDidMount() {
        try {
            let result = await axios.get('http://localhost:8000/all/competences')
            if (result.status === 200) {
                for (let i in result.data) {
                    this.state.allCompetences.push(result.data[i])
                }
                console.log(this.state.allCompetences[0].description);
                this.setState({ allCompetences: result.data })
            }
        } catch (err) {
            console.error(err)
        }

    }
    setChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    readMore(id) {
        this.setState({
            flagOneComp: true,
            id_Comp: id
        })
    }
}

export default NosCompetences;