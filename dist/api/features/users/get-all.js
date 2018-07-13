'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fun = require('../../../fun');

var _utils = require('../../utils');

var _userService = require('../../../service/user-service');

var _userService2 = _interopRequireDefault(_userService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { toMaybe } = _fun.S;

// onResolve :: Context -> Next -> Void
const onResolve = ctx => next => users => {
  ctx.body = users;
  ctx.status = 200;
  next();
};

// onResolve :: Context -> Next -> Void
const onReject = ctx => next => error => {
  ctx.body = error;
  ctx.status = 500;
  next();
};

const getAll = (ctx, next) => {
  const params = {
    page: 1,
    take: 10,
    search: toMaybe(null)
  };

  return (0, _utils.run)(_userService2.default.getAll(params))(onResolve(ctx)(next))(onReject(ctx)(next));
};

exports.default = getAll;
//# sourceMappingURL=get-all.js.map