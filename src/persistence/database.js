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

const { chainRej } = S;

// toDatabaseError :: Error -> Future DatabaseError a
const toDatabaseError = error => Future.reject (DatabaseError.of (error));

// withConnection_I :: Client -> Future a b
const withConnection_I = Future.hook (
  openConnection(),
  closeConnection
);

// query_I :: String -> [Any] -> Client -> Future DatabseError QueryResult
const query_I = sql => params => client => {
  const exec = Future.encaseP2 (client.query.bind(client));
  return chainRej (toDatabaseError) (exec (sql, params));
};



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