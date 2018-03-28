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
        var nameStr = name.replace(/-/g, '_');
        _fs2.default.readFile('./index.js', function (err, data) {
            var str = data.toString();
            var index = str.replace(/const.*app.*=.*{/g, function (a) {
                var str = 'import ' + nameStr + ' from \'./' + path + '\' \n' + a + '\n    [' + nameStr + '.name]: ' + nameStr + ',';
                return str;
            });
            _fs2.default.createWriteStream('./index.js').write(index, 'utf8', function (err) {
                resolve();
            });
        });
    });
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];