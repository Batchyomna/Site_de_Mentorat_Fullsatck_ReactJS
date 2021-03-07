function deleteEmptyValueApprenti(object){
    for (let key in object) {
        if (key === 'message' || key === 'error' || object[key] === '' || key === 'signupFlag' || key === 'errorMail' || key ==='mailExsite' || key ==='signinFlag' || key ==='errorPSW' || key === 'nom_SIREN' || object[key] === null){ 
            delete object[key]
        }
    }
    console.log('after delete empty',object);
    return object
}
module.exports = deleteEmptyValueApprenti;
