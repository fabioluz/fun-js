'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$UserResponse = exports.UserResponse = undefined;

var _fun = require('../../fun');

class UserResponse {
  constructor(x) {
    this.id = x.id;
    this.email = x.email;
    this.fullname = x.fullname;
  }

  static of(x) {
    return new UserResponse(x);
  }
}

const $UserResponse = _fun.$.NullaryType('fun_js/UserResponse')('?')(x => x instanceof UserResponse);

exports.UserResponse = UserResponse;
exports.$UserResponse = $UserResponse;
//# sourceMappingURL=response.js.map