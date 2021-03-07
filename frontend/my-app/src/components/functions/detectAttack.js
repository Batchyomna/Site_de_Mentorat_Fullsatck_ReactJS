function detectAttack(object){
    const regexSQL  = /('(''|[^'])*')|("(""|[^"])*")|(;)|(--)|(\b(ALTER|CREATE|DELETE|DROP|OR|AND|WHERE|EXEC(UTE){0,1}|INSERT( +INTO){0,1}|MERGE|SELECT|UPDATE|UNION( +ALL){0,1})\b)/gi;
    // eslint-disable-next-line
    const regexXSS = /((\%3C)|<)((\%2F)|\/)*[a-z0-9\%]+((\%3E)|>)|((\%3C)|<)((\%69)|i|(\%49))((\%6D)|m|(\%4D))((\%67)|g|(\%47))[^\n]+((\%3E)|>)|((\%3C)|<)[^\n]+((\%3E)|>)/i
    let counter = 0;
    for (let key in object) {
        if (!!object[key].match(regexSQL) || !!object[key].match(regexXSS) ){  // !! To cast JavaScript variables to boolean && str.match(regexp)
         counter += 1;
         console.log('detect attack', object[key]);
        }
    }
    
    if(counter === 0){
        return false // il n'y a pas d'attack
    }else{
        return true // match = true , il y a un attack
    }
}
module.exports = detectAttack;

//  const regexSQL  = /('(''|[^'])*')|("(""|[^"])*")|(;)|(-)|(--)|(=)|(\?)|(\b(ALTER|CREATE|DELETE|DROP|OR|AND|WHERE|EXEC(UTE){0,1}|INSERT( +INTO){0,1}|MERGE|SELECT|UPDATE|UNION( +ALL){0,1})\b)/gi;
