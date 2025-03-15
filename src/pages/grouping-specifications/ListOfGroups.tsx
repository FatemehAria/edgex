import React from 'react';

import ExcelButton from '@/components/custom/ExcelButton';
import ListComponent from '@/components/custom/ListComponent';

import GroupingSpecifications from '.';
import { ListOfGroupsColumns } from './ListOfGroupsColumns';

function ListOfGroups() {
  return (
    <div style={{ overflow: 'hidden', height: ' 100vh' }}>
      <ExcelButton />
      <ListComponent
        ModalComponent={GroupingSpecifications}
        columnsComponent={ListOfGroupsColumns}
        deleteEndpoint="/delete"
        deleteId="123"
        getListEndpoint="/getListOfPerson"
        updateEndpoint="/updateListOfPerson"
        updateId="123"
        deleteValues={() => console.log('delete Group')}
        getLists={() => console.log('get Groups')}
        updateValues={() => console.log('update Group')}
      />
    </div>
  );
}

export default ListOfGroups;
