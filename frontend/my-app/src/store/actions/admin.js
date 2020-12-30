export const signInAdmin = (user) => ({
    type: "SIGNIN_ADMIN",
    mail_admin: user.mail_admin,
    id_admin: user.id_admin,
    token_admin: user.token_admin,
   
})
export const signOutAdmin = () => ({
    type: "SIGNOUT_ADMIN",
    mail_admin: null,
    id_admin:null,
    token_admin: null,
})

