const initialStates = {
    prenom_apprenti:null,
    photo_apprenti : null,
    mail_apprenti: null,
    id_apprenti:null,
    token_apprenti: null,
 
};

const apprentiReducer = (state = initialStates, action) => {
  switch (action.type) {
    case "SIGNIN_USER":
      return {
        ...state,
    
      }
      case "SIGNOUT_USER":
        return{
          ...state,
        }

    default:
      return state // when we want to add presistStore, it bettre to return the state like this
                   // note return { ...state} like when we do usually
     
  }
};

export default apprentiReducer;