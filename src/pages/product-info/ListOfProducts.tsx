import { theme } from 'antd';
import React, { useState } from 'react';

import ListButtons from '@/components/custom/ListButtons';
import ListComponent from '@/components/custom/ListComponent';

import ListOfProductsColumns from './ListOfProductsColumns';
import MainInfo from './main-info';
import { createStuff, deleteProduct, updateStuff } from './main-info/util';
import ProductInfoEdit from './ProductInfoEdit';
import { getProductsList } from './util';

function ListOfProducts() {
  const { token } = theme.useToken();
  const [groupValue, setGroupValue] = useState<any[]>([]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: token.colorBgBlur }}>
      <ListButtons />
      <ListComponent
        ModalComponent={ProductInfoEdit}
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
        groupValue={groupValue}
        setGroupValue={setGroupValue}
        catId={groupValue}
      />
    </div>
  );
}

export default ListOfProducts;
