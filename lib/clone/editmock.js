'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = function (path) {
    return new _promise2.default(function (resolve, reject) {
        _fs2.default.readFile('./mock.js', function (err, data) {
            if (err) {
                console.log(_chalk2.default.redBright('没有发现./mock.js'));
            }
            var str = data.toString();
            var resultStr = str + ('\nimport \'./' + path + '/mock.js\';\n');
            _fs2.default.createWriteStream('./mock.js').write(resultStr, 'utf8', function (err) {
                if (err) {
                    resolve(false);
                    console.log(_chalk2.default.redBright('修改./mock.js失败'));
                    return;
                }
                resolve(true);
            });
        });
    });
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];