export const signInMentor = (user) => ({
    type: "SIGNIN_MENTOR",
    prenom_mentor: user.prenom_mentor,
    photo_mentor: user.photo_mentor,
    mail_mentor: user.mail_mentor,
    id_mentor: user.id_mentor,
    token_mentor: user.token_mentor,
   
})
export const signOutMentor = () => ({
    type: "SIGNOUT_MENTOR",
    prenom_mentor:null,
    photo_mentor : null,
    mail_mentor: null,
    id_mentor:null,
    token_mentor: null,
    competencesDeMentor: []
})
export const fillCompetenceMentor = (competence) => ({
    type: "FILL_M_COMPETENCES",
    payload: competence,
})
export const changeDataMentor = (data) => ({
    type: "CHANGE_DATA_MENTOR",
    payload : data
})
export const editCompetenceMentor = (data) => ({
    type: "EDIT_COMPETENCE_MENTOR",
    payload : data
})
export const deleteCompetenceMentor = (idComp) => ({
    type: "DELETE_COMPETENCE_MENTOR",
    payload : idComp
})