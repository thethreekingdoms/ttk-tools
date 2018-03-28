import fs from 'fs'

export default function (path) {
    return new Promise(function(resolve, reject){
        const namearr = path.split('/')
        const name = namearr[namearr.length - 1]
        const nameStr = name.replace(/-/g, '_')
        fs.readFile('./index.js', (err, data) => {
            const str = data.toString()
            const index = str.replace(/const.*app.*=.*{/g, function(a){
            const str = 
`import ${nameStr} from './${path}' 
${a}
    [${nameStr}.name]: ${nameStr},`
                return str
            })
            fs.createWriteStream('./index.js').write(index, 'utf8', (err)=>{
                resolve()
            })
        });
    })
}