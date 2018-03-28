const fs = require('fs')

function edit(name, path){
    const nameStr = name.replace(/-/g, '_')
    fs.readFile('./demo.js', (err, data) => {
        // => null, <data>
        const str = data.toString()
        const index = str.replace(/const.*app.*=.*{/g, function(a){
        const str = 
`
import ${nameStr} from '${path}' 

${a}

    [${nameStr}.name]: ${nameStr},

`
            return str
        })
        console.log(index)
        fs.createWriteStream('a.js').write(index)
        
    });

}

edit('aaaa', 'bbb')

