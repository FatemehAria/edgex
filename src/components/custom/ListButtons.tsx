import React from 'react';

import BackButton from './BackButton';
import ExcelButton from './ExcelButton';

function ListButtons() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <ExcelButton />
      <BackButton />
    </div>
  );
}

export default ListButtons;
