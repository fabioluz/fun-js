'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = undefined;

var _fun = require('../../fun');

const { curry3, map, mapLeft, pipeK, compose, isRight, ifElse,
  toMaybe, maybeToNullable, Right } = _fun.S;

// _repalce :: String -> String -> ValidationError -> ValidationError
const _replace = curry3((key, replacement, error) => {
  const message = error.value;
  return _fun.ValidationError.of(message.replace(key, replacement));
});

// _format :: String -> Either ValidationError (Maybe a) -> Either ValidationError a
const _format = key => ifElse(isRight)(map(maybeToNullable))(mapLeft(replace('$key')(key)));

// _validate :: [(Maybe a -> Either ValidationError (Maybe a))] -> String -> a -> Either ValidationError a
const _validate = curry3((fns, key, value) => {
  return compose(format(key))(pipeK(fns))(Right(toMaybe(value)));
});

// ----- Sanctuary 

const $ValErrorOrMaybeA = _fun.$.$Either(_fun.$.$ValidationError)(_fun.$.$Maybe(_fun.$.$a));
const $ValErrorOrAny = _fun.$.$Either(_fun.$.$ValidationError)(_fun.$.Any);

const replace = (0, _fun.def)('replace')({})([_fun.$.String, _fun.$.String, _fun.$.$ValidationError, _fun.$.$ValidationError])(_replace);

const format = (0, _fun.def)('format')({})([_fun.$.String, $ValErrorOrMaybeA, $ValErrorOrAny])(_format);

const validate = (0, _fun.def)('validate')({})([_fun.$.Array(_fun.$.Function([_fun.$.Any, $ValErrorOrMaybeA])), _fun.$.String, _fun.$.Any, $ValErrorOrAny])(_validate);

exports.validate = validate;
//# sourceMappingURL=_common-validators.js.map