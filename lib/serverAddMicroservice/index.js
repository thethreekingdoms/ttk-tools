'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var serverAddMicroservice = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(businessName, moduleName) {
        var temppath, path;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _utils.checkYarn)();

                    case 2:
                        if (!(typeof businessName != 'string')) {
                            _context.next = 6;
                            break;
                        }

                        _context.next = 5;
                        return (0, _utils.getInput)('请输入业务线的名称(英文，首字母小写)：');

                    case 5:
                        businessName = _context.sent;

                    case 6:
                        if (!(typeof moduleName != 'string')) {
                            _context.next = 10;
                            break;
                        }

                        _context.next = 9;
                        return (0, _utils.getInput)('请输入模块名称(英文，首字母小写)：');

                    case 9:
                        moduleName = _context.sent;

                    case 10:
                        console.log('检查该微服务是否已经存在...');
                        temppath = process.cwd();
                        path = temppath + '/src/' + businessName + '/service/' + businessName + '-' + moduleName;

                        if (!(fs.existsSync(path) === true)) {
                            _context.next = 16;
                            break;
                        }

                        console.log(_chalk2.default.redBright('由于目录' + path + '已经存在，请删除后或者修改微服务名称后重新运行。'));
                        return _context.abrupt('return', true);

                    case 16:
                        console.log('开始创建微服务');
                        (0, _serverUtils.addServiceFromTemplate)(businessName, moduleName);

                    case 18:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function serverAddMicroservice(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _serverUtils = require('../serverUtils');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');

exports.default = serverAddMicroservice;
module.exports = exports['default'];