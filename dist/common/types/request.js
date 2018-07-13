'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$CommonListRequest = undefined;

var _fun = require('../../fun');

const $CommonListRequest = exports.$CommonListRequest = _fun.$.RecordType({
  page: _fun.$.PositiveInteger,
  take: _fun.$.PositiveInteger,
  search: _fun.$.Maybe(_fun.$.String)
});
//# sourceMappingURL=request.js.map