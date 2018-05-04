'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var checkPath = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(path, noExit) {
        var result, flag;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        result = path;

                    case 1:
                        if (!true) {
                            _context.next = 17;
                            break;
                        }

                        _context.next = 4;
                        return (0, _utils.haveFile)(result);

                    case 4:
                        flag = _context.sent;

                        if (!(flag && noExit)) {
                            _context.next = 7;
                            break;
                        }

                        return _context.abrupt('return', true);

                    case 7:
                        if (!flag) {
                            _context.next = 14;
                            break;
                        }

                        console.log(_chalk2.default.yellowBright('该路径下已经存在app!'));
                        _context.next = 11;
                        return (0, _utils.prompt)('请输入新的路径：');

                    case 11:
                        result = _context.sent;
                        _context.next = 15;
                        break;

                    case 14:
                        return _context.abrupt('return', result);

                    case 15:
                        _context.next = 1;
                        break;

                    case 17:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function checkPath(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var JoinApp = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(path) {
        var res, editmockRes, editstyleres, editResult;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return (0, _utils.haveFile)(path + '/index.js');

                    case 2:
                        res = _context2.sent;

                        if (res) {
                            _context2.next = 5;
                            break;
                        }

                        return _context2.abrupt('return');

                    case 5:
                        _context2.next = 7;
                        return (0, _utils.editmock)(path);

                    case 7:
                        editmockRes = _context2.sent;

                        if (editmockRes) {
                            console.log(_chalk2.default.greenBright('修改mock.js成功！'));
                        }
                        _context2.next = 11;
                        return (0, _utils.editstyle)(path);

                    case 11:
                        editstyleres = _context2.sent;

                        if (editstyleres) {
                            console.log(_chalk2.default.greenBright('修改app.less成功！'));
                        }
                        console.log('修改根目录下的index.js文件。');
                        _context2.next = 16;
                        return (0, _edit2.default)(path);

                    case 16:
                        editResult = _context2.sent;
                        return _context2.abrupt('return', true);

                    case 18:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function JoinApp(_x3) {
        return _ref2.apply(this, arguments);
    };
}();

var clone = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(cloneApp, path, noExit) {
        var cloneResult, res3, editNameRes, editmockRes, editstyleres, editResult, apps, i, appItemPath, res;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return (0, _utils.checkYarn)();

                    case 2:
                        if (!(typeof cloneApp != 'string')) {
                            _context3.next = 7;
                            break;
                        }

                        console.log(_chalk2.default.yellowBright('你没有输入clone的app！'));
                        _context3.next = 6;
                        return (0, _utils.getInput)('请输入clone的app：');

                    case 6:
                        cloneApp = _context3.sent;

                    case 7:
                        if (!(typeof path != 'string')) {
                            _context3.next = 12;
                            break;
                        }

                        console.log(_chalk2.default.yellowBright('你没有输入clone到指定的路径！'));
                        _context3.next = 11;
                        return (0, _utils.getInput)('请输入路径：');

                    case 11:
                        path = _context3.sent;

                    case 12:
                        console.log('检查该路径下是否已经存在app...');
                        _context3.next = 15;
                        return checkPath(path, noExit);

                    case 15:
                        path = _context3.sent;

                        if (!(path === true)) {
                            _context3.next = 19;
                            break;
                        }

                        console.log(_chalk2.default.yellowBright(path + '\u8DEF\u5F84\u5DF2\u7ECF\u5B58\u5728\u6267\u884C\u8DF3\u8FC7'));
                        return _context3.abrupt('return', true);

                    case 19:
                        console.log(path);
                        // console.log(haveFileResult)

                        // if( haveFileResult ){
                        //     console.log(chalk.yellowBright('项目中已经存在该路径！'))
                        //     path = await prompt('请输入新的路径：')
                        // }
                        _context3.next = 22;
                        return _crossSpawn2.default.sync('yarn', ['add', cloneApp], { cwd: join(process.cwd()), stdio: 'inherit' });

                    case 22:
                        cloneResult = _context3.sent;

                        if (!(cloneResult.status != 0 || cloneResult.error)) {
                            _context3.next = 31;
                            break;
                        }

                        console.log(_chalk2.default.redBright(cloneResult.error));
                        console.log(_chalk2.default.redBright('安装失败，请检查改app是否已经发布在npm上！'));

                        if (!noExit) {
                            _context3.next = 30;
                            break;
                        }

                        return _context3.abrupt('return');

                    case 30:
                        return _context3.abrupt('return', process.exit());

                    case 31:
                        _context3.next = 33;
                        return (0, _utils.copyFile)('' + path, ['./node_modules/' + cloneApp + '/**', '!./node_modules/' + cloneApp + '/package.json', '!./node_modules/' + cloneApp + '/README.md', '!./node_modules/' + cloneApp + '/node_modules']);

                    case 33:
                        res3 = _context3.sent;

                        console.log(_chalk2.default.greenBright('复制文件成功！！！'));
                        console.log('修改app/index中的name...');
                        _context3.next = 38;
                        return (0, _utils.editAppName)(path, cloneApp);

                    case 38:
                        editNameRes = _context3.sent;

                        if (editNameRes) {
                            console.log(_chalk2.default.greenBright('修改app.name成功！'));
                        }
                        _context3.next = 42;
                        return (0, _utils.editmock)(path);

                    case 42:
                        editmockRes = _context3.sent;

                        if (editmockRes) {
                            console.log(_chalk2.default.greenBright('修改mock.js成功！'));
                        }
                        _context3.next = 46;
                        return (0, _utils.editstyle)(path);

                    case 46:
                        editstyleres = _context3.sent;

                        if (editstyleres) {
                            console.log(_chalk2.default.greenBright('修改app.less成功！'));
                        }
                        console.log('修改根目录下的index.js文件。');
                        _context3.next = 51;
                        return (0, _edit2.default)(path);

                    case 51:
                        editResult = _context3.sent;
                        _context3.next = 54;
                        return (0, _utils.readDir)('./' + path + '/apps');

                    case 54:
                        apps = _context3.sent;
                        i = 0;

                    case 56:
                        if (!(i < apps.length)) {
                            _context3.next = 65;
                            break;
                        }

                        appItemPath = apps[i];

                        console.log(path + '/apps/' + appItemPath);
                        _context3.next = 61;
                        return JoinApp(path + '/apps/' + appItemPath);

                    case 61:
                        res = _context3.sent;

                    case 62:
                        i++;
                        _context3.next = 56;
                        break;

                    case 65:
                        console.log(_chalk2.default.greenBright('完成'));

                        if (!(noExit === true)) {
                            _context3.next = 68;
                            break;
                        }

                        return _context3.abrupt('return', true);

                    case 68:
                        return _context3.abrupt('return', process.exit());

                    case 69:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function clone(_x4, _x5, _x6) {
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

var _through = require('through2');

var _through2 = _interopRequireDefault(_through);

var _utils = require('../utils');

var _edit = require('./edit');

var _edit2 = _interopRequireDefault(_edit);

var _isExistApp = require('./isExistApp');

var _isExistApp2 = _interopRequireDefault(_isExistApp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var join = _path2.default.join,
    basename = _path2.default.basename;
exports.default = clone;
module.exports = exports['default'];