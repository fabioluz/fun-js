'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fun = require('../../fun');

var _error = require('../../common/types/error');

var _request = require('../../common/types/request');

var _response = require('../../common/types/response');

var _user = require('../../model/user');

var _database = require('../database');

///////////////////////////////////////////////////////
//  Algebra
///////////////////////////////////////////////////////

const getAll_A = [_request.$CommonListRequest, _fun.$.Future(_error.$AppError)(_fun.$.Array(_response.$UserResponse))];

const insert_A = [_user.$User, _fun.$.Future(_error.$AppError)(_user.$User)];

///////////////////////////////////////////////////////
//  Interpreter
///////////////////////////////////////////////////////

const { prop, compose, map, K } = _fun.S;

// getAll_I :: CommonListRequest -> Future DatabaseError (Array UserResponse)
const getAll_I = commonListReq => {
  const { page, take } = commonListReq;
  const sql = `SELECT id, email, fullname
               FROM users
               OFFSET $1
               LIMIT $2`;

  const offset = (page - 1) * take;
  const params = [offset, take];

  const queryResult = (0, _database.withConnection)((0, _database.query)(sql)(params));

  return compose(map(map(_response.UserResponse.of)))(map(prop('rows')))(queryResult);
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

const insert = (0, _fun.def)('insert')({})(insert_A)(insert_I);

exports.default = {
  getAll,
  insert
};
//# sourceMappingURL=user-repository.js.map