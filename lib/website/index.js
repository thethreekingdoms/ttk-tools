'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var website = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(projectName) {
        var res, res2, res3, res4;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!(typeof projectName != 'string')) {
                            _context.next = 5;
                            break;
                        }

                        _context.next = 3;
                        return (0, _utils.getInput)('请输入项目名称：');

                    case 3:
                        projectName = _context.sent;

                        console.log(projectName);

                    case 5:
                        _context.next = 7;
                        return (0, _utils.mkdir)(projectName);

                    case 7:
                        res = _context.sent;

                        console.log(_chalk2.default.greenBright('创建项目文件夹'));
                        if (res) {
                            _chalk2.default.redBright('创建文件夹失败');
                            process.exit();
                        }
                        console.log(_chalk2.default.gray('下载中..........'));
                        // const res2 =await CMD(`npm i ${installPackge}`, {cwd: join(process.cwd(), projectName)})
                        _context.next = 13;
                        return _crossSpawn2.default.sync('npm', ['install', installPackge], { cwd: join(process.cwd(), projectName), stdio: 'inherit' });

                    case 13:
                        res2 = _context.sent;

                        if (res2.error) {
                            console.log(_chalk2.default.redBright(res2.error));
                            console.log(_chalk2.default.redBright('下载失败！'));
                            process.exit();
                        }
                        _context.next = 17;
                        return (0, _utils.copyFile)(projectName, ['./' + projectName + '/node_modules/' + installPackge + '/**', './' + projectName + '/node_modules/' + installPackge + '/.*', './' + projectName + '/node_modules/' + installPackge + '/.*/**', '!./' + projectName + '/node_modules/' + installPackge + '/node_modules']);

                    case 17:
                        res3 = _context.sent;

                        console.log(_chalk2.default.greenBright('成功创建项目'));
                        console.log(_chalk2.default.gray('安装依赖 npm install....'));
                        // const res4 = await CMD('npm install', {cwd: join(process.cwd(), projectName)})
                        _context.next = 22;
                        return _crossSpawn2.default.sync('npm', ['install'], { cwd: join(process.cwd(), projectName), stdio: 'inherit' });

                    case 22:
                        res4 = _context.sent;

                        if (!res4.error) {
                            _context.next = 28;
                            break;
                        }

                        console.log(_chalk2.default.redBright(res4.error));
                        console.log(_chalk2.default.redBright('安装依赖失败， 请在项目根目录下以管理员身份运行：npm install'));
                        process.exit();
                        return _context.abrupt('return');

                    case 28:
                        console.log(_chalk2.default.yellowBright('\u5B89\u88C5\u4F9D\u8D56\u5B8C\u6210\uFF01 \n\n\u8BF7\u6267\u884C\u4EE5\u4E0B\u547D\u4EE4\n\ncd ' + projectName + ' \n\nnpm start'));
                        process.exit();

                    case 30:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function website(_x) {
        return _ref.apply(this, arguments);
    };
}();

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _utils = require('../utils');

var _crossSpawn = require('cross-spawn');

var _crossSpawn2 = _interopRequireDefault(_crossSpawn);

var _vinylFs = require('vinyl-fs');

var _vinylFs2 = _interopRequireDefault(_vinylFs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _through = require('through2');

var _through2 = _interopRequireDefault(_through);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var join = _path2.default.join,
    basename = _path2.default.basename;

var installPackge = 'ttk-app-core';
exports.default = website;
module.exports = exports['default'];