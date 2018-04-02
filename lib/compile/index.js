'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var compile = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(params) {
        var res2, releaseRes;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        console.log('删除dist文件夹');
                        _context.next = 3;
                        return (0, _utils.deleteFile)('./dist');

                    case 3:
                        res2 = _context.sent;

                        if (!res2) {
                            console.log(_chalk2.default.greenBright('删除成功'));
                        }
                        _context.next = 7;
                        return _crossSpawn2.default.sync('webpack', ['--colors', '--progress', '--display-error-details', '--config', 'webpack.config.prd.js'], { cwd: join(process.cwd()), stdio: 'inherit' });

                    case 7:
                        releaseRes = _context.sent;

                        console.log(_chalk2.default.greenBright('编译完成！'));
                        process.exit();

                    case 10:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function compile(_x) {
        return _ref.apply(this, arguments);
    };
}();

var _crossSpawn = require('cross-spawn');

var _crossSpawn2 = _interopRequireDefault(_crossSpawn);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var join = _path2.default.join;
exports.default = compile;
module.exports = exports['default'];