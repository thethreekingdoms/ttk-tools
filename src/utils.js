'use strict'

import vfs from 'vinyl-fs'
import { exec } from 'child_process'
import spawn from 'cross-spawn'
import chalk from 'chalk'
import fs from 'fs'
import through from 'through2'
import readline from 'readline'
import { EFAULT } from 'constants';
import which from 'which'
import path, { resolve } from 'path'

const { join, basename } = path
export async function checkYarn () {
    let flag = false
    try{
        const resolved = which.sync('yarn')
        console.log(resolved)
        if( resolved ){
            flag = true
        }
    }catch(err){
        console.log(err)
    }
    if( !flag ){
        console.log(chalk.yellowBright('检测到你没有安装yarn!'))
        console.log(chalk.greenBright('安装yarn!'))
        const cloneResult = await spawn.sync('npm', ['install', 'yarn', '-g'], {cwd: join(process.cwd()), stdio: 'inherit' })
        if( cloneResult.status !=0 ||  cloneResult.error ){
            console.log(chalk.redBright(cloneResult.error))
        }
        console.log(chalk.greenBright('安装yarn成功'))
        return true
    }
    return true
}

export function CMD(cmdStr, option) {
    return new Promise(function (resolve, reject) {
        console.log('ttk: 操作路径=====>' + option.cwd)
        let build
        build = exec(cmdStr, option, (err, stdout, stderr) => {
            if (err) {
                console.log(chalk.redBright(err))
                reject(err)
            }
            console.log('ttk: ' + stdout)
            console.log('ttk: ' + stderr)
            resolve()
        })
        build.stdout.on('data', (data) => {
            console.log(`ttk: ${data}`)
        })
    })
}

export function copyFile(projectName, path) {
    return new Promise(function (resolve, reject) {
        vfs.src(path)
            .pipe(through.obj(function (file, enc, cb) {
                this.push(file)
                cb()
            }))
            .pipe(vfs.dest(`./${projectName}`))
            .on('end', function (err) {
                resolve()
            })
            .resume()
    })
}


export function mkdir(name) {
    return new Promise(function (resolve, reject) {
        fs.mkdir(name, (err) => {
            if (err) {
                console.log(chalk.redBright(err))
                resolve(err)
            } else {
                resolve()
            }
        })
    })
}

export function rename(oldName, newName) {
    return new Promise(function (resolve, reject) {
        console.log('重命名')
        fs.rename(oldName, newName, (err) => {
            console.log(err, '>>>>>>>>>>')
            if (err) {
                console.log(chalk.redBright(err))
                resolve(err)
            } else {
                resolve()
            }
        })
    })
}


