import React from 'react';

import ExcelButton from '@/components/custom/ExcelButton';
import ListComponent from '@/components/custom/ListComponent';

import GroupingSpecifications from '.';
import { ListOfGroupsColumns } from './ListOfGroupsColumns';
import { deleteExistanceCategory, getExistanceList, updateExistanceCategory } from './util';

function ListOfGroups() {
  return (
    <div style={{ overflow: 'hidden' }}>
      <ExcelButton />
      <ListComponent
        ModalComponent={GroupingSpecifications}
        columnsComponent={ListOfGroupsColumns}
        deleteEndpoint="/ExistenceCategory/delete"
        deleteId="123"
        getListEndpoint="/ExistenceCategory"
        updateEndpoint="/ExistenceCategory/edit"
        updateId="123"
        deleteValues={deleteExistanceCategory}
        getLists={getExistanceList}
        updateValues={updateExistanceCategory}
      />
    </div>
  );
}

export default ListOfGroups;
