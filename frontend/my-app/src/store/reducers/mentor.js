const initialStates = {
    prenom_mentor:null,
    photo_mentor : null,
    mail_mentor: null,
    id_mentor:null,
    token_mentor: null,
    competencesDeMentor: []
 
};

const mentorReducer = (state = initialStates, action) => {
  switch (action.type) {
    case "SIGNIN_MENTOR":
      return {
        ...state, 
        prenom_mentor:action.prenom_mentor,
        photo_mentor : action.photo_mentor,
        mail_mentor: action.mail_mentor,
        id_mentor:action.id_mentor,
        token_mentor: action.token_mentor,  
    
      }
      case "SIGNOUT_MENTOR":
        return{
          ...state,
          prenom_mentor:null,
          photo_mentor : null,
          mail_mentor: null,
          id_mentor:null,
          token_mentor: null,
          competencesDeMentor: []
        }
      case "CHANGE_DATA_MENTOR":
        return{
          ...state,
          prenom_mentor: action.payload.prenom_mentor,
          photo_mentor : action.payload.photo_mentor,
          mail_mentor: action.payload.mail_mentor,
          id_mentor: action.payload.id_mentor,
        }
      case "FILL_M_COMPETENCES":
        return{
          ...state,
          competencesDeMentor: [...state.competencesDeMentor, action.payload]

        }
      case "EDIT_COMPETENCE_MENTOR":
        let elemForEdit = state.competencesDeMentor.filter(elem => elem.id_competence === action.payload.id_competence)
        let indexElemForEdit = state.competencesDeMentor.indexOf(elemForEdit[0])
        state.competencesDeMentor.splice(indexElemForEdit, 1)
        return{
          ...state,
          competencesDeMentor: [
            ...state.competencesDeMentor.slice(0, indexElemForEdit),
            action.payload,
            ...state.competencesDeMentor.slice(indexElemForEdit + 1, state.competencesDeMentor.length),
          ]
        }
      case "DELETE_COMPETENCE_MENTOR":
        let elemFORDelete = state.competencesDeMentor.filter(elem => elem.id_competence === parseInt(action.payload))
        let index = state.competencesDeMentor.indexOf(elemFORDelete[0])
        return{
          ...state,
          competencesDeMentor: [
            ...state.competencesDeMentor.slice(0, index),
            ...state.competencesDeMentor.slice(index + 1, state.competencesDeMentor.length),
          ]
        }

    default:
      return state // when we want to add presistStore, it bettre to return the state like this
                   // note return { ...state} like when we do usually
     
  }
};

export default mentorReducer;