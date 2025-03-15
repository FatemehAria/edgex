import React from 'react';

import ListComponent from '@/components/custom/ListComponent';

import { ListOfProformaColumns } from './ListOfProformaColumns';

function ListOfProforma() {
  return (
    <div style={{ overflow: 'hidden', minHeight: ' 100vh' }}>
      <ListComponent
        ModalComponent={ListOfProforma}
        columnsComponent={ListOfProformaColumns}
        deleteEndpoint=""
        deleteId=""
        getListEndpoint="/getProformas"
        updateEndpoint=""
        updateId=""
      />
    </div>
  );
}

export default ListOfProforma;
