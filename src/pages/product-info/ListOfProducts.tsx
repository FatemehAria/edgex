import React from 'react';

import ExcelButton from '@/components/custom/ExcelButton';
import ListComponent from '@/components/custom/ListComponent';

import ListOfProductsColumns from './ListOfProductsColumns';
import MainInfo from './main-info';
import { getProductsList } from './util';

function ListOfProducts() {
  return (
    <div style={{ overflow: 'hidden', height: ' 100vh' }}>
      <ExcelButton />
      <ListComponent
        ModalComponent={MainInfo}
        columnsComponent={ListOfProductsColumns}
        deleteEndpoint="/delete"
        deleteId="123"
        getListEndpoint="/Stuff"
        updateEndpoint="/update"
        updateId="123"
        deleteValues={() => console.log('delete product')}
        getLists={getProductsList}
        updateValues={() => console.log('update product')}
      />
    </div>
  );
}

export default ListOfProducts;
