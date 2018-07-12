'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encryptUser = exports.validateUser = exports.$User = exports.User = undefined;

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _fun = require('../fun');

var _error = require('../common/types/error');

var _stringValidators = require('../common/validation/string-validators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

////////////////////////////////////////////////////
//  Class Definition
////////////////////////////////////////////////////

class User {
  constructor(x) {
    this.id = x.id;
    this.email = x.email;
    this.password = x.password;
    this.fullname = x.fullname;
  }

  with(obj) {
    const newUser = Object.assign({}, this);
    for (let key in obj) {
      newUser[key] = obj[key];
    }

    return User.of(newUser);
  }

  static of(x) {
    return new User(x);
  }
}

const $User = _fun.$.NullaryType('fun_js/User')('')(x => x instanceof User);

////////////////////////////////////////////////////
//  Algebra
////////////////////////////////////////////////////

const validateUser_A = [_fun.$.Object, _fun.$.Future(_error.$ValidationError)($User)];

const encryptUser_A = [$User, _fun.$.Future(_error.$ValidationError)($User)];

////////////////////////////////////////////////////
//  Interpreter
////////////////////////////////////////////////////

const { prop, map, lift3, pipe, eitherToFuture } = _fun.S;

// createUser :: String -> String -> String -> User
const createUser = email => password => fullname => User.of({ id: (0, _v2.default)(), email, password, fullname });

// encrypt :: Number -> String -> Future Error String
const encrypt = salt => str => _fun.Future.encaseN2(_bcryptjs2.default.hash)(str)(salt);

// validateEmail :: String -> Either ValidationError String
const validateEmail = (0, _stringValidators.validateString)([_stringValidators.notEmpty, (0, _stringValidators.maxLength)(50), _stringValidators.email])('Email');

// validatePassword :: String -> Either ValidationError String
const validatePassword = (0, _stringValidators.validateString)([_stringValidators.notEmpty, (0, _stringValidators.minLength)(6), (0, _stringValidators.maxLength)(50)])('Password');

// validateFullname :: String -> Either ValidationError String
const validateFullname = (0, _stringValidators.validateString)([_stringValidators.notEmpty, (0, _stringValidators.maxLength)(50)])('Fullname');

// validateUser_I :: Object -> Future ValidationError User
const validateUser_I = input => eitherToFuture(lift3(createUser)(validateEmail(input.email))(validatePassword(input.password))(validateFullname(input.fullname)));

// transformPassword :: User -> String -> User
const transformPassword = user => password => user.with({ password });

// encryptUser_I :: User -> Future ValidationError User
const encryptUser_I = user => pipe([prop('password'), encrypt(10), map(transformPassword(user))])(user);

////////////////////////////////////////////////////
//  Export 
////////////////////////////////////////////////////

const validateUser = (0, _fun.def)('validateUser')({})(validateUser_A)(validateUser_I);

const encryptUser = (0, _fun.def)('encryptUser')({})(encryptUser_A)(encryptUser_I);

exports.User = User;
exports.$User = $User;
exports.validateUser = validateUser;
exports.encryptUser = encryptUser;
//# sourceMappingURL=user.js.map