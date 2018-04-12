import clone from '../clone'
import chalk from 'chalk'
import request from 'request'
const path = 'apps/edf'
function getApps () {
    return new Promise(function(resolve, reject) {
        request('https://thethreekingdoms.github.io/demo.json', (error, response, body)=>{
            resolve(JSON.parse(body))
        })
    })
}

async function  init() {
    const { data } = await getApps()
    for( const i of data ){
        if( typeof(i) == 'string' ){
            console.log(chalk.greenBright(`正在克隆${i}`))
            await clone(i, `${path}/${i}`, true)
        }
    }
    process.exit()
}

export default init