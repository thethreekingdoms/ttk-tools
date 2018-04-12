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

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var init = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _ref2, data, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, i;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return getApps();

                    case 2:
                        _ref2 = _context.sent;
                        data = _ref2.data;
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context.prev = 7;
                        _iterator = (0, _getIterator3.default)(apps);

                    case 9:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context.next = 18;
                            break;
                        }

                        i = _step.value;

                        if (!(typeof i == 'string')) {
                            _context.next = 15;
                            break;
                        }

                        console.log(_chalk2.default.greenBright('\u6B63\u5728\u514B\u9686' + i));
                        _context.next = 15;
                        return (0, _clone2.default)(i, path + '/' + i, true);

                    case 15:
                        _iteratorNormalCompletion = true;
                        _context.next = 9;
                        break;

                    case 18:
                        _context.next = 24;
                        break;

                    case 20:
                        _context.prev = 20;
                        _context.t0 = _context['catch'](7);
                        _didIteratorError = true;
                        _iteratorError = _context.t0;

                    case 24:
                        _context.prev = 24;
                        _context.prev = 25;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 27:
                        _context.prev = 27;

                        if (!_didIteratorError) {
                            _context.next = 30;
                            break;
                        }

                        throw _iteratorError;

                    case 30:
                        return _context.finish(27);

                    case 31:
                        return _context.finish(24);

                    case 32:
                        process.exit();

                    case 33:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[7, 20, 24, 32], [25,, 27, 31]]);
    }));

    return function init() {
        return _ref.apply(this, arguments);
    };
}();

var _clone = require('../clone');

var _clone2 = _interopRequireDefault(_clone);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = 'apps/edf';
function getApps() {
    return new _promise2.default(function (resolve, reject) {
        (0, _request2.default)('https://thethreekingdoms.github.io/demo.json', function (error, response, body) {
            resolve(JSON.parse(body));
        });
    });
}

exports.default = init;
module.exports = exports['default'];