import UUID from 'uuid/v4';
import bcrypt from 'bcryptjs';
import { $, S, Future, def } from '../fun';
import { $ValidationError } from '../common/types/error';
import { 
  validateString, 
  notEmpty, 
  minLength, 
  maxLength,
  email
} from '../common/validation/string-validators';

////////////////////////////////////////////////////
//  Class Definition
////////////////////////////////////////////////////

class User {
  constructor (x) {
    this.id = x.id;
    this.email = x.email;
    this.password = x.password;
    this.fullname = x.fullname;
  }

  with (obj) {
    const newUser = Object.assign ({}, this);
    for (let key in obj) {
      newUser[key] = obj[key];
    }

    return User.of (newUser);
  }

  static of (x) {
    return new User (x);
  }
}

const $User = $.NullaryType 
  ('fun_js/User')
  ('') 
  (x => x instanceof User);



////////////////////////////////////////////////////
//  Algebra
////////////////////////////////////////////////////

const validateUser_A = [ $.Object, $.Future ($ValidationError) ($User) ];

const encryptUser_A = [ $User, $.Future ($ValidationError) ($User) ];



////////////////////////////////////////////////////
//  Interpreter
////////////////////////////////////////////////////

const { prop, map, lift3, pipe, eitherToFuture } = S;

// createUser :: String -> String -> String -> User
const createUser = email => password => fullname => 
  User.of ({ id: UUID (), email, password, fullname });

// encrypt :: Number -> String -> Future Error String
const encrypt = salt => str => 
  Future.encaseN2 (bcrypt.hash) (str) (salt);

// validateEmail :: String -> Either ValidationError String
const validateEmail = validateString
                      ([notEmpty, maxLength (50), email])
                      ('Email');

// validatePassword :: String -> Either ValidationError String
const validatePassword = validateString 
                         ([notEmpty, minLength (6), maxLength (50)])
                         ('Password');

// validateFullname :: String -> Either ValidationError String
const validateFullname = validateString 
                         ([notEmpty, maxLength (50)])
                         ('Fullname');

// validateUser_I :: Object -> Future ValidationError User
const validateUser_I = input => 
  eitherToFuture (
    lift3 (createUser)
          (validateEmail (input.email))
          (validatePassword (input.password))
          (validateFullname (input.fullname))
  );

// transformPassword :: User -> String -> User
const transformPassword = user => password => 
  user.with ({ password });

// encryptUser_I :: User -> Future ValidationError User
const encryptUser_I = user => 
  pipe ([
    prop ('password'),
    encrypt (10),
    map (transformPassword (user))
  ]) (user);



////////////////////////////////////////////////////
//  Export 
////////////////////////////////////////////////////

const validateUser = 
  def ('validateUser')
      ({})
      (validateUser_A)
      (validateUser_I); 

const encryptUser =
  def ('encryptUser')
      ({})
      (encryptUser_A)
      (encryptUser_I);

export {
  User,
  $User,
  validateUser,
  encryptUser
}