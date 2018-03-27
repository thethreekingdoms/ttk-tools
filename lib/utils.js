'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.CMD = CMD;
exports.copyFile = copyFile;
exports.mkdir = mkdir;
exports.rename = rename;
exports.deleteFile = deleteFile;

var _vinylFs = require('vinyl-fs');

var _vinylFs2 = _interopRequireDefault(_vinylFs);

var _child_process = require('child_process');

var _crossSpawn = require('cross-spawn');

var _crossSpawn2 = _interopRequireDefault(_crossSpawn);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _through = require('through2');

var _through2 = _interopRequireDefault(_through);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CMD(cmdStr, option) {
    return new _promise2.default(function (resolve, reject) {
        console.log('ttk: 操作路径=====>' + option.cwd);
        var build = void 0;
        build = (0, _child_process.exec)(cmdStr, option, function (err, stdout, stderr) {
            if (err) {
                console.log(_chalk2.default.redBright(err));
                reject(err);
            }
            console.log('ttk: ' + stdout);
            console.log('ttk: ' + stderr);
            resolve();
        });
        build.stdout.on('data', function (data) {
            console.log('ttk: ' + data);
        });
    });
}

function copyFile(projectName, path) {
    return new _promise2.default(function (resolve, reject) {
        _vinylFs2.default.src(path).pipe(_through2.default.obj(function (file, enc, cb) {
            this.push(file);
            cb();
        })).pipe(_vinylFs2.default.dest('./' + projectName)).on('end', function (err) {
            resolve();
        }).resume();
    });
}

function mkdir(name) {
    return new _promise2.default(function (resolve, reject) {
        _fs2.default.mkdir(name, function (err) {
            if (err) {
                console.log(_chalk2.default.redBright(err));
                resolve(err);
            } else {
                resolve();
            }
        });
    });
}

function rename(oldName, newName) {
    return new _promise2.default(function (resolve, reject) {
        console.log('重命名');
        _fs2.default.rename(oldName, newName, function (err) {
            console.log(err, '>>>>>>>>>>');
            if (err) {
                console.log(_chalk2.default.redBright(err));
                resolve(err);
            } else {
                resolve();
            }
        });
    });
}

function deleteFile(path) {
    return new _promise2.default(function (resolve, reject) {
        console.log('正在删除文件。。。。。');
        _fs2.default.unlink(path, function (err) {
            if (err) {
                console.log(_chalk2.default.redBright(err));
                resolve(err);
            } else {
                console.log('删除完成');
                resolve();
            }
        });
    });
}