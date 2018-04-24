import chalk from 'chalk'
import spawn from 'cross-spawn'
import vfs from 'vinyl-fs'
import path, { resolve } from 'path'
import through from 'through2'

import { mkdir, copyFile, haveFile, prompt, getInput, readDir, deleteFile, editAppName } from '../utils'
import edit from './edit'
import isExistApp from './isExistApp'
import editmock from './editmock'
import editstyle from './editstyle'

const { join, basename } = path

async function checkPath (path, noExit) {
    let result = path
    while (true) {
        const flag = await haveFile(result)
        if( flag && noExit ){
            return true
        }
        if( flag ){
            console.log(chalk.yellowBright('该路径下已经存在app!'))
            result = await prompt('请输入新的路径：')
        }else{
            return result
        }
    }
}

async function JoinApp (path) {
    const res = await haveFile(`${path}/index.js`)
    if( !res ){
        return
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
    return true
}

async function clone (cloneApp, path, noExit) {
    if( typeof(cloneApp) != 'string' ){
        console.log(chalk.yellowBright('你没有输入clone的app！'))
        cloneApp = await getInput('请输入clone的app：')
    }
    if( typeof(path) != 'string' ){
        console.log(chalk.yellowBright('你没有输入clone到指定的路径！'))
        path = await getInput('请输入路径：')
    }
    console.log('检查该路径下是否已经存在app...')
    path = await checkPath(path, noExit)
    if( path === true ){
        console.log(chalk.yellowBright(`${path}路径已经存在执行跳过`))
        return true
    }
    console.log(path)
    // console.log(haveFileResult)

    // if( haveFileResult ){
    //     console.log(chalk.yellowBright('项目中已经存在该路径！'))
    //     path = await prompt('请输入新的路径：')
    // }
    const cloneResult = await spawn.sync('npm', ['install', cloneApp], {cwd: join(process.cwd()), stdio: 'inherit' })
    if( cloneResult.status !=0 ||  cloneResult.error ){
        console.log(chalk.redBright(cloneResult.error))
        console.log(chalk.redBright('安装失败，请检查改app是否已经发布在npm上！'))
        if( noExit ){
            return
        }else{
            return process.exit()
        }
        
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
    const editNameRes = await editAppName(path, cloneApp)
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

    const apps = await readDir(`./${path}/apps`)
    for( let i = 0; i < apps.length ; i++ ){
        const appItemPath = apps[i]
        console.log(`${path}/apps/${appItemPath}`)
        const res = await JoinApp(`${path}/apps/${appItemPath}`)
    }
    console.log(chalk.greenBright('完成'))
    if( noExit === true ){
        return true
    }
    return process.exit()
}
export default clone