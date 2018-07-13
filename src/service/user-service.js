import { $, S, Future, def } from '../fun';
import { $AppError } from '../common/types/error';
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

const { map, invoke, pipe, pipeK } = S;

// getUserRepository :: Env -> UserRepository
const getUserRepository = env => 
  env.repositories.user;

// insertUser :: Env -> User -> Future AppError UserResponse
const insertUser = env => user =>
  pipe ([ 
    getUserRepository,
    invoke ('insert') (user),
    map (UserResponse.of)
  ]) (env);



////////////////////////////////////////////////////
//  Interpreter
////////////////////////////////////////////////////

// getAll_I :: CommonListRequest -> Env -> Future AppError (Array UserResponse)
const getAll_I = input => env => 
  pipe ([
    getUserRepository,
    invoke ('getAll') (input)
  ]) (env);

// createUser_I :: Object -> Env -> Future AppError UserResponse
const create_I = input => env =>
  pipeK ([
    validateUser,
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