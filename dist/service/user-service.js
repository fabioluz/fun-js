'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fun = require('../fun');

var _error = require('../common/types/error');

var _env = require('../common/types/env');

var _request = require('../common/types/request');

var _response = require('../common/types/response');

var _user = require('../model/user');

////////////////////////////////////////////////////
//  Algebra
////////////////////////////////////////////////////

const getAll_A = [_request.$CommonListRequest, _env.$Env, _fun.$.Future(_error.$AppError)(_fun.$.Array(_response.$UserResponse))];

const create_A = [_fun.$.Object, _env.$Env, _fun.$.Future(_error.$AppError)(_response.$UserResponse)];

////////////////////////////////////////////////////
//  Helpers
////////////////////////////////////////////////////

const { map, chain, invoke, pipe, pipeK, maybe } = _fun.S;

// getUserRepository :: Env -> UserRepository
const getUserRepository = env => env.repositories.user;

// toEmailInUseError :: User -> Future ValidationError User
const toEmailInUseError = user => _fun.Future.reject(_error.ValidationError.of('This email is already being used'));

// insertUser :: Env -> User -> Future AppError UserResponse
const insertUser = env => user => pipe([getUserRepository, invoke('insert')(user), map(_response.UserResponse.of)])(env);

// checkUserEmail :: Env -> User -> Future AppError User
const checkUserEmail = env => user => pipe([getUserRepository, invoke('getByEmail')(user.email), chain(maybe(_fun.Future.of(user))(toEmailInUseError))])(env);

////////////////////////////////////////////////////
//  Interpreter
////////////////////////////////////////////////////

// getAll_I :: CommonListRequest -> Env -> Future AppError (Array UserResponse)
const getAll_I = input => pipe([getUserRepository, invoke('getAll')(input), map(map(_response.UserResponse.of))]);

// createUser_I :: Object -> Env -> Future AppError UserResponse
const create_I = input => env => pipeK([_user.validateUser, checkUserEmail(env), _user.encryptUser, insertUser(env)])(_fun.Future.of(input));

////////////////////////////////////////////////////
//  Export
////////////////////////////////////////////////////

const create = (0, _fun.def)('create')({})(create_A)(create_I);

const getAll = (0, _fun.def)('getAll')({})(getAll_A)(getAll_I);

exports.default = {
  getAll,
  create
};
//# sourceMappingURL=user-service.js.map