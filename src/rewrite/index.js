import chalk from 'chalk'
import { getOwnAllAppPath } from '../utils'
import fs from 'fs'


function writeIndex(pathArr, pathNor) {
    return new Promise(function (resolve, reject) {
        const arrForm = []
        const arrInsert = []
        pathArr.forEach(path => {
            const namearr = path.split('/')
            const name = namearr[namearr.length - 1]
            const nameStr = name.replace(/-/g, '_')
            arrForm.push(`import ${nameStr} from  './${path}'`)
            arrInsert.push(`[${nameStr}.name]: ${nameStr},`)
        })

        let strForm = transArrToStr(arrForm),
            strInsert = transArrToStr1(arrInsert),
            strExport = `window.publicModule && window.publicModule.callback(obj,` + ' ' + '"' + pathNor[pathNor.length - 1] + '"' + `);` + '\n',
            strFun = `export default obj;`,
            strs

        strs = strForm + '\n' + `const obj={` + strInsert + `}` + '\n\n' + strExport + '\n' + strFun

        fs.writeFile('./index.js', strs, (err) => {
            resolve()
        })


    })
}

function writeStyle (pathArr) {
    return new Promise(function (resolve, reject) {
        const arrForm = []
        pathArr.forEach(path => {
            const namearr = path.split('/')
            const name = namearr[namearr.length - 1]
            const nameStr = name.replace(/-/g, '_')
            if( fs.existsSync(`${path}/style.less`) ) {
                arrForm.push(`@import './${path}/style.less';`)
            }
            
        })
        let arrForm1 = transArrToStr(arrForm)
        fs.writeFile('./index.less', arrForm1, (err) => {
            resolve()
        })
    })
}

function transArrToStr (arr) {
    let str
    arr.map(o => {
        if(!str) {
            str = o + '\n'
        } else {
            str += o + '\n'
        }
    })
    return str
}
function transArrToStr1 (arr) {
    let str
    arr.map(o => {
        if(!str) {
            str = '\n' + '    ' + o + '\n'
        } else {
            str += '    ' + o + '\n'
        }
    })
    return str
}

async function rewrite(path) {
    let processPath = process.cwd(),
        pathNor

    pathNor = processPath.indexOf('/') != -1 ? processPath.split('/') : processPath.split('\\')
    if (typeof (path) != 'string') {
        path = '../' + pathNor[pathNor.length - 1]
    }
    const res = getOwnAllAppPath(path)
    const writeIndexRes = await writeIndex(res, pathNor)
    const writeStyleRes = await writeStyle(res)
}

export default rewrite