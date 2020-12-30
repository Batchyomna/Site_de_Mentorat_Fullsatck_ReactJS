export const signInApprenti = (user) => ({
    type: "SIGNIN_APPRENTI",
    prenom_apprenti:user.prenom_apprenti,
    photo_apprenti : user.photo_apprenti,
    mail_apprenti: user.mail_apprenti,
    id_apprenti:user.id_apprenti,
    token_apprenti: user.token_apprenti,
})
export const signOutApprenti = () => ({
    type: "SIGNOUT_APPRENTI",
    prenom_apprenti:null,
    photo_apprenti : null,
    mail_apprenti: null,
    id_apprenti:null,
    token_apprenti: null,
})
export const apprentiCompetences = (competences) => ({
    type: "FILL_A_COMPETENCES",
    payload: competences,
})

