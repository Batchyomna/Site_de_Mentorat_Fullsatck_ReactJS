import axios from 'axios'

async function signUpUser(object) {
    try {
        console.log('object in fonction', object);
        if (object.nom && object.prenom && object.mdp && object.mail) {
            if (object.statut === 'mentor' && (object.nom_SIREN === null || object.nom_SIREN === undefined)) {
                let result = 'SIREN-missed';
                return result
            } else {
                let response = await axios.post(`http://localhost:8000/sign-up`, object)
                console.log('in then', response.status);
                if (response.status === 201) {
                    let result = 'ok';
                    return result
                } else if (response.status === 202) {
                    let result = 'mail-existe';
                    return result
                }
            }
        } else {
            let result = 'champ-vide';
            return result
        }
    } catch (err) {
        console.log(err);
        let result = 'erreur';
        return result
    }
}
export { signUpUser as default };
