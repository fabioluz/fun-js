import Migrations from 'postgres-migrations';
import { S, Future } from '../fun';

const { chain } = S;

const dbName = process.env.PGDATABASE;

const dbParams = {
  database: process.env.PGDATABASE,
  user : process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: Number (process.env.PGPORT)
}

const migrationPath = 'src/persistence/migrations';

const createDb = () => Future.encaseP2 (Migrations.createDb) (dbName, dbParams);

const migrate = () => Future.encaseP2 (Migrations.migrate) (dbParams, migrationPath);

const migration = chain (migrate) (createDb ());

migration.fork (
  error => console.error (`Error while running migration: ${error}`),
  () => console.log ('Migration succeeded.')
);