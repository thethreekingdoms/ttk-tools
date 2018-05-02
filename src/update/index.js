import chalk from 'chalk'
import spawn from 'cross-spawn'
import path, { resolve } from 'path'

import { copyFile, haveFile, deleteFile, editAppName } from '../utils'
import updateBase from './updateBase'
// import editAppName from '../clone/editAppName'

const { join, basename } = path

async function update(updateApp, path) {
    //判断需要更新的文件夹是否存在
    if( updateApp == 'ttk-app-core' ){
        return updateBase()
    }
    const haveFileRes = await haveFile(path)
    if( !haveFileRes ){
        console.log(chalk.redBright('该路径下不存在文件，无法更新！'))
        return process.exit()
    }
    console.log(chalk.greenBright('下载更新包！'))
    const cloneResult = await spawn.sync('npm', ['update', updateApp], {cwd: join(process.cwd()), stdio: 'inherit' })
    const deleteFileRes = await deleteFile(`./${path}`)
    if( cloneResult.error || cloneResult.status != 0 ){
        console.log(chalk.redBright(cloneResult.error))
        console.log(chalk.redBright('安装失败，请检查改app是否已经发布在npm上！'))
        return process.exit()
    }
    
    const res3 = await copyFile(
        `${path}`,
        [
            `./node_modules/${updateApp}/**`,
            `!./node_modules/${updateApp}/package.json`,
            `!./node_modules/${updateApp}/README.md`,
            `!./node_modules/${updateApp}/node_modules`
        ]
    )
    console.log(chalk.greenBright('复制文件成功！！！'))
    console.log('修改app/index中的name...')
    const editNameRes = await editAppName(path, updateApp)
    if( editNameRes ) {
        console.log(chalk.greenBright('修改app.name成功！'))
    }
}


export default update