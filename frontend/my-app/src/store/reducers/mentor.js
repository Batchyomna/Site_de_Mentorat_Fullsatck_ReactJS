const initialStates = {
    prenom:null,
    photo : null,
    email: null,
    id:null,
    token: null,
 
};

const mentorReducer = (state = initialStates, action) => {
  switch (action.type) {
    case "SIGNIN_USER":
      return {
        ...state,
        prenom: action.prenom,
        photo: action.photo,
        email: action.email,
        id: action.id,
        token: action.token,
    
      }
      case "SIGNOUT_USER":
        return{
          ...state,
          prenom: action.prenom,
          photo: action.photo,
          email: action.email,
          id: action.id,
          token: action.token, 
        }

    default:
      return state // when we want to add presistStore, it bettre to return the state like this
                   // note return { ...state} like when we do usually
     
  }
};

export default mentorReducer;