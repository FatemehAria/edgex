import React from 'react';

import ListComponent from '@/components/custom/ListComponent';

import ListOfProductsColumns from './ListOfProductsColumns';
import MainInfo from './main-info';

function ListOfProducts() {
  return (
    <div style={{ overflow: 'hidden', minHeight: ' 100vh' }}>
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
