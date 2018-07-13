import Koa from 'koa';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import errorFormatter from './middlewares/error-formatter';
import users from './features/users/router';

const start = () => {
  const app = new Koa ();

  app.use (logger ())
     .use (bodyParser ())
     .use (users.routes ())
     .use (users.allowedMethods ())
     .use (errorFormatter ())
     .listen (process.env.APP_PORT);

  console.log ('The app is running from port 3000');
};

export default start;