import { $, S, def } from '../../fun';
import { $ValidationError, ValidationError } from '../types/error';
import { validate } from '../validation/common-validators';

// type aliases
const $ValErrorOrMaybeString = $.Either ($ValidationError) ($.Maybe ($.String));
const $ValErrorOrString = $.Either ($ValidationError) ($.String);
const $ValFn = $.Function ([$.Maybe ($.Any), $ValErrorOrMaybeString]);

////////////////////////////////////////////////////
//  Algebra
////////////////////////////////////////////////////

const validateString_A = [ $.Array ($ValFn), $.String, $.Any, $ValErrorOrString ];

const notEmpty_A = [ $.Maybe ($.String), $ValErrorOrMaybeString ];

const minLength_A = [ $.Number, $.Maybe ($.String), $ValErrorOrMaybeString ];

const maxLength_A = [ $.Number, $.Maybe ($.String), $ValErrorOrMaybeString ];

const email_A = [ $.Maybe ($.String), $ValErrorOrMaybeString ];



////////////////////////////////////////////////////
//  Helpers
////////////////////////////////////////////////////

const { prop, concat, isNothing, isJust, maybe, ifElse, Right, Left } = S;

// length :: Maybe String -> Number
const length = maybe (0) (prop ('length'));

// includes :: String -> Maybe String -> Boolean
const includes = term => 
  maybe (false) (x => x.includes (term));

// toError :: String -> a -> Either ValidationError a
const toError = msg => _ => 
  Left (ValidationError.of (msg));

// string :: Maybe Any -> Either ValidationError (Maybe String)
const string = 
  ifElse (x => isNothing (x) || typeof x.value === 'string')
         (Right)
         (toError ('$key must be a string'));



////////////////////////////////////////////////////
//  Interpreter
////////////////////////////////////////////////////

// validateString_I :: [ValFn] -> String -> Any -> Either ValidationError String
const validateString_I = fns => 
  validate (concat ([string]) (fns));

// notEmpty_I :: Maybe String -> Either ValidationError (Maybe String)
const notEmpty_I = 
  ifElse (x => isJust (x) && x.value !== '')
         (Right)
         (toError ('$key is required'));

// minLength_I :: Number -> Maybe String -> Either ValidationError (Maybe String)
const minLength_I = len =>
  ifElse (x => isNothing (x) || length (x) >= len)
         (Right)
         (toError (`$key cannot be shorter than ${len} characters`));

// maxLength_I :: Number -> Maybe String -> Either ValidationError (Maybe String)
const maxLength_I = len =>
  ifElse (x => isNothing (x) || length (x) <= len)
         (Right)
         (toError (`$key cannot be longer than ${len} characters`));

// email_I :: Maybe String -> Either ValidationError (Maybe String)
const email_I =
  ifElse (x => isNothing (x) || includes ('@') (x))
         (Right)
         (toError (`$key should be a valid email`));


         
////////////////////////////////////////////////////
//  Export
////////////////////////////////////////////////////

export const validateString = 
  def ('validateString')
      ({})
      (validateString_A)
      (validateString_I);

export const notEmpty = 
  def ('notEmpty')
      ({})
      (notEmpty_A)
      (notEmpty_I);

export const minLength = 
  def ('minLength')
      ({})
      (minLength_A)
      (minLength_I);

export const maxLength =
  def ('maxLength')
      ({})
      (maxLength_A)
      (maxLength_I);

export const email =
  def ('email')
      ({})
      (email_A)
      (email_I);

