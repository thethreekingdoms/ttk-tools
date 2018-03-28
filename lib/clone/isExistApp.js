'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = function (app) {
    return new _promise2.default(function (resolve, reject) {
        _fs2.default.readFile('./index.js', function (err, data) {
            if (err) {
                console.log(_chalk2.default.redBright(err));
                reject();
            }
            var str = data.toString();
            if (str.includes(app)) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];