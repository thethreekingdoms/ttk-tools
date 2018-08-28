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

var resetModule = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(path) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function resetModule(_x) {
        return _ref.apply(this, arguments);
    };
}();

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _utils = require('../utils');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function edit(pathArr) {
    return new _promise2.default(function (resolve, reject) {
        var arrForm = [];
        var arrInsert = [];
        pathArr.forEach(function (path) {
            var namearr = path.split('/');
            var name = namearr[namearr.length - 1];
            var nameStr = name.replace(/-/g, '_');
            arrForm.push('import ' + nameStr + ' from  \'' + path + '\'');
            arrInsert.push('[' + nameStr + '.name]: ' + nameStr + ',');
        });
        _fs2.default.readFile('./index.js', function (err, data) {
            var str = data.toString();
            var index = str.replace(/\/\/note-start[\s\S]*\/\/note-end/g, function (a) {
                var str = '//note-start\n//note-start\u548Cnote-end\u4E4B\u95F4\u7684\u5185\u5BB9\u7528\u811A\u624B\u67B6\u5339\u914D\uFF0C\u8BF7\u4E0D\u8981\u518D\u8BE5\u533A\u57DF\u4E66\u5199\u5185\u5BB9\uFF0C\u5728\u6267\u884Cttk reset\u8FC7\u7A0B\u4E2D\u4F1A\u88AB\u5220\u9664\n' + arrForm.join('\n') + '\n\nconst apps = {\n    ' + arrInsert.join('\n    ') + '\n}\n//note-end';
                return str;
            });
            _fs2.default.createWriteStream('./index.js').write(index, 'utf8', function (err) {
                resolve();
            });
        });
    });
}

function editMock(pathArr) {
    return new _promise2.default(function (resolve, reject) {
        var arrForm = [];
        pathArr.forEach(function (path) {
            var namearr = path.split('/');
            var name = namearr[namearr.length - 1];
            var nameStr = name.replace(/-/g, '_');
            if (_fs2.default.existsSync(path + '/mock.js')) {
                arrForm.push('import \'' + path + '/mock.js\';');
            }
        });
        _fs2.default.readFile('./mock.js', function (err, data) {
            var str = data.toString();
            var index = str.replace(/\/\/note-start[\s\S]*\/\/note-end/g, function (a) {
                var str = '//note-start\n//note-start\u548Cnote-end\u4E4B\u95F4\u7684\u5185\u5BB9\u7528\u811A\u624B\u67B6\u5339\u914D\uFF0C\u8BF7\u4E0D\u8981\u518D\u8BE5\u533A\u57DF\u4E66\u5199\u5185\u5BB9\uFF0C\u5728\u6267\u884Cttk reset\u8FC7\u7A0B\u4E2D\u4F1A\u88AB\u5220\u9664\n' + arrForm.join('\n') + '\n//note-end';
                return str;
            });
            _fs2.default.createWriteStream('./mock.js').write(index, 'utf8', function (err) {
                resolve();
            });
        });
    });
}

function editStyle(pathArr) {
    return new _promise2.default(function (resolve, reject) {
        var arrForm = [];
        pathArr.forEach(function (path) {
            var namearr = path.split('/');
            var name = namearr[namearr.length - 1];
            var nameStr = name.replace(/-/g, '_');
            if (_fs2.default.existsSync(path + '/style.less')) {
                arrForm.push('@import \'../.' + path + '/style.less\';');
            }
        });
        _fs2.default.readFile('./assets/styles/apps.less', function (err, data) {
            var str = data.toString();
            var index = str.replace(/\/\/note-start[\s\S]*\/\/note-end/g, function (a) {
                var str = '//note-start\n//note-start\u548Cnote-end\u4E4B\u95F4\u7684\u5185\u5BB9\u7528\u811A\u624B\u67B6\u5339\u914D\uFF0C\u8BF7\u4E0D\u8981\u518D\u8BE5\u533A\u57DF\u4E66\u5199\u5185\u5BB9\uFF0C\u5728\u6267\u884Cttk reset\u8FC7\u7A0B\u4E2D\u4F1A\u88AB\u5220\u9664\n' + arrForm.join('\n') + '\n//note-end';
                return str;
            });
            _fs2.default.createWriteStream('./assets/styles/apps.less').write(index, 'utf8', function (err) {
                resolve();
            });
        });
    });
}

exports.default = resetModule;
module.exports = exports['default'];