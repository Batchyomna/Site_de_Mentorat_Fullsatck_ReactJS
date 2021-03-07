function deleteEmptyValueMentor(object){
    for (let key in object) {
        if (key === 'message' || key === 'error' || object[key] === '' || key === 'signupFlag' || key === 'errorMail' || key ==='mailExsite' || key ==='signinFlag' || key ==='errorPSW' || key === 'statut_mentor' || object[key] === null){ 
            delete object[key]
        }
    }
    console.log('after delete empty mentor',object);

    return object
}
module.exports = deleteEmptyValueMentor;