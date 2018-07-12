'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$Env = exports.Env = undefined;

var _sanctuaryDef = require('sanctuary-def');

var _sanctuaryDef2 = _interopRequireDefault(_sanctuaryDef);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Env {
  constructor(x) {
    this.repositories = x.repositories;
  }
}

const $Env = _sanctuaryDef2.default.NullaryType('fun_js/Env')('?')(x => x instanceof Env);

exports.Env = Env;
exports.$Env = $Env;
//# sourceMappingURL=env.js.map