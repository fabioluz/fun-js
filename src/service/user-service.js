import { $, S, Future, def } from '../fun';
import { $AppError, ValidationError } from '../common/types/error';
import { $Env } from '../common/types/env';
import { $CommonListRequest } from '../common/types/request';
import { $UserResponse, UserResponse } from '../common/types/response';
import { $User, validateUser, encryptUser } from '../model/user';

////////////////////////////////////////////////////
//  Algebra
////////////////////////////////////////////////////

const getAll_A = [ $CommonListRequest, $Env, $.Future ($AppError) ($.Array ($UserResponse)) ];

const create_A = [ $.Object, $Env, $.Future ($AppError) ($UserResponse) ];



////////////////////////////////////////////////////
//  Helpers
////////////////////////////////////////////////////

const { map, chain, invoke, pipe, pipeK, maybe } = S;

// getUserRepository :: Env -> UserRepository
const getUserRepository = env => 
  env.repositories.user;

// toEmailInUseError :: User -> Future ValidationError User
const toEmailInUseError = user =>
  Future.reject (ValidationError.of ('This email is already being used'));

// insertUser :: Env -> User -> Future AppError UserResponse
const insertUser = env => user =>
  pipe ([ 
    getUserRepository,
    invoke ('insert') (user),
    map (UserResponse.of)
  ]) (env);

// checkUserEmail :: Env -> User -> Future AppError User
const checkUserEmail = env => user =>
  pipe ([
    getUserRepository,
    invoke ('getByEmail') (user.email),
    chain (maybe (Future.of (user)) (toEmailInUseError))
  ]) (env);



////////////////////////////////////////////////////
//  Interpreter
////////////////////////////////////////////////////

// getAll_I :: CommonListRequest -> Env -> Future AppError (Array UserResponse)
const getAll_I = input =>
  pipe ([
    getUserRepository,
    invoke ('getAll') (input),
    map (map (UserResponse.of))
  ]);

// createUser_I :: Object -> Env -> Future AppError UserResponse
const create_I = input => env =>
  pipeK ([
    validateUser,
    checkUserEmail (env),
    encryptUser,
    insertUser (env)
  ]) (Future.of (input));



////////////////////////////////////////////////////
//  Export
////////////////////////////////////////////////////

const create = 
  def ('create')
      ({})
      (create_A)
      (create_I);

const getAll =
  def ('getAll')
      ({})
      (getAll_A)
      (getAll_I);

export default {
  getAll,
  create
}