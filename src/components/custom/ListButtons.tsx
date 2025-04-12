import React from 'react';
import { useSelector } from 'react-redux';

import BackButton from './BackButton';
import ExcelButton from './ExcelButton';

function ListButtons({ route, title }: { route: string; title: string }) {
  const { locale } = useSelector(state => state.user);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: `${locale === 'en_US' ? 'row-reverse' : 'row'}`,
      }}
    >
      <ExcelButton route={route} title={title} />
      <BackButton />
    </div>
  );
}

export default ListButtons;
