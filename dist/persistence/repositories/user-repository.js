'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fun = require('../../fun');

var _error = require('../../common/types/error');

var _request = require('../../common/types/request');

var _user = require('../../model/user');

var _database = require('../database');

///////////////////////////////////////////////////////
//  Algebra
///////////////////////////////////////////////////////

const getAll_A = [_request.$CommonListRequest, _fun.$.Future(_error.$AppError)(_fun.$.Array(_user.$User))];

const getByEmail_A = [_fun.$.String, _fun.$.Future(_error.$AppError)(_fun.$.Maybe(_user.$User))];

const insert_A = [_user.$User, _fun.$.Future(_error.$AppError)(_user.$User)];

///////////////////////////////////////////////////////
//  Interpreter
///////////////////////////////////////////////////////

const { prop, compose, pipe, map, head, K } = _fun.S;

// getAll_I :: CommonListRequest -> Future DatabaseError (Array User)
const getAll_I = commonListReq => {
  const { page, take } = commonListReq;
  const sql = `SELECT id, email, fullname
               FROM users
               OFFSET $1
               LIMIT $2`;

  const offset = (page - 1) * take;
  const params = [offset, take];

  const queryResult = (0, _database.withConnection)((0, _database.query)(sql)(params));

  return compose(map(map(_user.User.of)))(map(prop('rows')))(queryResult);
};

// getByEmail_I :: String -> Future DatabaseError (Maybe User)
const getByEmail_I = email => {
  const sql = `SELECT id, email, fullname 
               FROM users 
               WHERE email = $1`;

  const params = [email];

  const queryResult = (0, _database.withConnection)((0, _database.query)(sql)(params));

  return pipe([map(prop('rows')), map(head), map(map(_user.User.of))])(queryResult);
};

// insert_I :: User -> Future DatabaseError User
const insert_I = user => {
  const sql = 'INSERT INTO users (id, email, password, fullname) VALUES ($1, $2, $3, $4)';
  const params = [user.id, user.email, user.password, user.fullname];

  const queryResult = (0, _database.withConnection)((0, _database.query)(sql)(params));

  return map(K(user))(queryResult);
};

///////////////////////////////////////////////////////
//  Export
///////////////////////////////////////////////////////

const getAll = (0, _fun.def)('getAll')({})(getAll_A)(getAll_I);

const getByEmail = (0, _fun.def)('getByEmail')({})(getByEmail_A)(getByEmail_I);

const insert = (0, _fun.def)('insert')({})(insert_A)(insert_I);

exports.default = {
  getAll,
  getByEmail,
  insert
};
//# sourceMappingURL=user-repository.js.map