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
      />
    </div>
  );
}

export default ListOfProforma;
