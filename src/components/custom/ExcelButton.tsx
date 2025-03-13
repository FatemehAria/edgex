import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'antd';
import React from 'react';

import { useLocale } from '@/locales';

function ExcelButton() {
  const { formatMessage } = useLocale();

  return (
    <Tooltip
      title={formatMessage({
        id: 'gloabal.tips.excel',
      })}
    >
      <FontAwesomeIcon icon={faFileExcel} fontSize={16} color="green" fontWeight={700} />
    </Tooltip>
  );
}

export default ExcelButton;
