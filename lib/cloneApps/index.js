'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var cloneApps = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(path, apps) {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, i;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context.prev = 3;
                        _iterator = (0, _getIterator3.default)(apps);

                    case 5:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context.next = 14;
                            break;
                        }

                        i = _step.value;

                        if (!(typeof i == 'string')) {
                            _context.next = 11;
                            break;
                        }

                        console.log(_chalk2.default.greenBright('\u6B63\u5728\u514B\u9686app - ' + i));
                        _context.next = 11;
                        return (0, _clone2.default)(i, path + '/' + i, true);

                    case 11:
                        _iteratorNormalCompletion = true;
                        _context.next = 5;
                        break;

                    case 14:
                        _context.next = 20;
                        break;

                    case 16:
                        _context.prev = 16;
                        _context.t0 = _context['catch'](3);
                        _didIteratorError = true;
                        _iteratorError = _context.t0;

                    case 20:
                        _context.prev = 20;
                        _context.prev = 21;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 23:
                        _context.prev = 23;

                        if (!_didIteratorError) {
                            _context.next = 26;
                            break;
                        }

                        throw _iteratorError;

                    case 26:
                        return _context.finish(23);

                    case 27:
                        return _context.finish(20);

                    case 28:
                        console.log(_chalk2.default.greenBright('全部克隆完成！！！！'));
                        process.exit();

                    case 30:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[3, 16, 20, 28], [21,, 23, 27]]);
    }));

    return function cloneApps(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var _clone = require('../clone');

var _clone2 = _interopRequireDefault(_clone);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = cloneApps;

// ttk-edf-app-portal ttk-edf-app-login ttk-edf-app-home ttk-edf-app-portal-menu

module.exports = exports['default'];