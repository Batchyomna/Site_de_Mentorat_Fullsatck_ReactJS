function deleteEmptyValueAdmin(object){
    for (let key in object) {
        if (key === 'message' || key === 'error' || object[key] === '' || key === 'mail_new_admin' || key === 'mdp_new_admin' || key === 'mentors'){ 
            delete object[key]
        }
    }
    return object
}
module.exports = deleteEmptyValueAdmin;