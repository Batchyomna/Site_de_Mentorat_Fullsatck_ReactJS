const initialStates = {
    prenom:null,
    photo : null,
    mail: null,
    id:null,
    token: null,
 
};

const apprentiReducer = (state = initialStates, action) => {
  switch (action.type) {
    case "SIGNIN_USER":
      return {
        ...state,
        prenom: action.prenom,
        photo: action.photo,
        mail: action.mail,
        id: action.id,
        token: action.token,
    
      }
      case "SIGNOUT_USER":
        return{
          ...state,
          prenom: action.prenom,
          photo: action.photo,
          mail: action.mail,
          id: action.id,
          token: action.token, 
        }

    default:
      return state // when we want to add presistStore, it bettre to return the state like this
                   // note return { ...state} like when we do usually
     
  }
};

export default apprentiReducer;