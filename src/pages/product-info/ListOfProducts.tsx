import React from 'react';

import ExcelButton from '@/components/custom/ExcelButton';
import ListComponent from '@/components/custom/ListComponent';

import ListOfProductsColumns from './ListOfProductsColumns';
import MainInfo from './main-info';

function ListOfProducts() {
  return (
    <div style={{ overflow: 'hidden', height: ' 100vh' }}>
      <ExcelButton />
      <ListComponent
        ModalComponent={MainInfo}
        columnsComponent={ListOfProductsColumns}
        deleteEndpoint="/delete"
        deleteId="123"
        getListEndpoint="/get"
        updateEndpoint="/update"
        updateId="123"
      />
    </div>
  );
}

export default ListOfProducts;
