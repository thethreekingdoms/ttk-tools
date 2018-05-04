import chalk from 'chalk'
import spawn from 'cross-spawn'
import path, { resolve } from 'path'

import { copyFile, haveFile, deleteSingleFile, editAppName } from '../utils'
// import editAppName from '../clone/editAppName'

const { join, basename } = path

async function  updateBase() {
    const updateApp = 'ttk-app-core'
    const delPackage = await deleteSingleFile(`./package.json`)
    const cloneResult = await spawn.sync('yarn', ['add', `${updateApp}@latest`], {cwd: join(process.cwd()), stdio: 'inherit' })
    console.log(cloneResult)
    if( cloneResult.error || cloneResult.status != 0 ){
        console.log(chalk.redBright(cloneResult.error))
        console.log(chalk.redBright('安装失败，请检查改app是否已经发布在npm上！'))
        return process.exit()
    }
    
    const res3 = await copyFile(
        ``,
        [
            `./node_modules/${updateApp}/**`,
            `!./node_modules/${updateApp}/node_modules`,
            `!./node_modules/${updateApp}/index.js`,
            `!./node_modules/${updateApp}/mock.js`,
            `!./node_modules/${updateApp}/assets/styles/apps.less`,
        ]
    )
    console.log(chalk.greenBright('核心模块升级成功！！！'))
    return process.exit()
}

export default updateBase