'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatValError = exports.toCommonListReq = exports.positiveInt = exports.run = exports.post = exports.get = exports.prefix = undefined;

var _fun = require('../fun');

var _dependencyResolver = require('./dependency-resolver');

var _dependencyResolver2 = _interopRequireDefault(_dependencyResolver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { I, K, ifElse, toMaybe } = _fun.S;

// prefix :: String -> Router -> Router
const prefix = exports.prefix = name => router => router.prefix(name);

// get :: String -> Middleware -> Router -> Router
const get = exports.get = route => middlware => router => router.get(route, middlware);

// post :: String -> Middleware -> Router -> Router
const post = exports.post = route => middlware => router => router.post(route, middlware);

// run :: (Env -> Future a b) -> (b -> Middleware) -> (a -> Middleware) -> Middleware
const run = exports.run = fn => onResolve => onReject => fn(_dependencyResolver2.default).promise().then(onResolve).catch(onReject);

// positiveInt :: Any -> Number -> Number
const positiveInt = exports.positiveInt = otherwise => ifElse(x => typeof x === 'number' && Number.isInteger(x) && x > 0)(I)(K(otherwise));

// toCommonListReq :: KoaRequest -> CommonListRequest
const toCommonListReq = exports.toCommonListReq = query => ({
  page: positiveInt(1)(query.page),
  take: positiveInt(10)(query.take),
  search: toMaybe(query.search)
});

const formatValError = exports.formatValError = error => ({
  error: error.value
});
//# sourceMappingURL=utils.js.map