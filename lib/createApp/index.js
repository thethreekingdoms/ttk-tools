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

var createApp = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(path) {
        var cloneResult, res3, editNameRes, editmockRes, editstyleres, editResult, delRes, releaseRes;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        if (!(typeof path != 'string')) {
                            _context2.next = 5;
                            break;
                        }

                        console.log(_chalk2.default.yellowBright('你没有输入clone到指定的路径！'));
                        _context2.next = 4;
                        return (0, _utils.getInput)('请输入路径：');

                    case 4:
                        path = _context2.sent;

                    case 5:
                        console.log('检查该路径下是否已经存在app...');
                        _context2.next = 8;
                        return checkPath(path);

                    case 8:
                        path = _context2.sent;

                        console.log(path);
                        // console.log(haveFileResult)

                        // if( haveFileResult ){
                        //     console.log(chalk.yellowBright('项目中已经存在该路径！'))
                        //     path = await prompt('请输入新的路径：')
                        // }
                        _context2.next = 12;
                        return _crossSpawn2.default.sync('npm', ['install', cloneApp], { cwd: join(process.cwd()), stdio: 'inherit' });

                    case 12:
                        cloneResult = _context2.sent;

                        if (!cloneResult.error) {
                            _context2.next = 17;
                            break;
                        }

                        console.log(_chalk2.default.redBright(cloneResult.error));
                        console.log(_chalk2.default.redBright('下载ttk-app-init-demo失败！'));
                        return _context2.abrupt('return', process.exit());

                    case 17:
                        _context2.next = 19;
                        return (0, _utils.copyFile)('' + path, ['./node_modules/' + cloneApp + '/**', '!./node_modules/' + cloneApp + '/package.json', '!./node_modules/' + cloneApp + '/README.md', '!./node_modules/' + cloneApp + '/node_modules']);

                    case 19:
                        res3 = _context2.sent;

                        console.log(_chalk2.default.greenBright('复制文件成功！！！'));
                        console.log('修改app/index中的name...');
                        _context2.next = 24;
                        return (0, _utils.editAppName)(path);

                    case 24:
                        editNameRes = _context2.sent;

                        if (editNameRes) {
                            console.log(_chalk2.default.greenBright('修改app.name成功！'));
                        }
                        _context2.next = 28;
                        return (0, _utils.editmock)(path);

                    case 28:
                        editmockRes = _context2.sent;

                        if (editmockRes) {
                            console.log(_chalk2.default.greenBright('修改mock.js成功！'));
                        }
                        _context2.next = 32;
                        return (0, _utils.editstyle)(path);

                    case 32:
                        editstyleres = _context2.sent;

                        if (editstyleres) {
                            console.log(_chalk2.default.greenBright('修改app.less成功！'));
                        }
                        console.log('修改根目录下的index.js文件。');
                        _context2.next = 37;
                        return (0, _utils.edit)(path);

                    case 37:
                        editResult = _context2.sent;


                        console.log('删除dist文件夹');
                        _context2.next = 41;
                        return (0, _utils.deleteFile)('./dist');

                    case 41:
                        delRes = _context2.sent;

                        if (!delRes) {
                            console.log(_chalk2.default.greenBright('删除成功'));
                        }
                        _context2.next = 45;
                        return _crossSpawn2.default.sync('webpack', ['--colors', '--progress', '--display-error-details', '--config', 'webpack.config.prd.js'], { cwd: join(process.cwd()), stdio: 'inherit' });

                    case 45:
                        releaseRes = _context2.sent;

                        console.log(_chalk2.default.greenBright('编译完成！'));

                        process.exit();

                    case 48:
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var join = _path2.default.join,
    basename = _path2.default.basename;

var cloneApp = 'ttk-app-init-demo';
exports.default = createApp;
module.exports = exports['default'];