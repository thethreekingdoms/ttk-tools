const fs = require('fs')
const pathArr = []
function getPath(path, arr) {
    const res = fs.readdirSync(path)
    if( res.includes('index.js') ){
        arr.push(path)
    }
    res.forEach(item => {
        const currentPath = `${path}/${item}`
        if( fs.statSync(currentPath).isDirectory() ){
            getPath(currentPath, arr)
        } 
    })
}

getPath('.', pathArr)
console.log(pathArr)

const a = fs.existsSync('./aaaaaaaaa.js')
console.log(a)