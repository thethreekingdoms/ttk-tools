'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.replacePreName = exports.confirmYN = exports.inputYN = exports.getInput = exports.checkYarn = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var checkYarn = exports.checkYarn = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var flag, resolved, cloneResult;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        flag = false;

                        try {
                            resolved = _which2.default.sync('yarn');

                            console.log(resolved);
                            if (resolved) {
                                flag = true;
                            }
                        } catch (err) {
                            console.log(err);
                        }

                        if (flag) {
                            _context.next = 11;
                            break;
                        }

                        console.log(_chalk2.default.yellowBright('检测到你没有安装yarn!'));
                        console.log(_chalk2.default.greenBright('安装yarn!'));
                        _context.next = 7;
                        return _crossSpawn2.default.sync('npm', ['install', 'yarn', '-g'], { cwd: join(process.cwd()), stdio: 'inherit' });

                    case 7:
                        cloneResult = _context.sent;

                        if (cloneResult.status != 0 || cloneResult.error) {
                            console.log(_chalk2.default.redBright(cloneResult.error));
                        }
                        console.log(_chalk2.default.greenBright('安装yarn成功'));
                        return _context.abrupt('return', true);

                    case 11:
                        return _context.abrupt('return', true);

                    case 12:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function checkYarn() {
        return _ref.apply(this, arguments);
    };
}();

var getInput = exports.getInput = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(warn) {
        var res;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        if (!true) {
                            _context2.next = 9;
                            break;
                        }

                        _context2.next = 3;
                        return prompt(warn);

                    case 3:
                        res = _context2.sent;

                        if (!res) {
                            console.log(_chalk2.default.yellowBright('你的输入为空!'));
                        }

                        if (!res) {
                            _context2.next = 7;
                            break;
                        }

                        return _context2.abrupt('return', res);

                    case 7:
                        _context2.next = 0;
                        break;

                    case 9:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function getInput(_x) {
        return _ref2.apply(this, arguments);
    };
}();

var inputYN = exports.inputYN = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        var res;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        if (!true) {
                            _context3.next = 12;
                            break;
                        }

                        _context3.next = 3;
                        return getInput('是否需要安装依赖(Y/N)?');

                    case 3:
                        res = _context3.sent;

                        if (!(res && res.toUpperCase() == 'YES' || res && res.toUpperCase() == 'Y')) {
                            _context3.next = 8;
                            break;
                        }

                        return _context3.abrupt('return', true);

                    case 8:
                        if (!(res && res.toUpperCase() == 'NO' || res && res.toUpperCase() == 'N')) {
                            _context3.next = 10;
                            break;
                        }

                        return _context3.abrupt('return', false);

                    case 10:
                        _context3.next = 0;
                        break;

                    case 12:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function inputYN() {
        return _ref3.apply(this, arguments);
    };
}();

var confirmYN = exports.confirmYN = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(message) {
        var res;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        if (!true) {
                            _context4.next = 12;
                            break;
                        }

                        _context4.next = 3;
                        return getInput(message);

                    case 3:
                        res = _context4.sent;

                        if (!(res && res.toUpperCase() == 'YES' || res && res.toUpperCase() == 'Y')) {
                            _context4.next = 8;
                            break;
                        }

                        return _context4.abrupt('return', true);

                    case 8:
                        if (!(res && res.toUpperCase() == 'NO' || res && res.toUpperCase() == 'N')) {
                            _context4.next = 10;
                            break;
                        }

                        return _context4.abrupt('return', false);

                    case 10:
                        _context4.next = 0;
                        break;

                    case 12:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));

    return function confirmYN(_x2) {
        return _ref4.apply(this, arguments);
    };
}();

var replacePreName = exports.replacePreName = function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(path, preName) {
        var arr, name;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        arr = path.split('/');
                        name = arr[arr.length - 1];

                        if (!(name == preName || !name || !preName)) {
                            _context5.next = 4;
                            break;
                        }

                        return _context5.abrupt('return');

                    case 4:
                        _context5.next = 6;
                        return editAppStyle(path, name, preName);

                    case 6:
                        _context5.next = 8;
                        return editAppData(path, name, preName);

                    case 8:
                        return _context5.abrupt('return');

                    case 9:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function replacePreName(_x3, _x4) {
        return _ref5.apply(this, arguments);
    };
}();

exports.CMD = CMD;
exports.copyFile = copyFile;
exports.mkdir = mkdir;
exports.rename = rename;
exports.deleteFile = deleteFile;
exports.deleteSingleFile = deleteSingleFile;
exports.haveFile = haveFile;
exports.prompt = prompt;
exports.readDir = readDir;
exports.edit = edit;
exports.createPackageFile = createPackageFile;
exports.editAppName = editAppName;
exports.editmock = editmock;
exports.editstyle = editstyle;
exports.getAllAppPath = getAllAppPath;
exports.getOwnAllAppPath = getOwnAllAppPath;

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

var _constants = require('constants');

var _which = require('which');

var _which2 = _interopRequireDefault(_which);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var join = _path2.default.join,
    basename = _path2.default.basename;
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

