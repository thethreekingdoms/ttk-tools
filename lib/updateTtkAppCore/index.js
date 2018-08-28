'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var updateTtkAppCore = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
            arg[_key] = arguments[_key];
        }

        var arr, params, res, cloneResult, res2;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        arr = ['component', 'assets', 'compatible', 'meta-engine', 'transreport', 'utils', '.gitignore', 'package.json'];
                        params = arg.filter(function (item) {
                            return typeof item == 'string' && arr.find(function (o) {
                                return o == item;
                            }) ? true : false;
                        });

                        console.log(params);
                        _context.next = 5;
                        return (0, _utils.confirmYN)('\u8BE5\u64CD\u4F5C\u4F1A\u4FEE\u6539\u9879\u76EE\u6839\u76EE\u5F55\u4E2D\u7684\nassets\u3001compatible\u3001component\u3001meta-engine\u3001transreport\u3001utils\u3001.gitignore\u3001package.json\u7B49\u6587\u4EF6\uFF0C\n\u8BF7\u95EE\u4F60\u662F\u5426\u4FEE\u6539Y/N\uFF1F ');

                    case 5:
                        res = _context.sent;

                        if (res) {
                            _context.next = 8;
                            break;
                        }

                        return _context.abrupt('return', process.exit());

                    case 8:
                        _context.next = 10;
                        return _crossSpawn2.default.sync('yarn', ['add', 'ttk-app-core@latest'], { cwd: join(process.cwd()), stdio: 'inherit' });

                    case 10:
                        cloneResult = _context.sent;

                        if (!(cloneResult.status != 0 || cloneResult.error)) {
                            _context.next = 19;
                            break;
                        }

                        console.log(_chalk2.default.redBright(cloneResult.error));
                        console.log(_chalk2.default.redBright('安装失败，请检查改app是否已经发布在npm上！'));

                        if (!noExit) {
                            _context.next = 18;
                            break;
                        }

                        return _context.abrupt('return');

                    case 18:
                        return _context.abrupt('return', process.exit());

                    case 19:
                        _context.next = 21;
                        return (0, _utils.copyFile)('./test/a', ['./node_modules/ttk-app-core/test/test.js']);

                    case 21:
                        res2 = _context.sent;

                        console.log(res2);

                    case 23:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function updateTtkAppCore() {
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
exports.default = updateTtkAppCore;
module.exports = exports['default'];