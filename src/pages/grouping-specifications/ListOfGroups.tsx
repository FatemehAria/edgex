import React from 'react';

import ExcelButton from '@/components/custom/ExcelButton';
import ListComponent from '@/components/custom/ListComponent';

import GroupingSpecifications from '.';
import { ListOfGroupsColumns } from './ListOfGroupsColumns';

function ListOfGroups() {
  return (
    <div style={{ overflow: 'hidden', minHeight: ' 100vh' }}>
      <ExcelButton />
      <ListComponent
        ModalComponent={GroupingSpecifications}
        columnsComponent={ListOfGroupsColumns}
        deleteEndpoint="/delete"
        deleteId="123"
        getListEndpoint="/getListOfPerson"
        updateEndpoint="/updateListOfPerson"
        updateId="123"
      />
    </div>
  );
}

export default ListOfGroups;
