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

async function delModule(path) {
    await checkYarn()

    if( typeof(path) != 'string' ){
        console.log(chalk.yellowBright('你没有输入要删除的module名字！'))
        path = await getInput('请输入要删除的module名称：')
    }
    console.log('检查该路径下是否已经存在module...')

    // start
    fs.exists("./apps/" + path,function(exists){
        if(!exists){
            console.log("要删除的模块文件夹不存在apps中!")
        }
        if(exists) {
            var res = fs.readdirSync("./apps/" + path),
                files = res.filter(o => fs.statSync("./apps/" + path + "/" + o).isDirectory())

            if (files.length > 1 || files.length == 1 && files[0] != 'theme') {
                console.log('此模块下已有app,请将其拷走备份!');
                return;
            }

            // 4、在apps下面删除此模块
            deleteFile('./apps/' + path);
        }

        fs.exists("./modules/" + path + ".js", function(exists1) {
            if(exists1) {
                // 1、在./modules/[modulesname].js `在文件夹下删除模块名.js文件`
                fs.unlinkSync('./modules/' + path + '.js');
            }
        })

        var verbRes = fs.readdirSync('./apps'),
            verbFiles = verbRes.filter(o => fs.statSync("./apps/" + o).isDirectory())

        // 2、在./modules/loadGlobalModules.js和createManifest.js文件里删除上步创建的模块名。
        fs.readFile('./modules/loadGlobalModules.js', function (err, data) {
            var str = data.toString();
            var strNew = splitArr(str, path, verbFiles);
            fs.createWriteStream('./modules/loadGlobalModules.js').write(strNew, 'utf8', function (err) {
                resolve()
            });
        });
        fs.readFile('./createManifest.js', function (err, data) {
            var str = data.toString();
            var strNew = splitArr(str, path, verbFiles);

            fs.createWriteStream('./createManifest.js').write(strNew, 'utf8', function (err) {
                resolve()
            });
        });

        // 3、在./index.js文件里删除模块名称的导入
        fs.readFile('./index.js', function (err, data) {
            var str = data.toString();
            var strNew = splitArr1(str, path, verbFiles);

            fs.createWriteStream('./index.js').write(strNew, 'utf8', function (err) {
                resolve()
            });
        });

        // 5、在package.json文件里`modules`命令下删除该模块名`npm run module --[modulesname]`
        fs.readFile('./package.json', function (err, data) {
            var str = data.toString();
            var strNew = splitArr2(str, path, verbFiles);

            fs.createWriteStream('./package.json').write(strNew, 'utf8', function (err) {
                resolve()
            });
        });

        // 6、配置文件webpack.config.module.js   webpack.config.js里删除新模块的判断，如`case '--taxapply': argName = 'taxapply'`来实现按模块打包
        fs.readFile('./webpack.config.module.js', function (err, data) {
            var str = data.toString();
            var strNew = splitArr3(str, path, verbFiles);

            fs.createWriteStream('./webpack.config.module.js').write(strNew, 'utf8', function (err) {
                resolve()
            });
        });
        fs.readFile('./webpack.config.js', function (err, data) {
            var str = data.toString();
            var strNew = splitArr5(str, path, verbFiles);

            fs.createWriteStream('./webpack.config.js').write(strNew, 'utf8', function (err) {
                resolve()
            });
        });

        // 7、在webpackCompileParams.js文件里删除模块的引用。
        fs.readFile('./webpackCompileParams.js', function (err, data) {
            var str = data.toString();
            var strNew = splitArr4(str, path, verbFiles);

            fs.createWriteStream('./webpackCompileParams.js').write(strNew, 'utf8', function (err) {
                resolve()
            });
        });

        console.log("删除模块成功!")
        console.log("如果之前模块下存在app,请手动删除根目录下mock.js文件对其的引用.")
    })
}

function splitArr(str, path, verbFiles) {
    var str1 = str.replace(/moduleName = \[[\s\S]*?\]/g, function () {
        var str2
        verbFiles.map((o, k) => {
            if (!str2) {
                str2 = "'" + o + "'";
            } else {
                str2 += "," + "'" + o + "'";
            }
        });
        var str3 = 'moduleName = [' + str2 + ']';
        return str3;
    });
    return str1;
}

function splitArr1(str, path, verbFiles) {
    var importArr = [],
        str2
    verbFiles.map(o => {
        importArr.push('import use' + o.toLocaleUpperCase() + ' from \'use' + o.toLocaleUpperCase() + '\'');
        if (!str2) {
            str2 = 'use' + o.toLocaleUpperCase();
        } else {
            str2 += "," + 'use' + o.toLocaleUpperCase();
        }
    });
    var str1 = str.replace(/\/\/note-start[\s\S]*?\]/g, function () {
        let str3 = 
`//note-start
//note-start和note-end之间的内容用脚手架匹配，请不要再该区域书写内容，在执行ttk delmodule过程中会被删除
${importArr.join(`
`)}
const arr = [${str2}]`
        return str3;
    });
    return str1;
}

function splitArr2(str, path, verbFiles) {
    var str2 = void 0;
    verbFiles.map(o => {
        if (!str2) {
            str2 = '"modules": "npm run module --' + o;
        } else {
            str2 += ' && npm run module --' + o;
        }
    });
    var str1 = str.replace(/"modules": [\s\S]*?\,/g, function () {
        return str2 + '",';
    });
    return str1;
}


function splitArr5(str, path, verbFiles) {
    var str1 = str.replace(/modules = \[[\s\S]*?\]/g, function () {
        var str2 = void 0;
        verbFiles.map(function (o, k) {
            if (!str2) {
                str2 = "'" + o + "'";
            } else {
                str2 += "," + "'" + o + "'";
            }
        });
        var str3 = 'modules = [' + str2 + ']';
        return str3;
    });
    return str1;
}

function splitArr3(str, path, verbFiles) {
    var str2 = [];
    verbFiles.map(function (o) {
        str2.push("case '--" + o + "': argName = '" + o + "'");
    });
    var str1 = str.replace(/switch \(argv.original\[2\]\)[\s\S]*?\}/g, function () {
        var str3 = 'switch (argv.original[2]) {\n    ' + str2.join('\n        break;\n    ') + '\n        break;\n}';
        return str3;
    });
    return str1;
}
function splitArr4(str, path, verbFiles) {
    var arrForm = [];
    verbFiles.map(function (o) {
        arrForm.push('use' + o.toLocaleUpperCase() + ': { \n        path: \'./apps/' + o + '/\', \n        name: \'' + o + '\', \n        less: \'' + o + '\' \n    },');
    });
    var str1 = str.replace(/const moduleConfig = \{[\s\S]*\}\,\n*?\}/g, function () {
        var str2 = 'const moduleConfig = {\n    ' + arrForm.join('\n    ') + '\n}';
        return str2;
    });
    return str1;
}

export default delModule

