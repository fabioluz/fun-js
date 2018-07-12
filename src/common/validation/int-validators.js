import { $, S, def, ValidationError } from '../../fun';

const { curry2, fromMaybe, isNothing, Right } = S;

// ----- Validators

// isPositive :: Maybe Number -> Eihter ValidationError (Maybe Number)
const isPositive = mbNumber => {
  if (isNothing (mbNumber)) {
    return Right (mbNumber);
  }

  const value = fromMaybe (-1) (mbNumber);
  if (value >= 0) {
    return Right (mbNumber);
  }
  
  return Left (ValidationError ('$key should be a positive number.'))
}