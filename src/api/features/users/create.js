import { S } from '../../../fun';
import { run, formatValError } from '../../utils';
import UserService from '../../../service/user-service';
import { ValidationError } from '../../../common/types/error';

const { K, ifElse } = S;

// getErrorStatus :: AppError -> Number
const getErrorStatus = ifElse
                       (x => x instanceof ValidationError)
                       (K (422)) (K (500));

// onResolve :: Context -> Next -> Array Users -> Void
const onResolve = ctx => next => users => {
  ctx.body = users;
  ctx.status = 200;
  next ();
};

// onReject :: Context -> Next -> AppError -> Void
const onReject = ctx => next => error => {
  ctx.body = error;
  ctx.status = getErrorStatus (error);
  next ();
};

const getAll = (ctx, next) =>
  run (UserService.create (ctx.request.body))
      (onResolve (ctx) (next))
      (onReject  (ctx) (next));


export default getAll;