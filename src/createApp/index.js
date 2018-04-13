import chalk from 'chalk'
import spawn from 'cross-spawn'
import vfs from 'vinyl-fs'
import path, { resolve } from 'path'

import {
    mkdir, copyFile, haveFile, prompt, getInput, 
    readDir, edit, editAppName, editmock, editstyle,
    deleteFile
} from '../utils'

const { join, basename } = path
const cloneApp = 'ttk-app-init-demo'
async function checkPath (path) {
    let result = path
    while (true) {
        const flag = await haveFile(result)
        if( flag ){
            console.log(chalk.yellowBright('该路径下已经存在app!'))
            result = await prompt('请输入新的路径：')
        }else{
            return result
        }
    }
}

async function createApp ( path) {
    if( typeof(path) != 'string' ){
        console.log(chalk.yellowBright('你没有输入创建的app名字！'))
        path = await getInput('请输入创建的app名称：')
    }
    console.log('检查该路径下是否已经存在app...')
    // 默认在apps文件夹下创建
    path = `apps/${path}`
    path = await checkPath(path)
    console.log(path)
    // console.log(haveFileResult)

    // if( haveFileResult ){
    //     console.log(chalk.yellowBright('项目中已经存在该路径！'))
    //     path = await prompt('请输入新的路径：')
    // }
    const cloneResult = await spawn.sync('npm', ['install', cloneApp], {cwd: join(process.cwd()), stdio: 'inherit' })
    if( cloneResult.error || cloneResult.status != 0 ){
        console.log(chalk.redBright(cloneResult.error))
        console.log(chalk.redBright('下载ttk-app-init-demo失败！'))
        return process.exit()
    }
    
    const res3 = await copyFile(
        `${path}`,
        [
            `./node_modules/${cloneApp}/**`,
            `!./node_modules/${cloneApp}/package.json`,
            `!./node_modules/${cloneApp}/README.md`,
            `!./node_modules/${cloneApp}/node_modules`
        ]
    )
    console.log(chalk.greenBright('复制文件成功！！！'))
    console.log('修改app/index中的name...')
    const editNameRes = await editAppName(path)
    if( editNameRes ) {
        console.log(chalk.greenBright('修改app.name成功！'))
    }
    const editmockRes = await editmock(path)
    if( editmockRes ) {
        console.log(chalk.greenBright('修改mock.js成功！'))
    }
    const editstyleres = await editstyle(path)
    if( editstyleres ) {
        console.log(chalk.greenBright('修改app.less成功！'))
    }
    console.log('修改根目录下的index.js文件。')
    const editResult = await edit(path)
    console.log(chalk.greenBright('完成'))
    process.exit()
}
export default createApp