'use strict';

var _postgresMigrations = require('postgres-migrations');

var _postgresMigrations2 = _interopRequireDefault(_postgresMigrations);

var _fun = require('../fun');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { chain } = _fun.S;

const dbName = process.env.DB_NAME;

const dbParams = {
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT)
};

const migrationPath = 'src/persistence/migrations';

const createDb = () => _fun.Future.encaseP2(_postgresMigrations2.default.createDb)(dbName, dbParams);

const migrate = () => _fun.Future.encaseP2(_postgresMigrations2.default.migrate)(dbParams, migrationPath);

const migration = chain(migrate)(createDb());

migration.fork(error => console.error(`Error while running migration: ${error}`), () => console.log('Migration succeeded.'));
//# sourceMappingURL=migrator.js.map