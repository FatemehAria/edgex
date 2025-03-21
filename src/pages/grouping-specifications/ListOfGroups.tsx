import React from 'react';

import ExcelButton from '@/components/custom/ExcelButton';
import ListComponent from '@/components/custom/ListComponent';

import GroupForm from './GroupForm';
import { ListOfGroupsColumns } from './ListOfGroupsColumns';
import { createCategory, deleteGroup, getGroupList, updateGroup } from './util';

function ListOfGroups() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <ExcelButton />
      <ListComponent
        ModalComponent={GroupForm}
        columnsComponent={ListOfGroupsColumns}
        deleteEndpoint="/ExistenceCategory/delete"
        deleteId="123"
        getListEndpoint="/ExistenceCategory"
        updateEndpoint="/ExistenceCategory/edit"
        updateId="123"
        deleteValues={deleteGroup}
        getLists={getGroupList}
        updateValues={updateGroup}
        createListItem={createCategory}
      />
    </div>
  );
}

export default ListOfGroups;
