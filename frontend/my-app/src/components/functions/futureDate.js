function futureDate(inputDate) {
    var startDate = new Date(inputDate);
    var today = new Date();
    if (startDate.getTime() > today.getTime()) {
        return true
    }  else{
        return false
    }
}



module.exports = futureDate;
