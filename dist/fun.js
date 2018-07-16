'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Future = exports.def = exports.S = exports.$ = undefined;

var _sanctuary = require('sanctuary');

var _sanctuary2 = _interopRequireDefault(_sanctuary);

var _sanctuaryDef = require('sanctuary-def');

var _sanctuaryDef2 = _interopRequireDefault(_sanctuaryDef);

var _sanctuaryTypeClasses = require('sanctuary-type-classes');

var _sanctuaryTypeClasses2 = _interopRequireDefault(_sanctuaryTypeClasses);

var _fluture = require('fluture');

var _fluture2 = _interopRequireDefault(_fluture);

var _flutureSanctuaryTypes = require('fluture-sanctuary-types');

var _flutureSanctuaryTypes2 = _interopRequireDefault(_flutureSanctuaryTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const S = _sanctuary2.default.create({
  checkTypes: process.env.NODE_ENV !== 'production',
  env: _sanctuary2.default.env.concat(_flutureSanctuaryTypes2.default.env)
});

const def = _sanctuaryDef2.default.create({
  checkTypes: process.env.NODE_ENV !== 'production',
  env: _sanctuaryDef2.default.env.concat(_flutureSanctuaryTypes2.default.env)
});

_sanctuaryDef2.default.a = _sanctuaryDef2.default.TypeVariable('a');
_sanctuaryDef2.default.b = _sanctuaryDef2.default.TypeVariable('b');
_sanctuaryDef2.default.Either = S.EitherType;
_sanctuaryDef2.default.Maybe = S.MaybeType;
_sanctuaryDef2.default.Future = _flutureSanctuaryTypes2.default.FutureType;

// Extensions
S.chainRej = S.curry2((fn, future) => future.chainRej(fn));
S.replace = S.curry3((key, replacement, str) => str.replace(key, replacement));
S.lift4 = S.curry4((fn, a1, a2, a3, a4) => _sanctuaryTypeClasses2.default.ap(_sanctuaryTypeClasses2.default.ap(_sanctuaryTypeClasses2.default.ap(_sanctuaryTypeClasses2.default.map(fn, a1), a2), a3), a4));
S.eitherToFuture = S.either(_fluture2.default.reject)(_fluture2.default.of);
S.invoke = fnName => arg => obj => obj[fnName](arg);

exports.$ = _sanctuaryDef2.default;
exports.S = S;
exports.def = def;
exports.Future = _fluture2.default;
//# sourceMappingURL=fun.js.map