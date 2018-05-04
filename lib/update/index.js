'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var update = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(updateApp, path) {
        var haveFileRes, cloneResult, deleteFileRes, res3, editNameRes;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _utils.checkYarn)();

                    case 2:
                        if (!(updateApp == 'ttk-app-core')) {
                            _context.next = 4;
                            break;
                        }

                        return _context.abrupt('return', (0, _updateBase2.default)());

                    case 4:
                        _context.next = 6;
                        return (0, _utils.haveFile)(path);

                    case 6:
                        haveFileRes = _context.sent;

                        if (haveFileRes) {
                            _context.next = 10;
                            break;
                        }

                        console.log(_chalk2.default.redBright('该路径下不存在文件，无法更新！'));
                        return _context.abrupt('return', process.exit());

                    case 10:
                        console.log(_chalk2.default.greenBright('下载更新包！'));
                        _context.next = 13;
                        return _crossSpawn2.default.sync('yarn', ['upgrade', updateApp], { cwd: join(process.cwd()), stdio: 'inherit' });

                    case 13:
                        cloneResult = _context.sent;
                        _context.next = 16;
                        return (0, _utils.deleteFile)('./' + path);

                    case 16:
                        deleteFileRes = _context.sent;

                        if (!(cloneResult.error || cloneResult.status != 0)) {
                            _context.next = 21;
                            break;
                        }

                        console.log(_chalk2.default.redBright(cloneResult.error));
                        console.log(_chalk2.default.redBright('安装失败，请检查改app是否已经发布在npm上！'));
                        return _context.abrupt('return', process.exit());

                    case 21:
                        _context.next = 23;
                        return (0, _utils.copyFile)('' + path, ['./node_modules/' + updateApp + '/**', '!./node_modules/' + updateApp + '/package.json', '!./node_modules/' + updateApp + '/README.md', '!./node_modules/' + updateApp + '/node_modules']);

                    case 23:
                        res3 = _context.sent;

                        console.log(_chalk2.default.greenBright('复制文件成功！！！'));
                        console.log('修改app/index中的name...');
                        _context.next = 28;
                        return (0, _utils.editAppName)(path, updateApp);

                    case 28:
                        editNameRes = _context.sent;

                        if (editNameRes) {
                            console.log(_chalk2.default.greenBright('修改app.name成功！'));
                        }

                    case 30:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function update(_x, _x2) {
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

var _updateBase = require('./updateBase');

var _updateBase2 = _interopRequireDefault(_updateBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import editAppName from '../clone/editAppName'

var join = _path2.default.join,
    basename = _path2.default.basename;
exports.default = update;
module.exports = exports['default'];