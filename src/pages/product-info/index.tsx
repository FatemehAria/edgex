import '@/styles/product-info.css';

import { theme } from 'antd';
import { useState } from 'react';

import RedirectionButton from '@/components/custom/RedirectionButton';
import { useLocale } from '@/locales';

import Grouping from './grouping';
import MainInfo from './main-info';
import { createStuff } from './main-info/util';

function ProductInfo() {
  const { formatMessage } = useLocale();
  const [groupValue, setGroupValue] = useState<any[]>([]);
  const { token } = theme.useToken();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: token.colorBgBlur }}>
      <RedirectionButton
        btnText={formatMessage({ id: 'app.productInfo.redirectionBtn' })}
        linkAddress="/main-tables/product-info/products-list"
      />
      <MainInfo onSubmit={values => createStuff(values, groupValue)} showButton={true}>
        <Grouping groupValue={groupValue} setGroupValue={setGroupValue} />
      </MainInfo>
    </div>
  );
}

export default ProductInfo;
