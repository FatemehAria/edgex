import React from 'react';
import { useSelector } from 'react-redux';

import BackButton from './BackButton';
import ExcelButton from './ExcelButton';

function ListButtons() {
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
      <ExcelButton />
      <BackButton />
    </div>
  );
}

export default ListButtons;
