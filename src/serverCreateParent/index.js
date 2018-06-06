import chalk from 'chalk'
import spawn from 'cross-spawn'
import vfs from 'vinyl-fs'
import path, { resolve } from 'path'
import through from 'through2'

import { mkdir, copyFile, getInput, inputYN, createPackageFile, checkYarn } from '../utils'

const { join, basename } = path
const installPackge = 'ttk-server-parent'


async function serverCreateParent (projectName) {
    console.log('开始创建')
    if( typeof(projectName) != 'string' ){
        projectName = await getInput('请输入项目存放目录名称：')
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

}
export default serverCreateParent