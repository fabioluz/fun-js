import { $, S, Future, def } from '../fun';
import { $AppError } from '../common/types/error';
import { $Env } from '../common/types/env';
import { $CommonListRequest } from '../common/types/request';
import { $UserResponse } from '../common/types/response';
import { $User, validateUser, encryptUser } from '../model/user';

////////////////////////////////////////////////////
//  Algebra
////////////////////////////////////////////////////

const getAll_A = [ $CommonListRequest, $Env, $.Future ($AppError) ($.Array ($.Object)) ];

const createUser_A = [ $.Object, $Env, $.Future ($AppError) ($User) ];



////////////////////////////////////////////////////
//  Interpreter
////////////////////////////////////////////////////

const { prop, invoke, pipe, pipeK } = S;

// getUserRepository :: Env -> UserRepository
const getUserRepository = env => 
  env.repositories.user;

// getAll_I :: Number -> Env -> Future AppError (Array Object)
const getAll_I = page => env => 
  pipe ([
    getUserRepository,
    prop ('getAll'),
    invoke (page)
  ]) (env);

// insertUser :: Env -> User -> Future AppError User
const insertUser = user =>
  pipe ([ 
    getUserRepository,
    prop ('insert'),
    invoke (user)
  ]);

// createUser_I :: Object -> Env -> Future AppError User
const createUser_I = input => env =>
  pipeK ([
    validateUser,
    encryptUser,
    insertUser (env)
  ]) (Future.of (input));



////////////////////////////////////////////////////
//  Export
////////////////////////////////////////////////////

const createUser = 
  def ('createUser')
      ({})
      (createUser_A)
      (createUser_I);

const getAll =
  def ('getAll')
      ({})
      (getAll_A)
      (getAll_I);

export default {
  getAll,
  createUser
}