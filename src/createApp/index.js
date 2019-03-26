import chalk from 'chalk'
import spawn from 'cross-spawn'
import vfs from 'vinyl-fs'
import path, { resolve } from 'path'
import fs from 'fs'
import { getAllAppPath } from '../utils'

import {
    mkdir, copyFile, haveFile, prompt, getInput,
    readDir, edit, editAppName, editmock, editstyle,
    deleteFile, replacePreName, checkYarn
} from '../utils'

const { join, basename } = path
const cloneApp = 'ttk-app-init-demo'
const newCloneApp = 'ttk-app-init-new-demo'
async function checkPath(path) {
    let result = path
    while (true) {
        const flag = await haveFile(result)
        if (flag) {
            console.log(chalk.yellowBright('该路径下已经存在app!'))
            result = await prompt('请输入新的路径：')
        } else {
            return result
        }
    }
}



function checkVersion() {
    const result = fs.existsSync('./version.txt')
    if (result) {
        const str = fs.readFileSync('./version.txt')
        if (str && str.indexOf('2.0.0') > -1) {
            return true
        }
    }
    return false
}

async function createApp(path) {
    await checkYarn()
    if (typeof (path) != 'string') {
        console.log(chalk.yellowBright('你没有输入创建的app名字！'))
        path = await getInput('请输入创建的app名称：')
    }
    console.log('检查该路径下是否已经存在app...')
    // 默认在apps文件夹下创建
    path = `apps/${path}`
    // path = await checkPath(path)
    console.log(path)
    // console.log(haveFileResult)

    // if( haveFileResult ){
    //     console.log(chalk.yellowBright('项目中已经存在该路径！'))
    //     path = await prompt('请输入新的路径：')
    // }
    let appPath
    if (checkVersion()) {
        appPath = newCloneApp
        const cloneResult = await spawn.sync('yarn', ['add', newCloneApp], { cwd: join(process.cwd()), stdio: 'inherit' })
        if (cloneResult.error || cloneResult.status != 0) {
            console.log(chalk.redBright(cloneResult.error))
            console.log(chalk.redBright('下载ttk-app-init-demo失败！'))
            return process.exit()
        }
    } else {
        appPath = cloneApp
        const cloneResult = await spawn.sync('yarn', ['add', cloneApp], { cwd: join(process.cwd()), stdio: 'inherit' })
        if (cloneResult.error || cloneResult.status != 0) {
            console.log(chalk.redBright(cloneResult.error))
            console.log(chalk.redBright('下载ttk-app-init-demo失败！'))
            return process.exit()
        }
    }


    const res3 = await copyFile(
        `${path}`,
        [
            `./node_modules/${appPath}/**`,
            `!./node_modules/${appPath}/package.json`,
            `!./node_modules/${appPath}/README.md`,
            `!./node_modules/${appPath}/node_modules`
        ]
    )
    console.log(chalk.greenBright('复制文件成功！！！'))
    console.log('修改app/index中的name...')
    const editNameRes = await editAppName(path, 'app-test')
    if (editNameRes) {
        console.log(chalk.greenBright('修改app.name成功！'))
    }
    const editmockRes = await editmock(path)
    if (editmockRes) {
        console.log(chalk.greenBright('修改mock.js成功！'))
    }
    // const editstyleres = await editstyle(path)
    // if( editstyleres ) {
    //     console.log(chalk.greenBright('修改app.less成功！'))
    // }
    console.log('修改根目录下的index.js文件。')
    const editResult = await edit(path)
    await replacePreName(path, 'app-test')
    await rewrite(path)
    console.log(chalk.greenBright('完成'))
    process.exit()
}

async function rewrite(path) {
    let pathNor = path.indexOf('/') != -1 ? path.split('/') : path.split('\\'),
        res = getAllAppPath('./apps/' + pathNor[pathNor.length - 2])

    const writeIndexRes = await writeIndex(res, pathNor)
    const writeStyleRes = await writeStyle(res, pathNor)
}

function writeIndex(pathArr, pathNor) {
    return new Promise(function (resolve, reject) {
        const arrForm = []
        const arrInsert = []
        pathArr.forEach(path => {
            const namearr = path.split('/')
            const name = namearr[namearr.length - 1]
            const nameStr = name.replace(/-/g, '_')
            arrForm.push(`import ${nameStr} from  './${namearr[namearr.length - 1]}'`)
            arrInsert.push(`[${nameStr}.name]: ${nameStr},`)
        })
        let strForm = transArrToStr(arrForm),
            strInsert = transArrToStr1(arrInsert),
            strExport = `window.publicModule && window.publicModule.callback(obj,` + ' ' + '"' + pathNor[pathNor.length - 2] + '"' + `);` + '\n',
            strFun = `export default obj;`,
            writePath = './apps/' + pathNor[pathNor.length - 2] + '/index.js',
            strs

        strs = strForm + '\n' + `const obj={` + strInsert + `}` + '\n\n' + strExport + '\n' + strFun

        fs.writeFile(writePath, strs, (err) => {
            resolve()
        })
    })
}

function writeStyle(pathArr, pathNor) {
    return new Promise(function (resolve, reject) {
        const arrForm = []
        pathArr.forEach(path => {
            const namearr = path.split('/')
            const name = namearr[namearr.length - 1]
            const nameStr = name.replace(/-/g, '_')
            if (fs.existsSync(`${path}/style.less`)) {
<<<<<<< HEAD
                arrForm.push(`@import './${namearr[namearr.length - 1]}/style.less';`)
=======
                arrForm.push(`@import '${path}/style.less';`)
>>>>>>> b3ad85710d76b308c0750d6e2a210e195f0e16dc
            }

        })
        let arrForm1 = transArrToStr(arrForm),
            writePath = './apps/' + pathNor[pathNor.length - 2] + '/index.less'
        fs.writeFile(writePath, arrForm1, (err) => {
            resolve()
        })
    })
}

function transArrToStr(arr) {
    let str
    arr.map(o => {
        if (!str) {
            str = o + '\n'
        } else {
            str += o + '\n'
        }
    })
    return str
}
function transArrToStr1(arr) {
    let str
    arr.map(o => {
        if (!str) {
            str = '\n' + '    ' + o + '\n'
        } else {
            str += '    ' + o + '\n'
        }
    })
    return str
}


export default createApp