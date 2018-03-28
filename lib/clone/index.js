'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var clone = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(cloneApp, path, name) {
        var cloneResult, res3, editNameRes, editmockRes, editstyleres, editResult;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        console.log('检查该路径下是否已经存在app...');
                        _context2.next = 3;
                        return checkPath(path);

                    case 3:
                        path = _context2.sent;

                        console.log(path);
                        // console.log(haveFileResult)

                        // if( haveFileResult ){
                        //     console.log(chalk.yellowBright('项目中已经存在该路径！'))
                        //     path = await prompt('请输入新的路径：')
                        // }
                        _context2.next = 7;
                        return _crossSpawn2.default.sync('npm', ['install', cloneApp], { cwd: join(process.cwd()), stdio: 'inherit' });

                    case 7:
                        cloneResult = _context2.sent;

                        if (cloneResult.error) {
                            console.log(_chalk2.default.redBright(cloneResult.error));
                        }

                        _context2.next = 11;
                        return (0, _utils.copyFile)('' + path, ['./node_modules/' + cloneApp + '/**', '!./node_modules/' + cloneApp + '/node_modules']);

                    case 11:
                        res3 = _context2.sent;

                        console.log(_chalk2.default.greenBright('复制文件成功！！！'));
                        console.log('修改app/index中的name...');
                        _context2.next = 16;
                        return (0, _editAppName2.default)(path);

                    case 16:
                        editNameRes = _context2.sent;

                        if (editNameRes) {
                            console.log(_chalk2.default.greenBright('修改app.name成功！'));
                        }
                        _context2.next = 20;
                        return (0, _editmock2.default)(path);

                    case 20:
                        editmockRes = _context2.sent;

                        if (editmockRes) {
                            console.log(_chalk2.default.greenBright('修改mock.js成功！'));
                        }
                        _context2.next = 24;
                        return (0, _editstyle2.default)(path);

                    case 24:
                        editstyleres = _context2.sent;

                        if (editstyleres) {
                            console.log(_chalk2.default.greenBright('修改app.less成功！'));
                        }
                        console.log('修改根目录下的index.js文件。');
                        _context2.next = 29;
                        return (0, _edit2.default)(path);

                    case 29:
                        editResult = _context2.sent;

                        process.exit();

                    case 31:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function clone(_x2, _x3, _x4) {
        return _ref2.apply(this, arguments);
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

var _editAppName = require('./editAppName');

var _editAppName2 = _interopRequireDefault(_editAppName);

var _editmock = require('./editmock');

var _editmock2 = _interopRequireDefault(_editmock);

var _editstyle = require('./editstyle');

var _editstyle2 = _interopRequireDefault(_editstyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var join = _path2.default.join,
    basename = _path2.default.basename;
exports.default = clone;
module.exports = exports['default'];