import { Pool } from 'pg';
import { $, S, Future, def } from '../fun';
import { $DatabaseError, DatabaseError } from '../common/types/error';

/////////////////////////////////////////////////////
//  Connection
/////////////////////////////////////////////////////

const pool = new Pool();

// openConnection :: () -> Future a Client
const openConnection = Future.encaseP (pool.connect.bind(pool));

// closeConnection :: Client -> Future a Void
const closeConnection = client => Future.of (client.release());



/////////////////////////////////////////////////////
//  Algebra
/////////////////////////////////////////////////////

const withConnection_A = [ $.Any, $.Future ($DatabaseError) ($.Any) ];

const query_A = [ $.String, $.Any, $.Object, $.Future ($DatabaseError) ($.Object) ];



/////////////////////////////////////////////////////
//  Interpreter
/////////////////////////////////////////////////////

const { compose, chainRej } = S;

// withConnection_I :: Client -> Future a b
const withConnection_I = Future.hook (
  openConnection(),
  closeConnection
);

// toDatabaseError :: Error -> Future DatabaseError a
// const toDatabaseError = error => Future.reject (DatabaseError.of (error));
const toDatabaseError = compose (Future.reject) (DatabaseError.of);

// exec :: String -> Array Any -> Client -> Future DatabseError QueryResult
const exec = sql => params => client =>
  Future.encaseP2 (client.query.bind(client)) (sql) (params);

// query_I :: String -> Array Any -> Client -> Future DatabseError QueryResult
const query_I = sql => params =>
  compose (chainRej (toDatabaseError))
          (exec (sql) (params));


////////////////////////////////////////////////////
//  Export
////////////////////////////////////////////////////

export const withConnection = 
  def ('withConnection')
      ({})
      (withConnection_A)
      (withConnection_I);

export const query = 
  def ('query')
      ({})
      (query_A)
      (query_I);