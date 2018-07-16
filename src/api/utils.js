import { S } from '../fun';
import env from './dependency-resolver';

const { I, K, ifElse, toMaybe } = S;

// prefix :: String -> Router -> Router
export const prefix = name => router =>
  router.prefix (name);

// get :: String -> Middleware -> Router -> Router
export const get = route => middlware => router =>
  router.get (route, middlware);

// post :: String -> Middleware -> Router -> Router
export const post = route => middlware => router =>
  router.post (route, middlware);

// run :: (Env -> Future a b) -> (b -> Middleware) -> (a -> Middleware)
export const run = fn => onResolve => onReject =>
  fn (env).promise ()
          .then (onResolve)
          .catch (onReject);

// positiveInt :: Any -> Number -> Number
export const positiveInt = otherwise =>
  ifElse (x => typeof x === 'number' 
            && Number.isInteger (x) 
            && x > 0
         ) (I) (K (otherwise));

// toCommonListReq :: KoaRequest -> CommonListRequest
export const toCommonListReq = query => ({
  page: positiveInt (1)  (query.page),
  take: positiveInt (10) (query.take),
  search: toMaybe (query.search)
});

export const formatValError = error => ({
  error: error.value
});