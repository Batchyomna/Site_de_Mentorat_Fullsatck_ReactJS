const initialStates = {
    prenom_mentor:null,
    photo_mentor : null,
    mail_mentor: null,
    id_mentor:null,
    token_mentor: null,
    competences: []
 
};

const mentorReducer = (state = initialStates, action) => {
  switch (action.type) {
    case "SIGNIN_MENTOR":
      return {
        ...state,   
    
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
      case "FILL_M_COMPETENCES":
        return{
          ...state,
          competences: [...state.competencescompetences, action.payload]

        }

    default:
      return state // when we want to add presistStore, it bettre to return the state like this
                   // note return { ...state} like when we do usually
     
  }
};

export default mentorReducer;