import chalk from 'chalk'
import spawn from 'cross-spawn'
import vfs from 'vinyl-fs'
import path, { resolve } from 'path'
import through from 'through2'

import { mkdir, copyFile, getInput, inputYN, createPackageFile, checkYarn } from '../utils'

const { join, basename } = path
const installPackge = 'ttk-app-core'

const basics = [
    'ttk-edf-app-portal',
    'ttk-edf-app-login',
    'ttk-edf-app-root',
    'ttk-edf-app-home',
    'ttk-edf-app-portal-menu'
]

async function website (projectName) {
    console.log('开始创建')
    if( typeof(projectName) != 'string' ){
        projectName = await getInput('请输入项目名称：')
        console.log(projectName)
    }
    const res = await mkdir(projectName)
    console.log(chalk.greenBright('创建项目文件夹'))
    if( res ){
        chalk.redBright('创建文件夹失败')
        process.exit()
    }
    await checkYarn()
    console.log(chalk.gray('下载中..........'))
    const createPackageJson = await createPackageFile(projectName)
    // const res2 =await CMD(`npm i ${installPackge}`, {cwd: join(process.cwd(), projectName)})
    const res2 = await spawn.sync('yarn', ['add', installPackge], {cwd: join(process.cwd(), projectName), stdio: 'inherit' })
    console.log('res2', res2.error)
    if( res2.error || res2.status != 0 ){
        console.log(chalk.redBright(res2.error))
        console.log(chalk.redBright('下载失败！'))
        process.exit()
    }
    const res3 = await copyFile(
        projectName,
        [
            `./${projectName}/node_modules/${installPackge}/**`,
            `./${projectName}/node_modules/${installPackge}/.*`,
            `./${projectName}/node_modules/${installPackge}/.*/**`,
            `!./${projectName}/node_modules/${installPackge}/node_modules`
        ]
    )
    console.log(chalk.greenBright('成功创建项目'))
    const YNres = await inputYN()
    if( !YNres ) {
        return process.exit()
    }
    console.log(chalk.gray('安装依赖 yarn install....'))
    // const res4 = await CMD('npm install', {cwd: join(process.cwd(), projectName)})
    const res4 = await spawn.sync('yarn', ['install'], {cwd: join(process.cwd(), projectName), stdio: 'inherit' })
    if( res4.error ) {
        console.log(chalk.redBright(res4.error))
        console.log(chalk.redBright('安装依赖失败， 请在项目根目录下以管理员身份运行：yarn install'))
        process.exit()
        return
    }
    console.log(chalk.yellowBright(`安装依赖完成！ \n\n请执行以下命令\n\ncd ${projectName} \n\nnpm start`))
    process.exit()
}
export default website