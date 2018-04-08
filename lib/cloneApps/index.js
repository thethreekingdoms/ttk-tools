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
                        console.log(apps);
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context.prev = 4;
                        _iterator = (0, _getIterator3.default)(apps);

                    case 6:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context.next = 16;
                            break;
                        }

                        i = _step.value;

                        console.log(i);

                        if (!(typeof i == 'string')) {
                            _context.next = 13;
                            break;
                        }

                        console.log(_chalk2.default.greenBright('\u6B63\u5728\u514B\u9686' + i));
                        _context.next = 13;
                        return (0, _clone2.default)(i, path + '/' + i, true);

                    case 13:
                        _iteratorNormalCompletion = true;
                        _context.next = 6;
                        break;

                    case 16:
                        _context.next = 22;
                        break;

                    case 18:
                        _context.prev = 18;
                        _context.t0 = _context['catch'](4);
                        _didIteratorError = true;
                        _iteratorError = _context.t0;

                    case 22:
                        _context.prev = 22;
                        _context.prev = 23;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 25:
                        _context.prev = 25;

                        if (!_didIteratorError) {
                            _context.next = 28;
                            break;
                        }

                        throw _iteratorError;

                    case 28:
                        return _context.finish(25);

                    case 29:
                        return _context.finish(22);

                    case 30:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[4, 18, 22, 30], [23,, 25, 29]]);
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