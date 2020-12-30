const initialStates = {
    prenom_apprenti:null,
    photo_apprenti : null,
    mail_apprenti: null,
    id_apprenti:null,
    token_apprenti: null,
 
};

const apprentiReducer = (state = initialStates, action) => {
  switch (action.type) {
    case "SIGNIN_APPRENTI":
      return {
        ...state,
        prenom_apprenti:action.prenom_apprenti,
        photo_apprenti : action.photo_apprenti,
        mail_apprenti: action.mail_apprenti,
        id_apprenti:action.id_apprenti,
        token_apprenti: action.token_apprenti, 
    
      }
      case "SIGNOUT_APPRENTI":
        return{
          ...state,
          prenom_apprenti:null,
          photo_apprenti : null,
          mail_apprenti: null,
          id_apprenti:null,
          token_apprenti: null,
        }

    default:
      return state // when we want to add presistStore, it bettre to return the state like this
                   // note return { ...state} like when we do usually
     
  }
};

export default apprentiReducer;