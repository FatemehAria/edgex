import React from 'react';

import ListComponent from '@/components/custom/ListComponent';

import Home from '.';
import { ListOfProformaColumns } from './ListOfProformaColumns';

function ListOfProforma() {
  return (
    <div style={{ overflow: 'hidden', height: ' 100vh' }}>
      <ListComponent
        ModalComponent={Home}
        columnsComponent={ListOfProformaColumns}
        deleteEndpoint=""
        deleteId=""
        getListEndpoint="/getProformas"
        updateEndpoint="/update"
        updateId="123"
        deleteValues={() => console.log('delete proforma')}
        getLists={() => console.log('get proforma')}
        updateValues={() => console.log('update proforma')}
        createListItem={() => console.log('create proforma')}
      />
    </div>
  );
}

export default ListOfProforma;
