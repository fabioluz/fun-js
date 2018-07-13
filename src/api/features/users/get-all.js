import { S } from '../../../fun';
import { run } from '../../utils';
import UserService from '../../../service/user-service';

const { toMaybe } = S;

// onResolve :: Context -> Next -> Void
const onResolve = ctx => next => users => {
  ctx.body = users;
  ctx.status = 200;
  next ();
};

// onResolve :: Context -> Next -> Void
const onReject = ctx => next => error => {
  ctx.body = error;
  ctx.status = 500;
  next ();
};

const getAll = (ctx, next) => {
  const params = {
    page: 1,
    take: 10,
    search: toMaybe (null)
  };

  return run (UserService.getAll (params))
             (onResolve (ctx) (next))
             (onReject  (ctx) (next));
};

export default getAll;