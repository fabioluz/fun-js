import Migrations from 'postgres-migrations';
import { S, Future } from '../fun';

const { chain } = S;

const dbName = process.env.DB_NAME;

const dbParams = {
  database: process.env.DB_NAME,
  user : process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number (process.env.DB_PORT)
}

const migrationPath = 'src/persistence/migrations';

const createDb = () => Future.encaseP2 (Migrations.createDb) (dbName, dbParams);

const migrate = () => Future.encaseP2 (Migrations.migrate) (dbParams, migrationPath);

const migration = chain (migrate) (createDb ());

migration.fork (
  error => console.error (`Error while running migration: ${error}`),
  () => console.log ('Migration succeeded.')
);