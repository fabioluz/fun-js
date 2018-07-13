'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _fun = require('../../../fun');

var _utils = require('../../utils');

var _getAll = require('./get-all');

var _getAll2 = _interopRequireDefault(_getAll);

var _create = require('./create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { pipe } = _fun.S;

const config = [(0, _utils.prefix)('/api/users'), (0, _utils.get)('/')(_getAll2.default), (0, _utils.post)('/')(_create2.default)];

const router = pipe(config)((0, _koaRouter2.default)());

exports.default = router;
//# sourceMappingURL=router.js.map