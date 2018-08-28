import chalk from 'chalk'
import { getAllAppPath } from '../utils'
import fs from 'fs'


function edit(pathArr) {
    return new Promise(function (resolve, reject) {
        const arrForm = []
        const arrInsert = []
        pathArr.forEach(path => {
            const namearr = path.split('/')
            const name = namearr[namearr.length - 1]
            const nameStr = name.replace(/-/g, '_')
            arrForm.push(`import ${nameStr} from  '${path}'`)
            arrInsert.push(`[${nameStr}.name]: ${nameStr},`)
        })
        fs.readFile('./index.js', (err, data) => {
            const str = data.toString()
            const index = str.replace(/\/\/note-start[\s\S]*\/\/note-end/g, function (a) {
                const str =
`//note-start
//note-start和note-end之间的内容用脚手架匹配，请不要再该区域书写内容，在执行ttk reset过程中会被删除
${arrForm.join(`
`)}

const apps = {
    ${arrInsert.join(`
    `)}
}
//note-end`
                return str
            })
            fs.createWriteStream('./index.js').write(index, 'utf8', (err) => {
                resolve()
            })
        });
    })
}

function editMock (pathArr) {
    return new Promise(function (resolve, reject) {
        const arrForm = []
        pathArr.forEach(path => {
            const namearr = path.split('/')
            const name = namearr[namearr.length - 1]
            const nameStr = name.replace(/-/g, '_')
            if( fs.existsSync(`${path}/mock.js`) ) {
                arrForm.push(`import '${path}/mock.js';`)
            }
            
        })
        fs.readFile('./mock.js', (err, data) => {
            const str = data.toString()
            const index = str.replace(/\/\/note-start[\s\S]*\/\/note-end/g, function (a) {
                const str =
`//note-start
//note-start和note-end之间的内容用脚手架匹配，请不要再该区域书写内容，在执行ttk reset过程中会被删除
${arrForm.join(`
`)}
//note-end`
                return str
            })
            fs.createWriteStream('./mock.js').write(index, 'utf8', (err) => {
                resolve()
            })
        });
    })
}

function editStyle (pathArr) {
    return new Promise(function (resolve, reject) {
        const arrForm = []
        pathArr.forEach(path => {
            const namearr = path.split('/')
            const name = namearr[namearr.length - 1]
            const nameStr = name.replace(/-/g, '_')
            if( fs.existsSync(`${path}/style.less`) ) {
                arrForm.push(`@import '../.${path}/style.less';`)
            }
            
        })
        fs.readFile('./assets/styles/apps.less', (err, data) => {
            const str = data.toString()
            const index = str.replace(/\/\/note-start[\s\S]*\/\/note-end/g, function (a) {
                const str =
`//note-start
//note-start和note-end之间的内容用脚手架匹配，请不要再该区域书写内容，在执行ttk reset过程中会被删除
${arrForm.join(`
`)}
//note-end`
                return str
            })
            fs.createWriteStream('./assets/styles/apps.less').write(index, 'utf8', (err) => {
                resolve()
            })
        });
    })
}

async function resetModule(path) {

}

export default resetModule