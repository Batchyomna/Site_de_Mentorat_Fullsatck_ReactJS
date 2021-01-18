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
        }
      case "CHANGE_DATA_MENTOR":
        return{
          ...state,
          prenom_mentor: action.payload.prenom_mentor,
          photo_mentor : action.payload.photo_mentor,
          mail_mentor: action.payload.mail_mentor,
          id_mentor: action.payload.id_mentor,
          token_mentor: action.payload.token_mentor, 
        }
      case "FILL_M_COMPETENCES":
        return{
          ...state,
          competences: [...state.competences, action.payload]

        }

    default:
      return state // when we want to add presistStore, it bettre to return the state like this
                   // note return { ...state} like when we do usually
     
  }
};

export default mentorReducer;