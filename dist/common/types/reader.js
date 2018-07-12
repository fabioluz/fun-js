'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$Reader = exports.Reader = undefined;

var _sanctuaryDef = require('sanctuary-def');

var _sanctuaryDef2 = _interopRequireDefault(_sanctuaryDef);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Reader :: a -> Reader a
const Reader = computation => {
  const reader = Object.create(Reader$prototype);
  reader.computation = computation;
  return reader;
};

Reader['@@type'] = 'fun_js/Reader';
Reader['ask'] = () => Reader(x => x);
Reader['of'] = x => Reader(() => x);

const Reader$prototype = {
  'constructor': Reader,
  '@@show': function () {
    return `Reader`;
  },
  'run': function (ctx) {
    return this.computation(ctx);
  },
  'map': function (f) {
    return Reader(ctx => f(this.run(ctx)));
  },
  'chain': function (f) {
    return Reader(ctx => f(this.run(ctx)).run(ctx));
  },
  'ap': function (f) {
    return Reader(ctx => this.run(ctx)(f.run(ctx)));
  },
  'fantasy-land/of': function (f) {
    return this.of(f);
  },
  'fantasy-land/chain': function (f) {
    return this.chain(f);
  },
  'fantasy-land/map': function (f) {
    return this.map(f);
  },
  'fantasy-land/ap': function (f) {
    return this.ap(f);
  }
};

const $Reader = _sanctuaryDef2.default.BinaryType(Reader['@@type'])('?')(x => Reader['@@type'] === 'fun_js/Reader')(reader => [reader.computation])(reader => [reader.computation]);

exports.Reader = Reader;
exports.$Reader = $Reader;
//# sourceMappingURL=reader.js.map