'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$ValidationError = exports.$DatabaseError = exports.$AppError = exports.ValidationError = exports.DatabaseError = undefined;

var _sanctuaryDef = require('sanctuary-def');

var _sanctuaryDef2 = _interopRequireDefault(_sanctuaryDef);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ApplicationError {
  constructor(x) {
    this.value = x;
    this.isSafe = false;
  }
}

class DatabaseError extends ApplicationError {
  constructor(x) {
    super(x);
  }

  static of(x) {
    return new DatabaseError(x);
  }
}

class ValidationError extends ApplicationError {
  constructor(x) {
    super(x);
    this.isSafe = true;
  }

  static of(x) {
    return new ValidationError(x);
  }

  transform(key) {
    return function (replacement) {
      return ValidationError.of(this.value.replace(key, replacement));
    };
  }
}

const $AppError = _sanctuaryDef2.default.NullaryType('fun_js/Error')('?')(x => x instanceof ApplicationError);

const $DatabaseError = _sanctuaryDef2.default.NullaryType('fun_js/DatabaseError')('?')(x => x instanceof DatabaseError);

const $ValidationError = _sanctuaryDef2.default.NullaryType('fun_js/ValidationError')('?')(x => x instanceof ValidationError);

exports.DatabaseError = DatabaseError;
exports.ValidationError = ValidationError;
exports.$AppError = $AppError;
exports.$DatabaseError = $DatabaseError;
exports.$ValidationError = $ValidationError;
//# sourceMappingURL=error.js.map