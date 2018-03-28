import chalk from 'chalk'
import spawn from 'cross-spawn'
import vfs from 'vinyl-fs'
import path, { resolve } from 'path'
import through from 'through2'

import { mkdir, copyFile, haveFile, prompt } from '../utils'
import edit from './edit'
import isExistApp from './isExistApp'
import editAppName from './editAppName'
import editmock from './editmock'
import editStyle from './editstyle'
import editstyle from './editstyle';

const { join, basename } = path


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


async function clone (cloneApp, path, name) {
    console.log('检查该路径下是否已经存在app...')
    path = await checkPath(path)
    console.log(path)
    // console.log(haveFileResult)

    // if( haveFileResult ){
    //     console.log(chalk.yellowBright('项目中已经存在该路径！'))
    //     path = await prompt('请输入新的路径：')
    // }
    const cloneResult = await spawn.sync('npm', ['install', cloneApp], {cwd: join(process.cwd()), stdio: 'inherit' })
    if( cloneResult.error ){
        console.log(chalk.redBright(cloneResult.error))
    }
    
    const res3 = await copyFile(
        `${path}`,
        [
            `./node_modules/${cloneApp}/**`,
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
    process.exit()
}
export default clone