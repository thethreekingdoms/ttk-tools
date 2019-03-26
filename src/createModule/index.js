import chalk from 'chalk'
import spawn from 'cross-spawn'
import vfs from 'vinyl-fs'
import path, { resolve } from 'path'
import fs from 'fs'

import {
    mkdir, copyFile, copyDir, haveFile, prompt, getInput, 
    readDir, edit, editAppName, editmock, editstyle,
    deleteFile, replacePreName, checkYarn
} from '../utils'

const { join, basename } = path

async function createModule(path) {
    await checkYarn()

    if( typeof(path) != 'string' ){
        console.log(chalk.yellowBright('你没有输入创建的module名字！'))
        path = await getInput('请输入创建的module名称：')
    }
    console.log('检查该路径下是否已经存在module...')

    // start
    fs.exists("./apps/" + path,function(exists){
        if(exists){
            console.log("文件存在")
        } else {
            // 4、在apps下面创建模块的文件夹名称
            fs.mkdir('./apps/'+ path,function(error){
                console.log('创建模块成功');
            })

            // 1、在./modules/[modulesname].js `在文件夹下创建模块名.js文件`
            let infoIm = `import moduleGlobal from './loadGlobalModules';`,
                infoEx = `export default moduleGlobal.getJS("${path}")`,
                info = infoIm + '\n\n' + infoEx

            fs.writeFile('./modules/' + path + '.js', info, (err) => {
                resolve()
            })

            // 2、在./modules/loadGlobalModules.js和createManifest.js文件里引入上步创建的模块名。
            fs.readFile('./modules/loadGlobalModules.js', (err, data) => {
                const str = data.toString()
                const strNew = splitArr(str, path)

                fs.createWriteStream('./modules/loadGlobalModules.js').write(strNew, 'utf8', (err) => {
                    resolve()
                })
            })

            fs.readFile('./createManifest.js', (err, data) => {
                const str = data.toString()
                const strNew = splitArr(str, path)

                fs.createWriteStream('./createManifest.js').write(strNew, 'utf8', (err) => {
                    resolve()
                })
            })

            // 3、在./index.js文件里加入模块名称的导入
            fs.readFile('./index.js', (err, data) => {
                const str = data.toString()
                const strNew = splitArr1(str, path)

                fs.createWriteStream('./index.js').write(strNew, 'utf8', (err) => {
                    resolve()
                })
            })

            // 5、在package.json文件里`modules`命令下加入该模块名`npm run module --[modulesname]`
            fs.readFile('./package.json', (err, data) => {
                const str = data.toString()
                const strNew = splitArr2(str, path)

                fs.createWriteStream('./package.json').write(strNew, 'utf8', (err) => {
                    resolve()
                })
            })

            // 6、配置文件webpack.config.module.js   webpack.config.js里加入新模块的判断，如`case '--taxapply': argName = 'taxapply'`来实现按模块打包
            fs.readFile('./webpack.config.module.js', (err, data) => {
                const str = data.toString()
                const strNew = splitArr3(str, path)

                fs.createWriteStream('./webpack.config.module.js').write(strNew, 'utf8', (err) => {
                    resolve()
                })
            })
            fs.readFile('./webpack.config.js', (err, data) => {
                const str = data.toString()
                const strNew = splitArr5(str, path)

                fs.createWriteStream('./webpack.config.js').write(strNew, 'utf8', (err) => {
                    resolve()
                })
            })

            // 7、在webpackCompileParams.js文件里添加入模块的引用。
            fs.readFile('./webpackCompileParams.js', (err, data) => {
                const str = data.toString()
                const strNew = splitArr4(str, path)

                fs.createWriteStream('./webpackCompileParams.js').write(strNew, 'utf8', (err) => {
                    resolve()
                })
            })

            // 8、复制theme到相应模块
            const copyTheme = copyDir('./apps/edf/theme', './apps/' + path + '/theme', function(err){
                if(err){
                    console.log(err);
                }
                console.log(chalk.greenBright('复制theme文件成功！！！'))
            })

            // 9、创建index.js index.less
            fs.createWriteStream('./apps/' + path + '/index.js')
            fs.createWriteStream('./apps/' + path + '/index.less')
        }
    })
}

function splitArr(str, path) {
    const str1 = str.replace(/moduleName = \[/g, function(a) {
        const str2 = `moduleName = ['${path}', `
        return str2
    })
    return str1
    /*let str1 = str.split(/\/\/create-module-start/g),
        str2 = str1[1].split(/\/\/create-module-end/g),
        str3 = str2[0].replace(/]/g, function() {
            return `, '${path}']`
        })

    const str4 = str.replace(/\/\/create-module-start[\s\S]*\/\/create-module-end/g, function(a) {
        const str5 = 
`//create-module-start ${str3} //create-module-end`
        return str5
    })
    return str4*/
}

function splitArr1(str, path) {
    const str1 = str.replace(/const arr = \[/g, function(a) {
        const str2 = `//${path}模块
import use${path.toLocaleUpperCase()} from 'use${path.toLocaleUpperCase()}'
const arr = [use${path.toLocaleUpperCase()}, `
        return str2
    })
    return str1
/*    let str1 = str.split(/\/\/create-module-start/g),
        str2 = str1[1].split(/\/\/create-module-end/g),
        str3 = str2[0].replace(/]/g, function() {
            return `, use${path.toLocaleUpperCase()}]`
        })
console.log(str3)
    const str4 = str.replace(/\/\/create-module-start[\s\S]*\/\/create-module-end/g, function(a) {
        const str5 = 
`//create-module-start //${path}模块
import use${path.toLocaleUpperCase()} from 'use${path.toLocaleUpperCase()}'
${str3} //create-module-end`
        return str5
    })
    return str4*/
}

function splitArr2(str, path) {
    const str1 = str.replace(/"modules": "/g, function(a) {
        const str2 = `"modules": "npm run module --${path} && `
        return str2
    })
    return str1
}

function splitArr5(str, path) {
    const str1 = str.replace(/const modules = \[/g, function(a) {
        const str2 = `const modules = ['${path}', `
        return str2
    })
    return str1
}

function splitArr3(str, path) {
    const str1 = str.replace(/switch \(argv.original\[2\]\) \{/g, function(a) {
        const str2 = `switch (argv.original[2]) {
    case '--${path}': argName = '${path}'
        break;`
        return str2
    })
    return str1
}
function splitArr4(str, path) {
    const str1 = str.replace(/const moduleConfig = \{/g, function(a) {
        const str2 = `const moduleConfig = {
    use${path.toLocaleUpperCase()}: {
        path: './apps/${path}/',
        name: '${path}',
        less: '${path}'
    },`
        return str2
    })
    return str1
}

export default createModule