function deleteSingleFile(path) {
    _fs2.default.unlinkSync(path);
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

function createPackageFile(app) {
    return new _promise2.default(function (resolve, reject) {
        _fs2.default.createWriteStream('./' + app + '/package.json').write('{\n    "name": "' + app + '",\n    "version": "1.0.0",\n    "main": "index.js",\n    "license": "MIT"\n}\n', 'utf-8', function (err) {
            resolve(true);
        });
    });
}

function editAppName(path, preName) {
    return new _promise2.default(function (resolve, reject) {
        var namearr = path.split('/');
        var name = namearr[namearr.length - 1];
        var nameStr = name;
        if (!_fs2.default.existsSync('./' + path + '/index.js')) {
            console.log(_chalk2.default.yellowBright('./' + path + '/index.js \u6587\u4EF6\u4E0D\u5B58\u5728\uFF01'));
            return resolve(true);
        }
        _fs2.default.readFile('./' + path + '/index.js', function (err, data) {
            if (!data) {
                return resolve(true);
            }
            var str = data.toString();
            var editStr = str.replace(/name:.*,/, function (a) {
                console.log(a);
                return 'name: \'' + nameStr + '\',';
            });
            if (preName) {
                var rex = new RegExp(preName, 'g');
                editStr = editStr.replace(rex, nameStr);
            }
            _fs2.default.createWriteStream('./' + path + '/index.js').write(editStr, 'utf8', function (err) {
                resolve(true);
            });
        });
    });
}

function editmock(path) {
    return new _promise2.default(function (resolve, reject) {
        if (!_fs2.default.existsSync('./' + path + '/mock.js')) {
            console.log(_chalk2.default.yellowBright('./' + path + '/mock.js \u6587\u4EF6\u4E0D\u5B58\u5728\uFF01'));
            return resolve(true);
        }
        _fs2.default.readFile('./mock.js', function (err, data) {
            if (err) {
                console.log(_chalk2.default.redBright('没有发现./mock.js'));
                resolve(true);
                return;
            }
            var str = data.toString();
            var resultStr = void 0;
            if (str.includes('//note-end')) {
                resultStr = str.replace(/\/\/note-end/, 'import \'./' + path + '/mock.js\';\n//note-end\n');
            } else {
                resultStr = str + ('\nimport \'./' + path + '/mock.js\';');
            }

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
        if (!_fs2.default.existsSync('./' + path + '/style.less')) {
            console.log(_chalk2.default.yellowBright('./' + path + '/style.less \u6587\u4EF6\u4E0D\u5B58\u5728\uFF01'));
            return resolve(true);
        }
        _fs2.default.readFile('./assets/styles/apps.less', function (err, data) {
            if (err) {
                console.log(_chalk2.default.redBright('没有发现./assets/styles/apps.less'));
            }
            var str = data.toString();
            var resultStr = void 0;
            if (str.includes('//note-end')) {
                resultStr = str.replace(/\/\/note-end/, '\n@import \'../../' + path + '/style.less\';\n//note-end');
            } else {
                resultStr = str + ('\n@import \'../../' + path + '/style.less\';');
            }
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

function getAppPath(path, arr) {
    var res = _fs2.default.readdirSync(path);
    if (res.includes('index.js') && res.includes('data.js')) {
        arr.push(path);
    }
    res.forEach(function (item) {
        var currentPath = path + '/' + item;
        if (_fs2.default.statSync(currentPath).isDirectory()) {
            getAppPath(currentPath, arr);
        }
    });
}

function getOwnAppPath(path, arr) {
    var res = _fs2.default.readdirSync(path);
    if (res.includes('index.js') && res.includes('data.js')) {
        arr.push(path);
    }
    res.forEach(function (item) {
        var currentPath = '' + item;
        if (_fs2.default.statSync(currentPath).isDirectory()) {
            getAppPath(currentPath, arr);
        }
    });
}

function getAllAppPath(path) {
    var arr = [];
    getAppPath(path, arr);
    return arr;
}

function getOwnAllAppPath(path) {
    var arr = [];
    getOwnAppPath(path, arr);
    return arr;
}

function editAppStyle(path, name, preName) {
    return new _promise2.default(function (resolve, reject) {
        _fs2.default.readFile('./' + path + '/style.less', function (err, data) {
            if (err) {
                console.log(_chalk2.default.redBright('没有发现./assets/styles/apps.less'));
            }
            var rex = new RegExp(preName, 'g');
            var str = data.toString();
            var resultStr = str.replace(rex, name);
            _fs2.default.createWriteStream('./' + path + '/style.less').write(resultStr, 'utf8', function (err) {
                if (err) {
                    resolve(false);
                    console.log(_chalk2.default.redBright('\u4FEE\u6539./' + path + '/style.less\u5931\u8D25'));
                }
                resolve(true);
            });
        });
    });
}

function editAppData(path, name, preName) {
    return new _promise2.default(function (resolve, reject) {
        _fs2.default.readFile('./' + path + '/data.js', function (err, data) {
            if (err) {
                console.log(_chalk2.default.redBright('\u6CA1\u6709\u53D1\u73B0./' + path + '/data.js'));
            }
            var rex = new RegExp(preName, 'g');
            var str = data.toString();
            var resultStr = str.replace(rex, name);
            _fs2.default.createWriteStream('./' + path + '/data.js').write(resultStr, 'utf8', function (err) {
                if (err) {
                    resolve(false);
                    console.log(_chalk2.default.redBright('\u4FEE\u6539./' + path + '/data.js\u5931\u8D25'));
                }
                resolve(true);
            });
        });
    });
}