'use strict';

var _env = require('./common/types/env');

var _user = require('./model/user');

var _userRepository = require('./persistence/repositories/user-repository');

var _userRepository2 = _interopRequireDefault(_userRepository);

var _userService = require('./service/user-service');

var _userService2 = _interopRequireDefault(_userService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const user = _user.User.of({
  id: 'asdf',
  email: 'asdfsad@sdfsd.df',
  password: 'asdfsdafsadf',
  fullname: 'asdfsadf'
});

const env = new _env.Env({
  repositories: {
    user: _userRepository2.default
  }
});

_userService2.default.getAll(1)(env).fork(console.error, console.log);
//# sourceMappingURL=server.js.map