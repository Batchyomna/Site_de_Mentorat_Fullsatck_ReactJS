// import React, { Component } from 'react';

// class Competence extends Component {
//     constructor(){
//         super();
//         this.status = {
//             mentor: '',
//             reservé: false,
//             titre: '',
//             duree: '',
//             frequence: '',
//             photo_mentor :''
//         }
//     }
//     render() {
        
//         return (
//             <div>
//               ONNNNE
//             </div>
//         );
//     }
//     componentDidMount(){
//      let x =  window.location.pathname.split('/')
//         console.log(typeof parseInt(x[x.length - 1]));
//         let compId =  parseInt(x[x.length - 1])
//         let details = axios.get(`http://localhost:8000/one-competences/${compId}`)
//         if(details.status === 200){
//             this.setState({
//                 mentor: '',
//                 reservé: false,
//                 titre: '',
//                 duree: '',
//                 frequence: '',
//                 photo_mentor :''
//             })
//         }

//     }
// }

// export default Competence;