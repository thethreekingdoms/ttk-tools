import fs from 'fs'
import chalk from 'chalk'

export default function (path) {
    return new Promise(function(resolve, reject){
        fs.readFile('./assets/styles/apps.less', (err, data) => {
            if( err ){
                console.log(chalk.redBright('没有发现./assets/styles/apps.less'))
            }
            const str = data.toString()
            let resultStr 
            if( str.includes('//note-end') ){
                resultStr = str.replace(/\/\/note-end/, 
`
@import '../../${path}/style.less';
//note-end`                

                )
            }else{
                resultStr = str+`
@import '../../${path}/style.less';`
            }
            fs.createWriteStream('./assets/styles/apps.less').write(resultStr, 'utf8', (err)=>{
              if( err ){
                  resolve(false)
                  console.log(chalk.redBright('修改./assets/styles/apps.less失败'))
              }
              resolve(true)
            })
        });
    })
}