'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var reset = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(path) {
        var apps, i, appItemPath;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (typeof path != 'string') {
                            path = './apps';
                        }
                        console.log('正在检查当前路径' + path + '是否存在app...');

                        _context.next = 4;
                        return readDir(path);

                    case 4:
                        apps = _context.sent;

                        for (i = 0; i < apps.length; i++) {
                            appItemPath = apps[i];

                            console.log(path + '/apps/' + appItemPath);
                        }

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function reset(_x) {
        return _ref.apply(this, arguments);
    };
}();

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }