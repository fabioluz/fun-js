'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.email = exports.maxLength = exports.minLength = exports.notEmpty = exports.validateString = undefined;

var _fun = require('../../fun');

var _error = require('../types/error');

var _commonValidators = require('../validation/common-validators');

// type aliases
const $ValErrorOrMaybeString = _fun.$.Either(_error.$ValidationError)(_fun.$.Maybe(_fun.$.String));
const $ValErrorOrString = _fun.$.Either(_error.$ValidationError)(_fun.$.String);
const $ValFn = _fun.$.Function([_fun.$.Maybe(_fun.$.Any), $ValErrorOrMaybeString]);

////////////////////////////////////////////////////
//  Algebra
////////////////////////////////////////////////////

const validateString_A = [_fun.$.Array($ValFn), _fun.$.String, _fun.$.Any, $ValErrorOrString];

const notEmpty_A = [_fun.$.Maybe(_fun.$.String), $ValErrorOrMaybeString];

const minLength_A = [_fun.$.Number, _fun.$.Maybe(_fun.$.String), $ValErrorOrMaybeString];

const maxLength_A = [_fun.$.Number, _fun.$.Maybe(_fun.$.String), $ValErrorOrMaybeString];

const email_A = [_fun.$.Maybe(_fun.$.String), $ValErrorOrMaybeString];

////////////////////////////////////////////////////
//  Helpers
////////////////////////////////////////////////////

const { prop, concat, isNothing, isJust, maybe, ifElse, Right, Left } = _fun.S;

// length :: Maybe String -> Number
const length = maybe(0)(prop('length'));

// includes :: String -> Maybe String -> Boolean
const includes = term => maybe(false)(x => x.includes(term));

// toError :: String -> a -> Either ValidationError a
const toError = msg => _ => Left(_error.ValidationError.of(msg));

// string :: Maybe Any -> Either ValidationError (Maybe String)
const string = ifElse(x => isNothing(x) || typeof x.value === 'string')(Right)(toError('$key must be a string'));

////////////////////////////////////////////////////
//  Interpreter
////////////////////////////////////////////////////

// validateString_I :: [ValFn] -> String -> Any -> Either ValidationError String
const validateString_I = fns => (0, _commonValidators.validate)(concat([string])(fns));

// notEmpty_I :: Maybe String -> Either ValidationError (Maybe String)
const notEmpty_I = ifElse(x => isJust(x) && x.value !== '')(Right)(toError('$key is required'));

// minLength_I :: Number -> Maybe String -> Either ValidationError (Maybe String)
const minLength_I = len => ifElse(x => isNothing(x) || length(x) >= len)(Right)(toError(`$key cannot be shorter than ${len} characters`));

// maxLength_I :: Number -> Maybe String -> Either ValidationError (Maybe String)
const maxLength_I = len => ifElse(x => isNothing(x) || length(x) <= len)(Right)(toError(`$key cannot be longer than ${len} characters`));

// email_I :: Maybe String -> Either ValidationError (Maybe String)
const email_I = ifElse(x => isNothing(x) || includes('@')(x))(Right)(toError(`$key should be a valid email`));

////////////////////////////////////////////////////
//  Export
////////////////////////////////////////////////////

const validateString = exports.validateString = (0, _fun.def)('validateString')({})(validateString_A)(validateString_I);

const notEmpty = exports.notEmpty = (0, _fun.def)('notEmpty')({})(notEmpty_A)(notEmpty_I);

const minLength = exports.minLength = (0, _fun.def)('minLength')({})(minLength_A)(minLength_I);

const maxLength = exports.maxLength = (0, _fun.def)('maxLength')({})(maxLength_A)(maxLength_I);

const email = exports.email = (0, _fun.def)('email')({})(email_A)(email_I);
//# sourceMappingURL=string-validators.js.map