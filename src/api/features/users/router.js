import Router from 'koa-router';
import { S } from '../../../fun';
import { prefix, get, post } from '../../utils';
import getAll from './get-all';
import create from './create';

const { pipe } = S;

const config = [
  prefix ('/api/users'),
  get ('/') (getAll),
  post ('/') (create)
]

const router = pipe (config) (Router());

export default router;