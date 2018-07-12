import $ from 'sanctuary-def';

class ApplicationError {
  constructor (x) {
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
  constructor (x) {
    super (x);
    this.isSafe = true;
  }

  static of (x) {
    return new ValidationError (x);
  }

  transform (key) {
    return function (replacement) {
      return ValidationError.of (this.value.replace (key, replacement));
    }
  }
}

const $AppError = $.NullaryType 
  ('fun_js/Error')
  ('?')
  (x => x instanceof ApplicationError);

const $DatabaseError = $.NullaryType 
  ('fun_js/DatabaseError')
  ('?')
  (x => x instanceof DatabaseError);

const $ValidationError = $.NullaryType 
  ('fun_js/ValidationError')
  ('?')
  (x => x instanceof ValidationError);

export {
  DatabaseError,
  ValidationError,
  $AppError,
  $DatabaseError,
  $ValidationError
}
