'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaLogger = require('koa-logger');

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _errorFormatter = require('./middlewares/error-formatter');

var _errorFormatter2 = _interopRequireDefault(_errorFormatter);

var _router = require('./features/users/router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const start = () => {
  const app = new _koa2.default();

  app.use((0, _koaLogger2.default)()).use((0, _koaBodyparser2.default)()).use(_router2.default.routes()).use(_router2.default.allowedMethods()).use((0, _errorFormatter2.default)()).listen(process.env.APP_PORT);

  console.log('The app is running from port 3000');
};

exports.default = start;
//# sourceMappingURL=index.js.map