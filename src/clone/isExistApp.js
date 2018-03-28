import fs from 'fs'
import chalk from 'chalk'

export default function (app) {
    return new Promise(function(resolve, reject) {
        fs.readFile('./index.js', (err, data) => {
            if(err){
                console.log(chalk.redBright(err))
                reject()
            }
            const str = data.toString()
            if( str.includes(app) ){
                resolve(true)
            }else{
                resolve(false)
            }
        })
    })
}