'use strict';

var _fun = require('../../fun');

const { curry2, fromMaybe, isNothing, Right } = _fun.S;

// ----- Validators

// isPositive :: Maybe Number -> Eihter ValidationError (Maybe Number)
const isPositive = mbNumber => {
  if (isNothing(mbNumber)) {
    return Right(mbNumber);
  }

  const value = fromMaybe(-1)(mbNumber);
  if (value >= 0) {
    return Right(mbNumber);
  }

  return Left((0, _fun.ValidationError)('$key should be a positive number.'));
};
//# sourceMappingURL=int-validators.js.map