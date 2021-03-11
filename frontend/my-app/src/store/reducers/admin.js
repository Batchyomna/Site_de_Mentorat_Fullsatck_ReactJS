const initialStates = {
    mail_admin: null,
    id_admin:null,
    token_admin: null,
};

const adminReducer = (state = initialStates, action) => {
  switch (action.type) {
    case "SIGNIN_ADMIN":
      return {
        ...state,  
        mail_admin: action.mail_admin,
        id_admin: action.id_admin,
        token_admin: action.token_admin, 
    
      }
      case "SIGNOUT_ADMIN":
        return{
          ...state,
          mail_admin: null,
          id_admin:null,
          token_admin: null,
        }
        case"CHANGE_DATA_ADMIN":
        return{
          ...state,
          mail_admin: action.payload.mail_admin,
          id_admin:action.payload.id_admin,
          token_admin: action.payload.token_admin,
        }
    default:
      return state // when we want to add presistStore, it bettre to return the state like this
                   // note return { ...state} like when we do usually
  }
};

export default adminReducer;