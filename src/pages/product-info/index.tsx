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
  const { token } = theme.useToken();
  const [formKey, setFormKey] = useState(0);

  const handleSubmission = async (values: any) => {
    await createStuff(values);
    setFormKey(prevKey => prevKey + 1);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: token.colorBgBlur }}>
      <RedirectionButton
        btnText={formatMessage({ id: 'app.productInfo.redirectionBtn' })}
        linkAddress="/main-tables/product-info/products-list"
      />
      <MainInfo onSubmit={handleSubmission} showButton={true} key={formKey} />
    </div>
  );
}

export default ProductInfo;
