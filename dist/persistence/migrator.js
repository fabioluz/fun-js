'use strict';

var _postgresMigrations = require('postgres-migrations');

var _postgresMigrations2 = _interopRequireDefault(_postgresMigrations);

var _fun = require('../fun');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { chain } = _fun.S;

const dbName = process.env.PGDATABASE;

const dbParams = {
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT)
};

const migrationPath = 'src/persistence/migrations';

const createDb = () => _fun.Future.encaseP2(_postgresMigrations2.default.createDb)(dbName, dbParams);

const migrate = () => _fun.Future.encaseP2(_postgresMigrations2.default.migrate)(dbParams, migrationPath);

// execute migration
createDb().chain(migrate).fork(error => console.error(`Error while running migration: ${error}`), () => console.log('Migration succeeded.'));
//# sourceMappingURL=migrator.js.map