import fs from 'fs'
import chalk from 'chalk'

export default function (path) {
    return new Promise(function(resolve, reject){
        fs.readFile('./mock.js', (err, data) => {
            if( err ){
                console.log(chalk.redBright('没有发现./mock.js'))
            }
            const str = data.toString()
            const resultStr = str+`
import './${path}/mock.js';
`
            fs.createWriteStream('./mock.js').write(resultStr, 'utf8', (err)=>{
              if( err ){
                  resolve(false)
                  console.log(chalk.redBright('修改./mock.js失败'))
                  return
              }
              resolve(true)
            })
        });
    })
}