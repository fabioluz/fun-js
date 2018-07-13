import Sanctuary from 'sanctuary';
import $ from 'sanctuary-def';
import Z from 'sanctuary-type-classes';
import Future from 'fluture';
import FutureTypes from 'fluture-sanctuary-types';

const S = Sanctuary.create ({
  checkTypes: process.env.NODE_ENV !== 'production',
  env: Sanctuary.env.concat (FutureTypes.env)
});

const def = $.create ({
  checkTypes: process.env.NODE_ENV !== 'production',
  env: $.env.concat (FutureTypes.env)
})

$.a = $.TypeVariable ('a');
$.b = $.TypeVariable ('b');
$.Either = S.EitherType;
$.Maybe = S.MaybeType;
$.Future = FutureTypes.FutureType;

// Extensions
S.chainRej = S.curry2 ((fn, future) => future.chainRej (fn));
S.replace = S.curry3((key, replacement, str) => str.replace (key, replacement));
S.lift4 = S.curry4 ((fn, a1, a2, a3, a4) => Z.ap (Z.ap (Z.ap (Z.map (fn, a1), a2), a3), a4));
S.eitherToFuture = S.either (Future.reject) (Future.of);
S.invoke = fnName => arg => obj => obj[fnName] (arg); 

export {
  $,
  S,
  def,
  Future
}