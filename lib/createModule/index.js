'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var createModule = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(path) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _utils.checkYarn)();

                    case 2:
                        if (!(typeof path != 'string')) {
                            _context.next = 9;
                            break;
                        }

                        console.log(_chalk2.default.yellowBright('你没有输入创建的module名字！'));
                        _context.next = 6;
                        return (0, _utils.getInput)('请输入创建的module名称：');

                    case 6:
                        path = _context.sent;
                        _context.next = 14;
                        break;

                    case 9:
                        if (!(path.indexOf('-') >= 0)) {
                            _context.next = 14;
                            break;
                        }

                        console.log(_chalk2.default.yellowBright('module名字不能含有非法字符串“-”.'));
                        _context.next = 13;
                        return (0, _utils.getInput)('请重新输入module名称：');

                    case 13:
                        path = _context.sent;

                    case 14:
                        console.log('检查该路径下是否已经存在module...');

                        // start
                        _fs2.default.exists("./apps/" + path, function (exists) {

                            if (exists) {
                                console.log("文件存在");
                            } else {
                                // 4、在apps下面创建模块的文件夹名称
                                _fs2.default.mkdir('./apps/' + path, function (error) {
                                    console.log('创建模块成功');
                                });

                                // 1、在./modules/[modulesname].js `在文件夹下创建模块名.js文件`
                                var infoIm = 'import moduleGlobal from \'./loadGlobalModules\';',
                                    infoEx = 'export default moduleGlobal.getJS("' + path + '")',
                                    info = infoIm + '\n\n' + infoEx;

                                _fs2.default.writeFile('./modules/' + path + '.js', info, function (err) {
                                    (0, _path.resolve)();
                                });

                                // 2、在./modules/loadGlobalModules.js和createManifest.js文件里引入上步创建的模块名。
                                _fs2.default.readFile('./modules/loadGlobalModules.js', function (err, data) {
                                    var str = data.toString();
                                    var strNew = splitArr(str, path);

                                    _fs2.default.createWriteStream('./modules/loadGlobalModules.js').write(strNew, 'utf8', function (err) {
                                        (0, _path.resolve)();
                                    });
                                });

                                _fs2.default.readFile('./createManifest.js', function (err, data) {
                                    var str = data.toString();
                                    var strNew = splitArr(str, path);

                                    _fs2.default.createWriteStream('./createManifest.js').write(strNew, 'utf8', function (err) {
                                        (0, _path.resolve)();
                                    });
                                });

                                // 3、在./index.js文件里加入模块名称的导入
                                _fs2.default.readFile('./index.js', function (err, data) {
                                    var str = data.toString();
                                    var strNew = splitArr1(str, path);

                                    _fs2.default.createWriteStream('./index.js').write(strNew, 'utf8', function (err) {
                                        (0, _path.resolve)();
                                    });
                                });

                                // 5、在package.json文件里`modules`命令下加入该模块名`npm run module --[modulesname]`
                                _fs2.default.readFile('./package.json', function (err, data) {
                                    var str = data.toString();
                                    var strNew = splitArr2(str, path);

                                    _fs2.default.createWriteStream('./package.json').write(strNew, 'utf8', function (err) {
                                        (0, _path.resolve)();
                                    });
                                });

                                // 6、配置文件webpack.config.module.js   webpack.config.js里加入新模块的判断，如`case '--taxapply': argName = 'taxapply'`来实现按模块打包
                                _fs2.default.readFile('./webpack.config.module.js', function (err, data) {
                                    var str = data.toString();
                                    var strNew = splitArr3(str, path);

                                    _fs2.default.createWriteStream('./webpack.config.module.js').write(strNew, 'utf8', function (err) {
                                        (0, _path.resolve)();
                                    });
                                });
                                _fs2.default.readFile('./webpack.config.js', function (err, data) {
                                    var str = data.toString();
                                    var strNew = splitArr5(str, path);

                                    _fs2.default.createWriteStream('./webpack.config.js').write(strNew, 'utf8', function (err) {
                                        (0, _path.resolve)();
                                    });
                                });

                                // 7、在webpackCompileParams.js文件里添加入模块的引用。
                                _fs2.default.readFile('./webpackCompileParams.js', function (err, data) {
                                    var str = data.toString();
                                    var strNew = splitArr4(str, path);

                                    _fs2.default.createWriteStream('./webpackCompileParams.js').write(strNew, 'utf8', function (err) {
                                        (0, _path.resolve)();
                                    });
                                });

                                // 8、复制theme到相应模块
                                var copyTheme = (0, _utils.copyDir)('./apps/edf/theme', './apps/' + path + '/theme', function (err) {
                                    if (err) {
                                        console.log(err);
                                    }
                                    console.log(_chalk2.default.greenBright('复制theme文件成功！！！'));
                                });

                                // 9、创建index.js index.less
                                _fs2.default.createWriteStream('./apps/' + path + '/index.js');
                                _fs2.default.createWriteStream('./apps/' + path + '/index.less');
                            }
                        });

                    case 16:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function createModule(_x) {
        return _ref.apply(this, arguments);
    };
}();

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _crossSpawn = require('cross-spawn');

var _crossSpawn2 = _interopRequireDefault(_crossSpawn);

var _vinylFs = require('vinyl-fs');

var _vinylFs2 = _interopRequireDefault(_vinylFs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var join = _path2.default.join,
    basename = _path2.default.basename;


function splitArr(str, path) {
    var str1 = str.replace(/moduleName = \[/g, function (a) {
        var str2 = 'moduleName = [\'' + path + '\', ';
        return str2;
    });
    return str1;
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
    var str1 = str.replace(/const arr = \[/g, function (a) {
        var str2 = '//' + path + '\u6A21\u5757\nimport use' + path.toLocaleUpperCase() + ' from \'use' + path.toLocaleUpperCase() + '\'\nconst arr = [use' + path.toLocaleUpperCase() + ', ';
        return str2;
    });
    return str1;
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
    var str1 = str.replace(/"modules": "/g, function (a) {
        var str2 = '"modules": "npm run module --' + path + ' && ';
        return str2;
    });
    return str1;
}

function splitArr5(str, path) {
    var str1 = str.replace(/const modules = \[/g, function (a) {
        var str2 = 'const modules = [\'' + path + '\', ';
        return str2;
    });
    return str1;
}

function splitArr3(str, path) {
    var str1 = str.replace(/switch \(argv.original\[2\]\) \{/g, function (a) {
        var str2 = 'switch (argv.original[2]) {\n    case \'--' + path + '\': argName = \'' + path + '\'\n        break;';
        return str2;
    });
    return str1;
}
function splitArr4(str, path) {
    var str1 = str.replace(/const moduleConfig = \{/g, function (a) {
        var str2 = 'const moduleConfig = {\n    use' + path.toLocaleUpperCase() + ': {\n        path: \'./apps/' + path + '/\',\n        name: \'' + path + '\',\n        less: \'' + path + '\'\n    },';
        return str2;
    });
    return str1;
}

exports.default = createModule;
module.exports = exports['default'];