function deleteEmptyValueApprenti(object){
    for (let key in object) {
        if (key === 'message' || key === 'error' || object[key] === '' || object[key] === null || object[key] === undefined || key === 'signupFlag' || key === 'errorMail' || key ==='mailExsite' || key ==='signinFlag' || key ==='errorPSW' || key === 'nom_SIREN'){ 
            delete object[key]
        }
    }
    console.log('in function delete',object);
    return object
}
module.exports = deleteEmptyValueApprenti;
