export const signInMentor = (user) => ({
    type: "SIGNIN_MENTOR",
    name: user.name,
    photo: user.picture_profil,
    mail: user.email,
    id: user.id,
    token: user.token,
   
})
export const signOutMentor = () => ({
    type: "SIGNOUT_MENTOR",
    name : null,
    photo: null,
    mail: null,
    id:null,
    token:null
})
export const changeUserData = (data) => ({
    type: "CHANGEDATA_USER",
    payload : data
   
})
