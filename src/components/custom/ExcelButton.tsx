import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'antd';
import React from 'react';

import { useLocale } from '@/locales';
import { getExcelReport } from '@/utils/util';

function ExcelButton({ route, title }: { route: string; title: string }) {
  const { formatMessage } = useLocale();

  return (
    <Tooltip
      title={formatMessage({
        id: 'gloabal.tips.excel',
      })}
    >
      <FontAwesomeIcon
        icon={faFileExcel}
        fontSize={20}
        color="#2f7d32"
        fontWeight={700}
        style={{ margin: '1rem 0' }}
        onClick={() => getExcelReport(route, title)}
        cursor="pointer"
      />
    </Tooltip>
  );
}

export default ExcelButton;
