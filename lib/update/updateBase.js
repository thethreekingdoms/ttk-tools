'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var updateBase = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var ans, updateApp, delPackage, cloneResult, res3;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _utils.prompt)('更新基础模块会修改除apps之外的所有内容，你确定要执行此操作吗 Y/N？ ');

                    case 2:
                        ans = _context.sent;

                        if (!(ans && ans.toUpperCase() != 'Y')) {
                            _context.next = 5;
                            break;
                        }

                        return _context.abrupt('return', process.exit());

                    case 5:
                        updateApp = 'ttk-app-core';
                        _context.next = 8;
                        return (0, _utils.deleteSingleFile)('./package.json');

                    case 8:
                        delPackage = _context.sent;
                        _context.next = 11;
                        return _crossSpawn2.default.sync('yarn', ['add', updateApp + '@latest'], { cwd: join(process.cwd()), stdio: 'inherit' });

                    case 11:
                        cloneResult = _context.sent;

                        console.log(cloneResult);

                        if (!(cloneResult.error || cloneResult.status != 0)) {
                            _context.next = 17;
                            break;
                        }

                        console.log(_chalk2.default.redBright(cloneResult.error));
                        console.log(_chalk2.default.redBright('安装失败，请检查改app是否已经发布在npm上！'));
                        return _context.abrupt('return', process.exit());

                    case 17:
                        _context.next = 19;
                        return (0, _utils.copyFile)('', ['./node_modules/' + updateApp + '/**', '!./node_modules/' + updateApp + '/node_modules', '!./node_modules/' + updateApp + '/index.js', '!./node_modules/' + updateApp + '/mock.js', '!./node_modules/' + updateApp + '/config.js', '!./node_modules/' + updateApp + '/assets/styles/apps.less']);

                    case 19:
                        res3 = _context.sent;

                        console.log(_chalk2.default.greenBright('核心模块升级成功！！！'));
                        return _context.abrupt('return', process.exit());

                    case 22:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function updateBase() {
        return _ref.apply(this, arguments);
    };
}();

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _crossSpawn = require('cross-spawn');

var _crossSpawn2 = _interopRequireDefault(_crossSpawn);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import editAppName from '../clone/editAppName'

var join = _path2.default.join,
    basename = _path2.default.basename;
exports.default = updateBase;
module.exports = exports['default'];