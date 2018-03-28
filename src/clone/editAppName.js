import fs from 'fs'

export default function (path) {
    return new Promise(function(resolve, reject){
        const namearr = path.split('/')
        const name = namearr[namearr.length - 1]
        const nameStr = name
        fs.readFile(`./${path}/index.js`, (err, data) => {
            const str = data.toString()
            const editStr= str.replace(/name:.*,/, function(a) {
                console.log(a)
               return `name: '${nameStr}',` 
            })
            fs.createWriteStream(`./${path}/index.js`).write(editStr, 'utf8', (err)=>{
                resolve(true)
            })
        });
    })
}