const which = require('which')

try{
    
    const resolved = which.sync('ttsk')
    console.log(resolved)
}catch(err){
    // console.log(err, 'err')
}