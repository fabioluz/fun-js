'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.email = exports.maxLength = exports.minLength = exports.notEmpty = exports.validateString = undefined;

var _fun = require('../../fun');

var _commonValidators = require('../validation/_common-validators');

//
//  Algebra
//

// type alias
const $ValErrorOrMaybeString = _fun.$.$Either(_fun.$.$ValidationError)(_fun.$.$Maybe(_fun.$.String));
const $ValErrorOrString = _fun.$.$Either(_fun.$.$ValidationError)(_fun.$.String);
const $ValFn = _fun.$.Function([_fun.$.$Maybe(_fun.$.Any), $ValErrorOrMaybeString]);

// functions
const defValidateString = (0, _fun.def)('validateString')({})([_fun.$.Array($ValFn), _fun.$.String, _fun.$.Any, $ValErrorOrString]);
const defNotEmpty = (0, _fun.def)('notEmpty')({})([_fun.$.$Maybe(_fun.$.String), $ValErrorOrMaybeString]);
const defMinLength = (0, _fun.def)('minLength')({})([_fun.$.$Maybe(_fun.$.String), $ValErrorOrMaybeString]);
const defMaxLength = (0, _fun.def)('maxLength')({})([_fun.$.$Maybe(_fun.$.String), $ValErrorOrMaybeString]);
const defEmail = (0, _fun.def)('email')({})([_fun.$.$Maybe(_fun.$.String), $ValErrorOrMaybeString]);

//
//  Interpreter
//  

function interpreter() {

  const { concat, isNothing, isJust, maybe, Right, Left } = _fun.S;

  // length :: Maybe String -> Number
  const length = maybe(0)(prop('length'));

  // includes :: String -> Maybe String -> Boolean
  const includes = term => maybe(false)(x => x.includes(term));

  // string :: Maybe Any -> Either ValidationError (Maybe String)
  const string = mbAny => {
    if (isNothing(mbAny) || typeof mbAny.value === 'string') {
      return Right(mbAny);
    }

    const msg = '$key must be a string';
    return Left(_fun.ValidationError.of(msg));
  };

  // validateString :: [ValFn] -> String -> Any -> Either ValidationError String
  const validateString = fns => (0, _commonValidators.validate)(concat([string])(fns));

  // notEmpty :: Maybe String -> Either ValidationError (Maybe String)
  const notEmpty = mbStr => {
    if (isJust(mbStr) && mbStr.value !== '') {
      return Right(mbStr);
    }

    const msg = '$key is required';
    return Left(_fun.ValidationError.of(msg));
  };

  // minLength :: Number -> Maybe String -> Either ValidationError (Maybe String)
  const minLength = len => mbStr => {
    if (isNothing(mbStr) || length(mbStr) >= len) {
      return Right(mbStr);
    }

    const msg = `$key cannot be shorter than ${len} characters`;
    return Left(_fun.ValidationError.of(msg));
  };

  // maxLength :: Number -> Maybe String -> Either ValidationError (Maybe String)
  const maxLength = len => mbStr => {
    if (isNothing(mbStr) || length(mbStr) <= len) {
      return Right(mbStr);
    }

    const msg = `$key cannot be longer than ${len} characters`;
    return Left(_fun.ValidationError.of(msg));
  };

  // email :: Maybe String -> Either ValidationError (Maybe String)
  const email = mbStr => {
    if (isNothing(mbStr) || includes('@')(mbStr)) {
      return Right(mbStr);
    }

    const msg = `$key should be a valid email`;
    return Left(_fun.ValidationError.of(msg));
  };

  return {
    validateString,
    notEmpty,
    minLength,
    maxLength,
    email
  };
}

//
//  Export
//

const I = interpreter();

const validateString = defValidateString(I.validateString);
const notEmpty = defNotEmpty(I.notEmpty);
const minLength = defMinLength(I.minLength);
const maxLength = defMaxLength(I.maxLength);
const email = defEmail(I.email);

exports.validateString = validateString;
exports.notEmpty = notEmpty;
exports.minLength = minLength;
exports.maxLength = maxLength;
exports.email = email;
//# sourceMappingURL=_string-validators.js.map