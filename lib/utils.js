'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getInput = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var getInput = exports.getInput = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(warn) {
        var res;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!true) {
                            _context.next = 9;
                            break;
                        }

                        console.log(_chalk2.default.yellowBright('你的输入为空!'));
                        _context.next = 4;
                        return prompt(warn);

                    case 4:
                        res = _context.sent;

                        if (!res) {
                            _context.next = 7;
                            break;
                        }

                        return _context.abrupt('return', res);

                    case 7:
                        _context.next = 0;
                        break;

                    case 9:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function getInput(_x) {
        return _ref.apply(this, arguments);
    };
}();

exports.CMD = CMD;
exports.copyFile = copyFile;
exports.mkdir = mkdir;
exports.rename = rename;
exports.deleteFile = deleteFile;
exports.haveFile = haveFile;
exports.prompt = prompt;
exports.readDir = readDir;
exports.edit = edit;
exports.editAppName = editAppName;
exports.editmock = editmock;
exports.editstyle = editstyle;

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

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

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
    var files = [];
    if (_fs2.default.existsSync(path)) {
        files = _fs2.default.readdirSync(path);
        files.forEach(function (file, index) {
            var curPath = path + "/" + file;
            console.log(_chalk2.default.yellowBright('\u6B63\u5728\u5220\u9664' + curPath));
            if (_fs2.default.statSync(curPath).isDirectory()) {
                // recurse
                deleteFile(curPath);
            } else {
                // delete file
                _fs2.default.unlinkSync(curPath);
            }
        });
        _fs2.default.rmdirSync(path);
    }
}

function haveFile(path) {
    return new _promise2.default(function (resolve, reject) {
        _fs2.default.stat('./' + path, function (err, stats) {
            if (stats) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}

function prompt(question) {
    return new _promise2.default(function (resolve, reject) {
        var res = _readline2.default.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        res.question(question, function (ans) {
            resolve(ans);
            res.close();
        });
    });
}

function readDir(path) {
    return new _promise2.default(function (resolve, reject) {
        _fs2.default.readdir(path, function (err, data) {
            if (err) {
                console.log(err);
                resolve([]);
            } else {
                console.log(data);
                resolve(data);
            }
        });
    });
}

function edit(path) {
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
}

function editAppName(path) {
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
}

function editmock(path) {
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
}

function editstyle(path) {
    return new _promise2.default(function (resolve, reject) {
        _fs2.default.readFile('./assets/styles/apps.less', function (err, data) {
            if (err) {
                console.log(_chalk2.default.redBright('没有发现./assets/styles/apps.less'));
            }
            var str = data.toString();
            var resultStr = str + ('\n@import \'../../' + path + '/style.less\';\n');
            _fs2.default.createWriteStream('./assets/styles/apps.less').write(resultStr, 'utf8', function (err) {
                if (err) {
                    resolve(false);
                    console.log(_chalk2.default.redBright('修改./assets/styles/apps.less失败'));
                }
                resolve(true);
            });
        });
    });
}