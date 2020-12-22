export const signInApprenti = (user) => ({
    type: "SIGNIN_APPRENTI",
    name: user.name,
    photo: user.picture_profil,
    mail: user.email,
    id: user.id,
    token: user.token,
   
})
export const signOutApprenti = () => ({
    type: "SIGNOUT_APPRENTI",
    name : null,
    photo: null,
    mail: null,
    id:null,
    token:null
})

