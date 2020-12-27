export const signInMentor = (user) => ({
    type: "SIGNIN_MENTOR",
    prenom_mentor: user.name,
    photo_mentor: user.photo,
    mail_mentor: user.mail,
    id_mentor: user.id,
    token_mentor: user.token,
   
})
export const signOutMentor = () => ({
    type: "SIGNOUT_MENTOR",
    prenom_mentor:null,
    photo_mentor : null,
    mail_mentor: null,
    id_mentor:null,
    token_mentor: null,
})
export const mentorCompetences = (competences) => ({
    type: "FILL_M_COMPETENCES",
    payload: competences,
})
export const changeUserData = (data) => ({
    type: "CHANGEDATA_mENTOR",
    payload : data
   
})
