'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fun = require('../../fun');

const { compose, prop, allPass, gte, lte, equals } = _fun.S;

// isValError :: Context -> Boolean
const isValError = compose(equals(422))(prop('status'));

// isSuccess :: Context -> Boolean
const isSuccess = compose(allPass([gte(200), lte(299)]))(prop('status'));

// errorFormatter :: Middleware
const errorFormatter = (ctx, next) => {
  if (isSuccess(ctx)) {
    return next();
  }

  if (isValError(ctx)) {
    ctx.body = { error: ctx.body.value };
    return next();
  }

  if (process.env.NODE_ENV === 'production') {
    ctx.body = null;
    return next();
  }
};

exports.default = () => errorFormatter;
//# sourceMappingURL=error-formatter.js.map