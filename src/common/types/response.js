import { $ } from '../../fun';

class UserResponse {
  constructor (x) {
    this.id = x.id;
    this.email = x.email;
    this.fullname = x.fullname;
  }

  static of (x) {
    return new UserResponse (x);
  }
}

const $UserResponse = $.NullaryType
  ('fun_js/UserResponse')
  ('?')
  (x => x instanceof UserResponse);

export {
  UserResponse,
  $UserResponse
}