'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _userRepository = require('../persistence/repositories/user-repository');

var _userRepository2 = _interopRequireDefault(_userRepository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const env = {
  repositories: {
    user: _userRepository2.default
  }
};

exports.default = env;
//# sourceMappingURL=dependency-resolver.js.map