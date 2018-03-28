const readline = require('readline')

var count = 0


function getPromise () {
    return new Promise(function(resolve, reject) {
        const res = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        
        res.question('heeeeee', (ans) => {
            console.log(ans)
            count++
            res.close()
            resolve(count)
        })
    })
}



const childPro = async() => {
    while (true){
        const a = await getPromise()
        console.log(a)
        if( count > 10 ){
            return a
        }
    }

}

const get = async() => {
    const res = await childPro()
    console.log('res')
}

get()