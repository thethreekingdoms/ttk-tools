'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = function (path) {
    return new _promise2.default(function (resolve, reject) {
        var namearr = path.split('/');
        var name = namearr[namearr.length - 1];
        var nameStr = name;
        _fs2.default.readFile('./' + path + '/index.js', function (err, data) {
            var str = data.toString();
            var editStr = str.replace(/name:.*,/, function (a) {
                console.log(a);
                return 'name: \'' + nameStr + '\',';
            });
            _fs2.default.createWriteStream('./' + path + '/index.js').write(editStr, 'utf8', function (err) {
                resolve(true);
            });
        });
    });
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];