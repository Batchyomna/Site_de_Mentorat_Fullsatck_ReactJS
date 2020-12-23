export const signInApprenti = (user) => ({
    type: "SIGNIN_APPRENTI",
    prenom_apprenti:user.prenom,
    photo_apprenti : user.photo,
    mail_apprenti: user.mail,
    id_apprenti:user.id,
    token_apprenti: user.token,
})
export const signOutApprenti = () => ({
    type: "SIGNOUT_APPRENTI",
    prenom_apprenti:null,
    photo_apprenti : null,
    mail_apprenti: null,
    id_apprenti:null,
    token_apprenti: null,
})

