'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fun = require('../fun');

var _error = require('../common/types/error');

var _env = require('../common/types/env');

var _user = require('../model/user');

////////////////////////////////////////////////////
//  Algebra
////////////////////////////////////////////////////

const getAll_A = [_fun.$.PositiveInteger, _env.$Env, _fun.$.Future(_error.$AppError)(_fun.$.Array(_fun.$.Object))];

const createUser_A = [_fun.$.Object, _env.$Env, _fun.$.Future(_error.$AppError)(_user.$User)];

////////////////////////////////////////////////////
//  Interpreter
////////////////////////////////////////////////////

const { prop, invoke, pipe, pipeK } = _fun.S;

// getUserRepository :: Env -> UserRepository
const getUserRepository = env => env.repositories.user;

// getAll_I :: Number -> Env -> Future AppError (Array Object)
const getAll_I = page => env => pipe([getUserRepository, prop('getAll'), invoke(page)])(env);

// insertUser :: Env -> User -> Future AppError User
const insertUser = user => pipe([getUserRepository, prop('insert'), invoke(user)]);

// createUser_I :: Object -> Env -> Future AppError User
const createUser_I = input => env => pipeK([_user.validateUser, _user.encryptUser, insertUser(env)])(_fun.Future.of(input));

////////////////////////////////////////////////////
//  Export
////////////////////////////////////////////////////

const createUser = (0, _fun.def)('createUser')({})(createUser_A)(createUser_I);

const getAll = (0, _fun.def)('getAll')({})(getAll_A)(getAll_I);

exports.default = {
  getAll,
  createUser
};
//# sourceMappingURL=user-service.js.map