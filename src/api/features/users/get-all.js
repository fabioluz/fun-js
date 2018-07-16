import { S } from '../../../fun';
import { run } from '../../utils';
import UserService from '../../../service/user-service';

const { toMaybe } = S;

// onResolve :: Context -> Next -> Array Users -> Void
const onResolve = ctx => next => users => {
  ctx.body = users;
  ctx.status = 200;
  next ();
};

// onResolve :: Context -> Next -> AppError -> Void
const onReject = ctx => next => error => {
  ctx.body = error;
  ctx.status = 500;
  next ();
};

const getAll = (ctx, next) => {
  const params = {
    page: 1, //to be implemented
    take: 10, //to be implemented
    search: toMaybe (null) //to be implemented
  };

  return run (UserService.getAll (params))
             (onResolve (ctx) (next))
             (onReject  (ctx) (next));
};

export default getAll;