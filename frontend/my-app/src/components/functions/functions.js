
function futureDate(inputDate) {
        var startDate = new Date(inputDate);
        var today = new Date();
        if (startDate.getTime() > today.getTime()) {
         return true
        }  else{
            return false
        }
    }
function deleteEmptyValue(object)   {
    for (let key in object) {
        if (key === 'message' || key === 'messageError' || object[key] === '') {
         delete object[key]
        }
      }
      return object
}

module.exports = futureDate
module.exports = deleteEmptyValue

