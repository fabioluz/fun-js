import UserRepository from '../persistence/repositories/user-repository';

const env = {
  repositories: {
    user: UserRepository
  }
};

export default env;