import { $, S, def } from '../../fun';
import { $AppError } from '../../common/types/error';
import { $CommonListRequest } from '../../common/types/request';
import { $User, User } from '../../model/user';
import { withConnection, query } from '../database';

///////////////////////////////////////////////////////
//  Algebra
///////////////////////////////////////////////////////

const getAll_A = [ $CommonListRequest, $.Future ($AppError) ($.Array ($User)) ];

const insert_A = [ $User, $.Future ($AppError) ($User) ];



///////////////////////////////////////////////////////
//  Interpreter
///////////////////////////////////////////////////////

const { prop, compose, map, K } = S;

// getAll_I :: CommonListRequest -> Future DatabaseError (Array $User)
const getAll_I = commonListReq => {
  const { page, take } = commonListReq;
  const sql = `SELECT id, email, fullname
               FROM users
               OFFSET $1
               LIMIT $2`;

  const offset = (page - 1) * take;
  const params = [ offset, take ];

  const queryResult = withConnection (query (sql) (params));

  return compose
         (map (map (User.of)))
         (map (prop ('rows')))
         (queryResult);
};

// insert_I :: User -> Future DatabaseError User
const insert_I = user => {
  const sql = 'INSERT INTO users (id, email, password, fullname) VALUES ($1, $2, $3, $4)';
  const params = [ user.id, user.email, user.password, user.fullname ];

  const queryResult = withConnection (query (sql) (params));
  
  return map (K (user)) (queryResult);
};



///////////////////////////////////////////////////////
//  Export
///////////////////////////////////////////////////////

const getAll =
  def ('getAll')
      ({})
      (getAll_A)
      (getAll_I);

const insert = 
  def ('insert')
      ({})
      (insert_A)
      (insert_I);

export default {
  getAll,
  insert
}
