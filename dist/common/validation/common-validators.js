'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = undefined;

var _fun = require('../../fun');

var _error = require('../types/error');

// type aliases
const $ValErrorOrMaybeA = _fun.$.Either(_error.$ValidationError)(_fun.$.Maybe(_fun.$.a));
const $ValErrorOrAny = _fun.$.Either(_error.$ValidationError)(_fun.$.Any);
const $ValFn = _fun.$.Function([_fun.$.Any, $ValErrorOrMaybeA]);

////////////////////////////////////////////////////
//  Algebra
////////////////////////////////////////////////////

const transform_A = [_fun.$.String, _fun.$.String, _error.$ValidationError, _error.$ValidationError];

const format_A = [_fun.$.String, $ValErrorOrMaybeA, $ValErrorOrAny];

const validate_A = [_fun.$.Array($ValFn), _fun.$.String, _fun.$.Any, $ValErrorOrAny];

////////////////////////////////////////////////////
//  Interpreter
////////////////////////////////////////////////////

const { replace, map, mapLeft, pipeK, compose, isRight, ifElse,
  toMaybe, maybeToNullable, Right } = _fun.S;

// transform_I :: String -> String -> ValidationError -> ValidationError
const transform_I = key => replacement => error => _error.ValidationError.of(replace(key)(replacement)(error.value));

const transform = (0, _fun.def)('transform')({})(transform_A)(transform_I);

// format_I :: String -> Either ValidationError (Maybe a) -> Either ValidationError a
const format_I = key => ifElse(isRight)(map(maybeToNullable))(mapLeft(transform('$key')(key)));

const format = (0, _fun.def)('format')({})(format_A)(format_I);

// validate_I :: [(Maybe a -> Either ValidationError (Maybe a))] -> String -> a -> Either ValidationError a
const validate_I = fns => key => value => compose(format(key))(pipeK(fns))(Right(toMaybe(value)));

const validate = exports.validate = (0, _fun.def)('validate')({})(validate_A)(validate_I);
//# sourceMappingURL=common-validators.js.map