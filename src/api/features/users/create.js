import { S } from '../../../fun';
import { run, formatValError } from '../../utils';
import UserService from '../../../service/user-service';

const { ifElse } = S;

// onResolve :: Context -> Next -> Void
const onResolve = ctx => next => users => {
  ctx.body = users;
  ctx.status = 200;
  next ();
};

// onReject :: Context -> Next -> Void
const onReject = ctx => next => error => {
  ctx.body = error;
  ctx.status = error.isSafe ? 422 : 500;
  next ();
};

const getAll = (ctx, next) =>
  run (UserService.create (ctx.request.body))
      (onResolve (ctx) (next))
      (onReject  (ctx) (next));


export default getAll;