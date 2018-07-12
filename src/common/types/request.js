import { $ } from '../../fun';

export const $CommonListRequest = $.RecordType ({
  page: $.PositiveInteger,
  take: $.PositiveInteger,
  search: $.Maybe ($.String)
});
