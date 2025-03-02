import type { MyTableColumnProps } from './type';

import { Table } from 'antd';
import dayjs from 'dayjs';

import { dateFormatMap, datetimeFormatMap, timeFormatMap } from './type';

// Custom helper function to get a nested value from an object using a path
function getPathValue(record: any, path: string | number | (string | number)[]) {
  if (!Array.isArray(path)) {
    path = String(path).split('.');
  }

  let value = record;

  for (const key of path) {
    if (value == null) return undefined;
    value = value[key];
  }

  return value;
}

const MyTableColumn = <RecordType extends object = object>(props: MyTableColumnProps<RecordType>) => {
  const { options, date, time, datetime, render, ...rest } = props;

  const renderContent = (value: any, record: RecordType, index: number): React.ReactNode => {
    if (!value) return '-';

    if ('datetime' in props) {
      const fmt = typeof datetime === 'string' ? datetime : 'second';
      const formatPattern = datetimeFormatMap[fmt];
      const parsed = dayjs(value, formatPattern);

      return parsed.isValid() ? parsed.format(formatPattern) : '-';
    } else if ('date' in props) {
      const fmt = typeof date === 'string' ? date : 'day';
      const formatPattern = dateFormatMap[fmt];
      const parsed = dayjs(value, formatPattern);

      return parsed.isValid() ? parsed.format(formatPattern) : '-';
    } else if ('time' in props) {
      const fmt = typeof time === 'string' ? time : 'second';
      const formatPattern = timeFormatMap[fmt];
      const parsed = dayjs(value, formatPattern);

      return parsed.isValid() ? parsed.format(formatPattern) : '-';
    }

    const dataIndex = props.dataIndex;
    // Narrow dataIndex to acceptable types for getPathValue
    const validDataIndex = typeof dataIndex === 'string' || typeof dataIndex === 'number' || Array.isArray(dataIndex);

    if (validDataIndex && options) {
      const data = options.find(
        item => item.value === getPathValue(record, dataIndex as string | number | (string | number)[]),
      );

      if (data) return data.label || '-';
    }

    return value;
  };

  return <Table.Column {...rest} key={props.dataIndex?.toString()} render={render || renderContent} />;
};

export default MyTableColumn;
