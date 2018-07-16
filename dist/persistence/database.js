'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.query = exports.withConnection = undefined;

var _pg = require('pg');

var _fun = require('../fun');

var _error = require('../common/types/error');

/////////////////////////////////////////////////////
//  Connection
/////////////////////////////////////////////////////

const pool = new _pg.Pool();

// openConnection :: () -> Future a Client
const openConnection = _fun.Future.encaseP(pool.connect.bind(pool));

// closeConnection :: Client -> Future a Void
const closeConnection = client => _fun.Future.of(client.release());

/////////////////////////////////////////////////////
//  Algebra
/////////////////////////////////////////////////////

const withConnection_A = [_fun.$.Any, _fun.$.Future(_error.$DatabaseError)(_fun.$.Any)];

const query_A = [_fun.$.String, _fun.$.Any, _fun.$.Object, _fun.$.Future(_error.$DatabaseError)(_fun.$.Object)];

/////////////////////////////////////////////////////
//  Interpreter
/////////////////////////////////////////////////////

const { compose, chainRej } = _fun.S;

// withConnection_I :: Client -> Future a b
const withConnection_I = _fun.Future.hook(openConnection(), closeConnection);

// toDatabaseError :: Error -> Future DatabaseError a
// const toDatabaseError = error => Future.reject (DatabaseError.of (error));
const toDatabaseError = compose(_fun.Future.reject)(_error.DatabaseError.of);

// exec :: String -> Array Any -> Client -> Future DatabseError QueryResult
const exec = sql => params => client => _fun.Future.encaseP2(client.query.bind(client))(sql)(params);

// query_I :: String -> Array Any -> Client -> Future DatabseError QueryResult
const query_I = sql => params => compose(chainRej(toDatabaseError))(exec(sql)(params));

////////////////////////////////////////////////////
//  Export
////////////////////////////////////////////////////

const withConnection = exports.withConnection = (0, _fun.def)('withConnection')({})(withConnection_A)(withConnection_I);

const query = exports.query = (0, _fun.def)('query')({})(query_A)(query_I);
//# sourceMappingURL=database.js.map