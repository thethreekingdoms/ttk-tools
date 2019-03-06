'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var rewrite = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(path) {
        var processPath, pathNor, res, writeIndexRes, writeStyleRes;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        processPath = process.cwd(), pathNor = void 0;


                        pathNor = processPath.indexOf('/') != -1 ? processPath.split('/') : processPath.split('\\');
                        if (typeof path != 'string') {
                            path = '../' + pathNor[pathNor.length - 1];
                        }
                        res = (0, _utils.getOwnAllAppPath)(path);
                        _context.next = 6;
                        return writeIndex(res, pathNor);

                    case 6:
                        writeIndexRes = _context.sent;
                        _context.next = 9;
                        return writeStyle(res);

                    case 9:
                        writeStyleRes = _context.sent;

                    case 10:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function rewrite(_x) {
        return _ref.apply(this, arguments);
    };
}();

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _utils = require('../utils');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function writeIndex(pathArr, pathNor) {
    return new _promise2.default(function (resolve, reject) {
        var arrForm = [];
        var arrInsert = [];
        pathArr.forEach(function (path) {
            var namearr = path.split('/');
            var name = namearr[namearr.length - 1];
            var nameStr = name.replace(/-/g, '_');
            arrForm.push('import ' + nameStr + ' from  \'./' + path + '\'');
            arrInsert.push('[' + nameStr + '.name]: ' + nameStr + ',');
        });

        var strForm = transArrToStr(arrForm),
            strInsert = transArrToStr1(arrInsert),
            strExport = 'window.publicModule && window.publicModule.callback(obj,' + ' ' + '"' + pathNor[pathNor.length - 1] + '"' + ');' + '\n',
            strFun = 'export default obj;',
            strs = void 0;

        strs = strForm + '\n' + 'const obj={' + strInsert + '}' + '\n\n' + strExport + '\n' + strFun;

        _fs2.default.writeFile('./index.js', strs, function (err) {
            resolve();
        });
    });
}

function writeStyle(pathArr) {
    return new _promise2.default(function (resolve, reject) {
        var arrForm = [];
        pathArr.forEach(function (path) {
            var namearr = path.split('/');
            var name = namearr[namearr.length - 1];
            var nameStr = name.replace(/-/g, '_');
            if (_fs2.default.existsSync(path + '/style.less')) {
                arrForm.push('@import \'./' + path + '/style.less\';');
            }
        });
        var arrForm1 = transArrToStr(arrForm);
        _fs2.default.writeFile('./index.less', arrForm1, function (err) {
            resolve();
        });
    });
}

function transArrToStr(arr) {
    var str = void 0;
    arr.map(function (o) {
        if (!str) {
            str = o + '\n';
        } else {
            str += o + '\n';
        }
    });
    return str;
}
function transArrToStr1(arr) {
    var str = void 0;
    arr.map(function (o) {
        if (!str) {
            str = '\n' + '    ' + o + '\n';
        } else {
            str += '    ' + o + '\n';
        }
    });
    return str;
}

exports.default = rewrite;
module.exports = exports['default'];