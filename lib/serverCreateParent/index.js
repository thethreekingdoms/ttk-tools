'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var serverCreateParent = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(projectName) {
        var res, createPackageJson, res2, res3;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        console.log('开始创建');

                        if (!(typeof projectName != 'string')) {
                            _context.next = 6;
                            break;
                        }

                        _context.next = 4;
                        return (0, _utils.getInput)('请输入项目存放目录名称：');

                    case 4:
                        projectName = _context.sent;

                        console.log(projectName);

                    case 6:
                        _context.next = 8;
                        return (0, _utils.mkdir)(projectName);

                    case 8:
                        res = _context.sent;

                        console.log(_chalk2.default.greenBright('创建项目文件夹'));
                        if (res) {
                            _chalk2.default.redBright('创建文件夹失败');
                            process.exit();
                        }
                        _context.next = 13;
                        return (0, _utils.checkYarn)();

                    case 13:
                        console.log(_chalk2.default.gray('下载中..........'));
                        _context.next = 16;
                        return (0, _utils.createPackageFile)(projectName);

                    case 16:
                        createPackageJson = _context.sent;
                        _context.next = 19;
                        return _crossSpawn2.default.sync('yarn', ['add', installPackge], { cwd: join(process.cwd(), projectName), stdio: 'inherit' });

                    case 19:
                        res2 = _context.sent;

                        console.log('res2', res2.error);
                        if (res2.error || res2.status != 0) {
                            console.log(_chalk2.default.redBright(res2.error));
                            console.log(_chalk2.default.redBright('下载失败！'));
                            process.exit();
                        }
                        _context.next = 24;
                        return (0, _utils.copyFile)(projectName, ['./' + projectName + '/node_modules/' + installPackge + '/**', './' + projectName + '/node_modules/' + installPackge + '/.*', './' + projectName + '/node_modules/' + installPackge + '/.*/**', '!./' + projectName + '/node_modules/' + installPackge + '/node_modules']);

                    case 24:
                        res3 = _context.sent;

                        console.log(_chalk2.default.greenBright('成功创建项目'));

                    case 26:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function serverCreateParent(_x) {
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

var _through = require('through2');

var _through2 = _interopRequireDefault(_through);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var join = _path2.default.join,
    basename = _path2.default.basename;

var installPackge = 'ttk-server-parent';

exports.default = serverCreateParent;
module.exports = exports['default'];