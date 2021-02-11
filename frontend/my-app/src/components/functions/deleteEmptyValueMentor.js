function deleteEmptyValueMentor(object){
    for (let key in object) {
        if (key === 'message' || key === 'error' || object[key] === '' || key === 'signupFlag' || key === 'errorMail' || key ==='mailExsite' || key ==='signinFlag' || key ==='errorPSW' || key === 'nom_SIREN'){ 
            delete object[key]
        }
    }
    return object
}
module.exports = deleteEmptyValueMentor;