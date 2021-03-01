function emptyValue(object){
    let counter = 0;
    for (let key in object) {
        if (object[key] === ''){ 
          counter += 1
        }
    }
    if(counter > 0){
        return true // il y a des valeurs vides
    }else{
        return false
    }
}
module.exports = emptyValue;