'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var checkPath = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(path) {
        var result, flag;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        result = path;

                    case 1:
                        if (!true) {
                            _context.next = 15;
                            break;
                        }

                        _context.next = 4;
                        return (0, _utils.haveFile)(result);

                    case 4:
                        flag = _context.sent;

                        if (!flag) {
                            _context.next = 12;
                            break;
                        }

                        console.log(_chalk2.default.yellowBright('该路径下已经存在app!'));
                        _context.next = 9;
                        return (0, _utils.prompt)('请输入新的路径：');

                    case 9:
                        result = _context.sent;
                        _context.next = 13;
                        break;

                    case 12:
                        return _context.abrupt('return', result);

                    case 13:
                        _context.next = 1;
                        break;

                    case 15:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function checkPath(_x) {
        return _ref.apply(this, arguments);
    };
}();

var createApp = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(path) {
        var type, appPath, app, cloneResult, _cloneResult, res3, editNameRes, editmockRes, editResult;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return (0, _utils.checkYarn)();

                    case 2:
                        if (!(typeof path != 'string')) {
                            _context2.next = 7;
                            break;
                        }

                        console.log(_chalk2.default.yellowBright('你没有输入创建的app名字！'));
                        _context2.next = 6;
                        return (0, _utils.getInput)('请输入创建的app名称：');

                    case 6:
                        path = _context2.sent;

                    case 7:
                        console.log(_chalk2.default.yellowBright('\u8BF7\u8F93\u5165\u5BF9\u5E94\u6570\u5B57\uFF0C\u9009\u62E9\u5E94\u7528\u7684\u7C7B\u578B\u3002\n    1: \u539F\u751Fhook\u5E94\u7528(\u6216\u8005\u4EFB\u610F\u5B57\u7B26)\n    2: \u65E7\u7248json\u5E94\u7528'));
                        _context2.next = 10;
                        return (0, _utils.getInput)('\u8BF7\u8F93\u5165:', true);

                    case 10:
                        type = _context2.sent;


                        console.log('检查该路径下是否已经存在app...');
                        // 默认在apps文件夹下创建
                        path = 'apps/' + path;
                        // path = await checkPath(path)
                        console.log(path);
                        // console.log(haveFileResult)

                        // if( haveFileResult ){
                        //     console.log(chalk.yellowBright('项目中已经存在该路径！'))
                        //     path = await prompt('请输入新的路径：')
                        // }
                        appPath = void 0;
                        app = newHookApp;

                        if (type == 2) app = cloneApp;

                        if (!checkVersion()) {
                            _context2.next = 28;
                            break;
                        }

                        appPath = newCloneApp;
                        _context2.next = 21;
                        return _crossSpawn2.default.sync('yarn', ['add', newCloneApp], { cwd: join(process.cwd()), stdio: 'inherit' });

                    case 21:
                        cloneResult = _context2.sent;

                        if (!(cloneResult.error || cloneResult.status != 0)) {
                            _context2.next = 26;
                            break;
                        }

                        console.log(_chalk2.default.redBright(cloneResult.error));
                        console.log(_chalk2.default.redBright('下载ttk-app-init-demo失败！'));
                        return _context2.abrupt('return', process.exit());

                    case 26:
                        _context2.next = 36;
                        break;

                    case 28:
                        appPath = app;
                        _context2.next = 31;
                        return _crossSpawn2.default.sync('yarn', ['add', app], { cwd: join(process.cwd()), stdio: 'inherit' });

                    case 31:
                        _cloneResult = _context2.sent;

                        if (!(_cloneResult.error || _cloneResult.status != 0)) {
                            _context2.next = 36;
                            break;
                        }

                        console.log(_chalk2.default.redBright(_cloneResult.error));
                        console.log(_chalk2.default.redBright('\u4E0B\u8F7D' + app + '\u5931\u8D25\uFF01'));
                        return _context2.abrupt('return', process.exit());

                    case 36:
                        _context2.next = 38;
                        return (0, _utils.copyFile)('' + path, ['./node_modules/' + appPath + '/**', '!./node_modules/' + appPath + '/package.json', '!./node_modules/' + appPath + '/README.md', '!./node_modules/' + appPath + '/node_modules']);

                    case 38:
                        res3 = _context2.sent;

                        console.log(_chalk2.default.greenBright('复制文件成功！！！'));
                        console.log('修改app/index中的name...');
                        _context2.next = 43;
                        return (0, _utils.editAppName)(path, 'app-test');

                    case 43:
                        editNameRes = _context2.sent;

                        if (editNameRes) {
                            console.log(_chalk2.default.greenBright('修改app.name成功！'));
                        }
                        _context2.next = 47;
                        return (0, _utils.editmock)(path);

                    case 47:
                        editmockRes = _context2.sent;

                        if (editmockRes) {
                            console.log(_chalk2.default.greenBright('修改mock.js成功！'));
                        }
                        // const editstyleres = await editstyle(path)
                        // if( editstyleres ) {
                        //     console.log(chalk.greenBright('修改app.less成功！'))
                        // }
                        console.log('修改根目录下的index.js文件。');
                        _context2.next = 52;
                        return (0, _utils.edit)(path);

                    case 52:
                        editResult = _context2.sent;

                        if (!(type == 2)) {
                            _context2.next = 58;
                            break;
                        }

                        _context2.next = 56;
                        return (0, _utils.replacePreName)(path, 'app-test');

                    case 56:
                        _context2.next = 60;
                        break;

                    case 58:
                        _context2.next = 60;
                        return (0, _utils.replaceHookAppName)(path, app);

                    case 60:
                        _context2.next = 62;
                        return rewrite(path);

                    case 62:
                        console.log(_chalk2.default.greenBright('完成'));
                        process.exit();

                    case 64:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function createApp(_x2) {
        return _ref2.apply(this, arguments);
    };
}();

