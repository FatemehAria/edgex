import { theme } from 'antd';
import React from 'react';

import ListButtons from '@/components/custom/ListButtons';
import ListComponent from '@/components/custom/ListComponent';

import GroupForm from './GroupForm';
import { ListOfGroupsColumns } from './ListOfGroupsColumns';
import { createCategory, deleteGroup, getGroupList, updateGroup } from './util';

function ListOfGroups() {
  const { token } = theme.useToken();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: token.colorBgBlur }}>
      <ListButtons route="https://localhost:7214/api/ExistenceCategory/export-excel" title="category_export" />
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
