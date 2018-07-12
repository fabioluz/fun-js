import { $, S, def } from '../../fun';
import { $ValidationError, ValidationError } from '../types/error';

// type aliases
const $ValErrorOrMaybeA = $.Either ($ValidationError) ($.Maybe ($.a));
const $ValErrorOrAny = $.Either ($ValidationError) ($.Any);
const $ValFn = $.Function ([$.Any, $ValErrorOrMaybeA]);



////////////////////////////////////////////////////
//  Algebra
////////////////////////////////////////////////////

const transform_A = [$.String, $.String, $ValidationError, $ValidationError];

const format_A = [$.String, $ValErrorOrMaybeA, $ValErrorOrAny];

const validate_A = [$.Array ($ValFn), $.String, $.Any, $ValErrorOrAny];



////////////////////////////////////////////////////
//  Interpreter
////////////////////////////////////////////////////

const { replace, map, mapLeft, pipeK, compose, isRight, ifElse, 
        toMaybe, maybeToNullable, Right } = S;

// transform_I :: String -> String -> ValidationError -> ValidationError
const transform_I = key => replacement => error =>
  ValidationError.of (replace (key) (replacement) (error.value));

const transform = def ('transform') ({}) (transform_A) (transform_I);

// format_I :: String -> Either ValidationError (Maybe a) -> Either ValidationError a
const format_I = key =>
  ifElse (isRight)
         (map (maybeToNullable))
         (mapLeft (transform ('$key') (key)));

const format = def ('format') ({}) (format_A) (format_I);
   
// validate_I :: [(Maybe a -> Either ValidationError (Maybe a))] -> String -> a -> Either ValidationError a
const validate_I = fns => key => value => 
  compose (format (key))
          (pipeK (fns))
          (Right (toMaybe (value)));

export const validate = def ('validate') ({}) (validate_A) (validate_I);