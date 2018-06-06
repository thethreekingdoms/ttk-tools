'use strict'

import chalk from 'chalk'
import { addServiceFromTemplate } from '../serverUtils'
import {
    mkdir, copyFile, haveFile, prompt,
    getInput, readDir, deleteFile, editAppName,
    editmock, editstyle, checkYarn
} from '../utils'
var fs = require('fs');

async function serverAddMicroservice (businessName,moduleName) {
     await checkYarn();
     if( typeof(businessName) != 'string' ){
         //console.log(chalk.redBright('你没有输入业务线名称！'))
         businessName = await getInput('请输入业务线的名称(英文，首字母小写)：')
     }
     if( typeof(moduleName) != 'string' ){
         //console.log(chalk.redBright('你没有输入模块名称！'))
         moduleName = await getInput('请输入模块名称(英文，首字母小写)：')
     }
     console.log('检查该微服务是否已经存在...')
     var temppath = process.cwd();
     var path = temppath + '/src/'+businessName+'/service/'+businessName+'-'+moduleName;

     if( fs.existsSync(path) === true ){
         console.log(chalk.redBright('由于目录'+path+'已经存在，请删除后或者修改微服务名称后重新运行。'));
         return true
     }
     console.log('开始创建微服务');
     addServiceFromTemplate(businessName,moduleName)
}
export default serverAddMicroservice