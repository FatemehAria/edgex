import ExcelButton from '@/components/custom/ExcelButton';
import ListComponent from '@/components/custom/ListComponent';

import IncDecFactors from '.';
import ListOfFactorsColumns from './ListOfFactorsColumns';
import { createFactor, deleteFactor, getFactrosList, updateFactor } from './util';

function ListOfFactors() {
  return (
    <div style={{ overflow: 'hidden' }}>
      <ExcelButton />
      <ListComponent
        ModalComponent={IncDecFactors}
        columnsComponent={ListOfFactorsColumns}
        deleteEndpoint="/AgentsReducingIncreasing/delete"
        deleteId="123"
        getListEndpoint="/AgentsReducingIncreasing"
        updateEndpoint="/AgentsReducingIncreasing/edit"
        updateId="123"
        deleteValues={deleteFactor}
        getLists={getFactrosList}
        updateValues={updateFactor}
        createListItem={createFactor}
      />
    </div>
  );
}

export default ListOfFactors;
