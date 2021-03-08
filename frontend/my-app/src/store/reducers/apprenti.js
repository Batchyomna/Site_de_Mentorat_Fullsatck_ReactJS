const initialStates = {
    prenom_apprenti:null,
    photo_apprenti : null,
    mail_apprenti: null,
    id_apprenti:null,
    token_apprenti: null,
    competencesDePasse: []
 
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
          competencesDePasse : []
        }
      case "CHANGE_DATA_APPRENTI":
        return{
          ...state,
          prenom_apprenti:action.payload.prenom_apprenti,
          photo_apprenti : action.payload.photo_apprenti,
          mail_apprenti: action.payload.mail_apprenti,
          id_apprenti:action.payload.id_apprenti,
        }
      case "FILL_A_COMPETENCES":
        return {
          ...state,
          competencesDePasse: [...state.competencesDePasse, action.payload]

        }
    default:
      return state// when we want to add presistStore, it bettre to return the state like this
                   // note return { ...state} like when we do usually
     
  }
};

export default apprentiReducer;