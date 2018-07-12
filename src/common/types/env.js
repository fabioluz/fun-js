import $ from 'sanctuary-def';

class Env {
  constructor (x) {
    this.repositories = x.repositories;
  }
}

const $Env = $.NullaryType
  ('fun_js/Env')
  ('?')
  (x => x instanceof Env);


  
export {
  Env,
  $Env
}