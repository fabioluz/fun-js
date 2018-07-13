// import { S } from './fun';
// import { Env } from './common/types/env';
// import { User } from './model/user';
// import UserRepository from './persistence/repositories/user-repository';
// import UserService from './service/user-service';

// const user = User.of ({ 
//   id: 'asdf',
//   email: 'asdfsad@sdfsd.df',
//   password: 'asdfsdafsadf',
//   fullname: 'asdfsadf' 
// });

// const env = new Env ({
//   repositories: {
//     user: UserRepository
//   }
// });

// const reqParams  = {
//   take: 10,
//   page: 1,
//   search: S.toMaybe (null)
// };

// UserService
//   .getAll (reqParams) (env)
//   .fork (console.error, console.log);
import start from './api/index';

start();