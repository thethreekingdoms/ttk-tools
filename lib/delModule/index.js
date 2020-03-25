'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var delModule = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(path) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _utils.checkYarn)();

                    case 2:
                        if (!(typeof path != 'string')) {
                            _context.next = 7;
                            break;
                        }

                        console.log(_chalk2.default.yellowBright('你没有输入要删除的module名字！'));
                        _context.next = 6;
                        return (0, _utils.getInput)('请输入要删除的module名称：');

                    case 6:
                        path = _context.sent;

                    case 7:
                        console.log('检查该路径下是否已经存在module...');

                        // start
                        _fs2.default.exists("./apps/" + path, function (exists) {
                            if (!exists) {
                                console.log("要删除的模块文件夹不存在apps中!");
                            }
                            if (exists) {
                                var res = _fs2.default.readdirSync("./apps/" + path),
                                    files = res.filter(function (o) {
                                    return _fs2.default.statSync("./apps/" + path + "/" + o).isDirectory();
                                });

                                if (files.length > 1 || files.length == 1 && files[0] != 'theme') {
                                    console.log('此模块下已有app,请将其拷走备份!');
                                    return;
                                }

                                // 4、在apps下面删除此模块
                                (0, _utils.deleteFile)('./apps/' + path);
                            }

                            _fs2.default.exists("./modules/" + path + ".js", function (exists1) {
                                if (exists1) {
                                    // 1、在./modules/[modulesname].js `在文件夹下删除模块名.js文件`
                                    _fs2.default.unlinkSync('./modules/' + path + '.js');
                                }
                            });

                            var verbRes = _fs2.default.readdirSync('./apps'),
                                verbFiles = verbRes.filter(function (o) {
                                return _fs2.default.statSync("./apps/" + o).isDirectory();
                            });

                            // 2、在./modules/loadGlobalModules.js和createManifest.js文件里删除上步创建的模块名。
                            _fs2.default.readFile('./modules/loadGlobalModules.js', function (err, data) {
                                var str = data.toString();
                                var strNew = splitArr(str, path, verbFiles);
                                _fs2.default.createWriteStream('./modules/loadGlobalModules.js').write(strNew, 'utf8', function (err) {
                                    (0, _path.resolve)();
                                });
                            });
                            _fs2.default.readFile('./createManifest.js', function (err, data) {
                                var str = data.toString();
                                var strNew = splitArr(str, path, verbFiles);

                                _fs2.default.createWriteStream('./createManifest.js').write(strNew, 'utf8', function (err) {
                                    (0, _path.resolve)();
                                });
                            });

                            // 3、在./index.js文件里删除模块名称的导入
                            _fs2.default.readFile('./index.js', function (err, data) {
                                var str = data.toString();
                                var strNew = splitArr1(str, path, verbFiles);

                                _fs2.default.createWriteStream('./index.js').write(strNew, 'utf8', function (err) {
                                    (0, _path.resolve)();
                                });
                            });

                            // 5、在package.json文件里`modules`命令下删除该模块名`npm run module --[modulesname]`
                            _fs2.default.readFile('./package.json', function (err, data) {
                                var str = data.toString();
                                var strNew = splitArr2(str, path, verbFiles);

                                _fs2.default.createWriteStream('./package.json').write(strNew, 'utf8', function (err) {
                                    (0, _path.resolve)();
                                });
                            });

                            // 6、配置文件webpack.config.module.js   webpack.config.js里删除新模块的判断，如`case '--taxapply': argName = 'taxapply'`来实现按模块打包
                            _fs2.default.readFile('./webpack.config.module.js', function (err, data) {
                                var str = data.toString();
                                var strNew = splitArr3(str, path, verbFiles);

                                _fs2.default.createWriteStream('./webpack.config.module.js').write(strNew, 'utf8', function (err) {
                                    (0, _path.resolve)();
                                });
                            });
                            _fs2.default.readFile('./webpack.config.js', function (err, data) {
                                var str = data.toString();
                                var strNew = splitArr5(str, path, verbFiles);

                                _fs2.default.createWriteStream('./webpack.config.js').write(strNew, 'utf8', function (err) {
                                    (0, _path.resolve)();
                                });
                            });

                            // 7、在webpackCompileParams.js文件里删除模块的引用。
                            _fs2.default.readFile('./webpackCompileParams.js', function (err, data) {
                                var str = data.toString();
                                var strNew = splitArr4(str, path, verbFiles);
                                _fs2.default.createWriteStream('./webpackCompileParams.js').write(strNew, 'utf8', function (err) {
                                    (0, _path.resolve)();
                                });
                            });

                            console.log("删除模块成功!");
                            console.log("如果之前模块下存在app,请手动删除根目录下mock.js文件对其的引用.");
                        });

                    case 9:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function delModule(_x) {
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


function splitArr(str, path, verbFiles) {
    var str1 = str.replace(/moduleName = \[[\s\S]*?\]/g, function () {
        var str2;
        verbFiles.map(function (o, k) {
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
        str2;
    verbFiles.map(function (o) {
        importArr.push('import use' + o.toLocaleUpperCase() + ' from \'use' + o.toLocaleUpperCase() + '\'');
        if (!str2) {
            str2 = 'use' + o.toLocaleUpperCase();
        } else {
            str2 += "," + 'use' + o.toLocaleUpperCase();
        }
    });
    var str1 = str.replace(/\/\/note-start[\s\S]*?\]/g, function () {
        var str3 = '//note-start\n//note-start\u548Cnote-end\u4E4B\u95F4\u7684\u5185\u5BB9\u7528\u811A\u624B\u67B6\u5339\u914D\uFF0C\u8BF7\u4E0D\u8981\u518D\u8BE5\u533A\u57DF\u4E66\u5199\u5185\u5BB9\uFF0C\u5728\u6267\u884Cttk delmodule\u8FC7\u7A0B\u4E2D\u4F1A\u88AB\u5220\u9664\n' + importArr.join('\n') + '\nconst arr = [' + str2 + ']';
        return str3;
    });
    return str1;
}

function splitArr2(str, path, verbFiles) {
    var str2 = void 0;
    verbFiles.map(function (o) {
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
    var str1 = str.replace(/const moduleConfig = \{[\s\S]*?function checkRunParams\(name\) \{/g, function (e) {
        var str2 = 'const moduleConfig = {\n    ' + arrForm.join('\n    ') + '\n}' + '\n' + '\/\/请勿在此上下两个函数中间手动添加代码,执行ttk dmo删除模块会重写该部分' + '\n' + 'function checkRunParams(name) {';
        return str2;
    });
    return str1;
}

exports.default = delModule;
module.exports = exports['default'];