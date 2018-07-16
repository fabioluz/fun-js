'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fun = require('../../../fun');

var _utils = require('../../utils');

var _userService = require('../../../service/user-service');

var _userService2 = _interopRequireDefault(_userService);

var _error = require('../../../common/types/error');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { K, ifElse } = _fun.S;

// getErrorStatus :: AppError -> Number
const getErrorStatus = ifElse(x => x instanceof _error.ValidationError)(K(422))(K(500));

// onResolve :: Context -> Next -> Void
const onResolve = ctx => next => users => {
  ctx.body = users;
  ctx.status = 200;
  next();
};

// onReject :: Context -> Next -> Void
const onReject = ctx => next => error => {
  ctx.body = error;
  ctx.status = getErrorStatus(error);
  next();
};

const getAll = (ctx, next) => (0, _utils.run)(_userService2.default.create(ctx.request.body))(onResolve(ctx)(next))(onReject(ctx)(next));

exports.default = getAll;
//# sourceMappingURL=create.js.map