export function deleteFile(path) {
    var files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function (file, index) {
            var curPath = path + "/" + file
            console.log(chalk.yellowBright(`正在删除${curPath}`))
            if (fs.statSync(curPath).isDirectory()) { // recurse
                deleteFile(curPath)
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

export function deleteSingleFile(path) {
    fs.unlinkSync(path)
}

export function haveFile(path) {
    return new Promise(function (resolve, reject) {
        fs.stat(`./${path}`, (err, stats) => {
            if (stats) {
                resolve(true)
            } else {
                resolve(false)
            }
        })
    })
}

export function prompt(question) {
    return new Promise(function (resolve, reject) {
        const res = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        res.question(question, (ans) => {
            resolve(ans)
            res.close()
        })
    })
}

export async function getInput(warn) {
    while (true) {
        const res = await prompt(warn)
        if( !res ){
            console.log(chalk.yellowBright('你的输入为空!'))
        }
        if (res) {
            return res
        }
    }
}

export function readDir(path) {
    return new Promise(function (resolve, reject) {
        fs.readdir(path, (err, data) => {
            if (err) {
                console.log(err)
                resolve([])
            } else {
                console.log(data)
                resolve(data)
            }
        })
    })
}

export function edit(path) {
    return new Promise(function (resolve, reject) {
        const namearr = path.split('/')
        const name = namearr[namearr.length - 1]
        const nameStr = name.replace(/-/g, '_')
        fs.readFile('./index.js', (err, data) => {
            const str = data.toString()
            const index = str.replace(/const.*app.*=.*{/g, function (a) {
                const str =
                    `import ${nameStr} from './${path}' 
${a}
    [${nameStr}.name]: ${nameStr},`
                return str
            })
            fs.createWriteStream('./index.js').write(index, 'utf8', (err) => {
                resolve()
            })
        });
    })
}

export function createPackageFile(app){
    return new Promise(function(resolve, reject) {
        fs.createWriteStream(`./${app}/package.json`).write(`{
    "name": "${app}",
    "version": "1.0.0",
    "main": "index.js",
    "license": "MIT"
}
`, 'utf-8', (err) => {
    resolve(true)
})
    })
}

export function editAppName(path, preName) {
    return new Promise(function (resolve, reject) {
        const namearr = path.split('/')
        const name = namearr[namearr.length - 1]
        const nameStr = name
        if( !fs.existsSync(`./${path}/index.js`) ){
            console.log(chalk.yellowBright(`./${path}/index.js 文件不存在！`))
            return resolve(true)
        }
        fs.readFile(`./${path}/index.js`, (err, data) => {
            if( !data ){
                return resolve(true)
            }
            const str = data.toString()
            let editStr = str.replace(/name:.*,/, function (a) {
                console.log(a)
                return `name: '${nameStr}',`
            })
            if( preName ){
                const rex = new RegExp(preName, 'g')
                editStr = editStr.replace(rex, nameStr)
            }
            fs.createWriteStream(`./${path}/index.js`).write(editStr, 'utf8', (err) => {
                resolve(true)
            })
        });
    })
}

export function editmock(path) {
    return new Promise(function(resolve, reject){
        if( !fs.existsSync(`./${path}/mock.js`) ){
            console.log(chalk.yellowBright(`./${path}/mock.js 文件不存在！`))
            return resolve(true)
        }
        fs.readFile('./mock.js', (err, data) => {
            if( err ){
                console.log(chalk.redBright('没有发现./mock.js'))
                resolve(true)
                return 
            }
            const str = data.toString()
            let  resultStr 
            if( str.includes('//note-end') ){
                resultStr = str.replace(/\/\/note-end/,
`import './${path}/mock.js';
//note-end
` )
            }else{
                resultStr = str+`
import './${path}/mock.js';`
            }
            
            fs.createWriteStream('./mock.js').write(resultStr, 'utf8', (err)=>{
              if( err ){
                  resolve(false)
                  console.log(chalk.redBright('修改./mock.js失败'))
                  return
              }
              resolve(true)
            })
        });
    })
}

export function editstyle(path) {
    return new Promise(function(resolve, reject){
        if( !fs.existsSync(`./${path}/style.less`) ){
            console.log(chalk.yellowBright(`./${path}/style.less 文件不存在！`))
            return resolve(true)
        }
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

function getAppPath(path, arr) {
    const res = fs.readdirSync(path)
    if( res.includes('index.js') && res.includes('data.js') ){
        arr.push(path)
    }
    res.forEach(item => {
        const currentPath = `${path}/${item}`
        if( fs.statSync(currentPath).isDirectory() ){
            getAppPath(currentPath, arr)
        } 
    })
}

export function getAllAppPath(path) {
    const arr = []
    getAppPath(path, arr)
    return arr
}

export async function inputYN() {
    while (true) {
        const res = await getInput('是否需要安装依赖(Y/N)?')
        if(res && res.toUpperCase()== 'YES' ||  res && res.toUpperCase()== 'Y'){
            return true
        }else if( res && res.toUpperCase()== 'NO' ||  res && res.toUpperCase()== 'N' ){
            return false
        }
    }
}

function editAppStyle(path, name, preName) {
    return new Promise(function(resolve, reject) {
        fs.readFile(`./${path}/style.less`, (err, data) => {
            if( err ){
                console.log(chalk.redBright('没有发现./assets/styles/apps.less'))
            }
            const rex = new RegExp(preName, 'g')
            const str = data.toString()
            const resultStr = str.replace(rex, name)
            fs.createWriteStream(`./${path}/style.less`).write(resultStr, 'utf8', (err)=>{
              if( err ){
                  resolve(false)
                  console.log(chalk.redBright(`修改./${path}/style.less失败`))
              }
              resolve(true)
            })
        });
    })
}

function editAppData(path, name, preName) {
    return new Promise(function(resolve, reject) {
        fs.readFile(`./${path}/data.js`, (err, data) => {
            if( err ){
                console.log(chalk.redBright(`没有发现./${path}/data.js`))
            }
            const rex = new RegExp(preName, 'g')
            const str = data.toString()
            const resultStr = str.replace(rex, name)
            fs.createWriteStream(`./${path}/data.js`).write(resultStr, 'utf8', (err)=>{
              if( err ){
                  resolve(false)
                  console.log(chalk.redBright(`修改./${path}/data.js失败`))
              }
              resolve(true)
            })
        });
    })
}

export async function replacePreName(path, preName){
    const arr = path.split('/')
    const name = arr[arr.length-1]
    if( name == preName || !name || !preName){
        return 
    }
    await editAppStyle(path, name, preName)
    await editAppData(path, name, preName)
    return
}