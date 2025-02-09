import type { FC } from 'react';

import 'driver.js/dist/driver.min.css';

import { Typography } from 'antd';

import { useLocale } from '@/locales';

const AdvancedSearch: FC = () => {
  const { formatMessage } = useLocale();

  return (
    <div className="guide-page ">
      <div className="innerText">
        <Typography className="guide-intro">{formatMessage({ id: 'app.advanced.intro' })}</Typography>
      </div>
    </div>
  );
};

export default AdvancedSearch;
