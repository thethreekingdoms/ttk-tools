'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _website = require('./website');

var _website2 = _interopRequireDefault(_website);

var _clone = require('./clone');

var _clone2 = _interopRequireDefault(_clone);

var _compile = require('./compile');

var _compile2 = _interopRequireDefault(_compile);

var _createApp = require('./createApp');

var _createApp2 = _interopRequireDefault(_createApp);

var _update = require('./update');

var _update2 = _interopRequireDefault(_update);

var _cloneApps = require('./cloneApps');

var _cloneApps2 = _interopRequireDefault(_cloneApps);

var _reset = require('./reset');

var _reset2 = _interopRequireDefault(_reset);

var _init = require('./init');

var _init2 = _interopRequireDefault(_init);

var _serverCreateParent = require('./serverCreateParent');

var _serverCreateParent2 = _interopRequireDefault(_serverCreateParent);

var _serverAddMicroservice = require('./serverAddMicroservice');

var _serverAddMicroservice2 = _interopRequireDefault(_serverAddMicroservice);

var _resetModule = require('./resetModule');

var _resetModule2 = _interopRequireDefault(_resetModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { website: _website2.default,
    clone: _clone2.default,
    compile: _compile2.default,
    createApp: _createApp2.default,
    update: _update2.default,
    cloneApps: _cloneApps2.default,
    reset: _reset2.default,
    init: _init2.default,
    serverCreateParent: _serverCreateParent2.default,
    serverAddMicroservice: _serverAddMicroservice2.default,
    resetModule: _resetModule2.default
};
module.exports = exports['default'];