var rewrite = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(path) {
        var pathNor, res, writeIndexRes, writeStyleRes;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        pathNor = path.indexOf('/') != -1 ? path.split('/') : path.split('\\'), res = (0, _utils.getAllAppPath)('./apps/' + pathNor[pathNor.length - 2]);
                        _context3.next = 3;
                        return writeIndex(res, pathNor);

                    case 3:
                        writeIndexRes = _context3.sent;
                        _context3.next = 6;
                        return writeStyle(res, pathNor);

                    case 6:
                        writeStyleRes = _context3.sent;

                    case 7:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function rewrite(_x3) {
        return _ref3.apply(this, arguments);
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

var cloneApp = 'ttk-app-init-demo';
var newCloneApp = 'ttk-app-init-new-demo';
var newHookApp = 'ttk-hook-app-init';


function checkVersion() {
    var result = _fs2.default.existsSync('./version.txt');
    if (result) {
        var str = _fs2.default.readFileSync('./version.txt');
        if (str && str.indexOf('2.0.0') > -1) {
            return true;
        }
    }
    return false;
}

function writeIndex(pathArr, pathNor) {
    return new _promise2.default(function (resolve, reject) {
        var arrForm = [];
        var arrInsert = [];
        pathArr.forEach(function (path) {
            var namearr = path.split('/');
            var name = namearr[namearr.length - 1];
            var nameStr = name.replace(/-/g, '_');
            arrForm.push('import ' + nameStr + ' from  \'./' + namearr[namearr.length - 1] + '\'');
            arrInsert.push('[' + nameStr + '.name]: ' + nameStr + ',');
        });
        var strForm = transArrToStr(arrForm),
            strInsert = transArrToStr1(arrInsert),
            strExport = 'window.publicModule && window.publicModule.callback(obj,' + ' ' + '"' + pathNor[pathNor.length - 2] + '"' + ');' + '\n',
            strFun = 'export default obj;',
            writePath = './apps/' + pathNor[pathNor.length - 2] + '/index.js',
            strs = void 0;

        strs = strForm + '\n' + 'const obj={' + strInsert + '}' + '\n\n' + strExport + '\n' + strFun;

        _fs2.default.writeFile(writePath, strs, function (err) {
            resolve();
        });
    });
}

function writeStyle(pathArr, pathNor) {
    return new _promise2.default(function (resolve, reject) {
        var arrForm = [];
        pathArr.forEach(function (path) {
            var namearr = path.split('/');
            var name = namearr[namearr.length - 1];
            var nameStr = name.replace(/-/g, '_');
            if (_fs2.default.existsSync(path + '/style.less')) {
                arrForm.push('@import \'./' + namearr[namearr.length - 1] + '/style.less\';');
            }
        });
        var arrForm1 = transArrToStr(arrForm),
            writePath = './apps/' + pathNor[pathNor.length - 2] + '/index.less';
        _fs2.default.writeFile(writePath, arrForm1, function (err) {
            resolve();
        });
    });
}

function transArrToStr(arr) {
    var str = void 0;
    arr.map(function (o) {
        if (!str) {
            str = o + '\n';
        } else {
            str += o + '\n';
        }
    });
    return str;
}
function transArrToStr1(arr) {
    var str = void 0;
    arr.map(function (o) {
        if (!str) {
            str = '\n' + '    ' + o + '\n';
        } else {
            str += '    ' + o + '\n';
        }
    });
    return str;
}

exports.default = createApp;
module.exports = exports['default'];