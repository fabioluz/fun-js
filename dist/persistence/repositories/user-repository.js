'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fun = require('../../fun');

var _error = require('../../common/types/error');

var _user = require('../../model/user');

var _database = require('../database');

///////////////////////////////////////////////////////
//  Algebra
///////////////////////////////////////////////////////

const getAll_A = [_fun.$.PositiveInteger, _fun.$.Future(_error.$AppError)(_fun.$.Array(_fun.$.Object))];

const insert_A = [_user.$User, _fun.$.Future(_error.$AppError)(_user.$User)];

///////////////////////////////////////////////////////
//  Interpreter
///////////////////////////////////////////////////////

const { map } = _fun.S;

const TAKE_AMOUNT = 10;

// getAll_I :: Number -> Future DatabaseError (Array Object)
const getAll_I = page => {
  const sql = `SELECT id, email, fullname 
               FROM users
               OFFSET $1
               LIMIT $2`;

  const skip = (page - 1) * TAKE_AMOUNT;
  const params = [skip, TAKE_AMOUNT];

  const queryResult = (0, _database.withConnection)((0, _database.query)(sql)(params));
  return map(result => result.rows)(queryResult);
};

// insert_I :: User -> Future DatabaseError User
const insert_I = user => {
  const sql = 'INSERT INTO users (id, email, password, fullname) VALUES ($1, $2, $3, $4)';
  const params = [user.id, user.email, user.password, user.fullname];

  const queryResult = (0, _database.withConnection)((0, _database.query)(sql)(params));
  return map(_ => user)(queryResult);
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