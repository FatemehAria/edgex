import React from 'react';

import ListButtons from '@/components/custom/ListButtons';
import ListComponent from '@/components/custom/ListComponent';

import ListOfProductsColumns from './ListOfProductsColumns';
import MainInfo from './main-info';
import { createStuff, deleteProduct, updateStuff } from './main-info/util';
import { getProductsList } from './util';

function ListOfProducts() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <ListButtons />
      <ListComponent
        ModalComponent={MainInfo}
        columnsComponent={ListOfProductsColumns}
        deleteEndpoint="/Stuff/delete"
        deleteId="123"
        getListEndpoint="/Stuff"
        updateEndpoint="/Stuff/edit"
        updateId="123"
        deleteValues={deleteProduct}
        getLists={getProductsList}
        updateValues={updateStuff}
        createListItem={createStuff}
      />
    </div>
  );
}

export default ListOfProducts;
