import { S } from '../../fun';

const { compose, prop, allPass, gte, lte, equals } = S;

// isValError :: Context -> Boolean
const isValError = compose (equals (422))
                           (prop ('status'));

// isSuccess :: Context -> Boolean
const isSuccess = compose (allPass ([gte (200), lte (299)]))
                          (prop ('status'));

// errorFormatter :: Middleware
const errorFormatter = (ctx, next) => {
  if (isSuccess (ctx)) {
    return next ();
  }

  if (isValError (ctx)) {
    ctx.body = { error: ctx.body.value };
    return next ();
  }

  // ctx.app.emit ('error', error, ctx);
  console.error (ctx.body.stack);
  ctx.status = 500;
  ctx.body = {};
  next ();
};

export default () => errorFormatter;