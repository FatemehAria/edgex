import ExcelButton from '@/components/custom/ExcelButton';
import ListComponent from '@/components/custom/ListComponent';

import IncDecFactors from '.';
import ListOfFactorsColumns from './ListOfFactorsColumns';
import { getFactrosList, updateFactor } from './util';

function ListOfFactors() {
  return (
    <div style={{ overflow: 'hidden', height: ' 100vh' }}>
      <ExcelButton />
      <ListComponent
        ModalComponent={IncDecFactors}
        columnsComponent={ListOfFactorsColumns}
        deleteEndpoint="/delete"
        deleteId="123"
        getListEndpoint="/AgentsReducingIncreasing"
        updateEndpoint="/AgentsReducingIncreasing/edit"
        updateId="123"
        deleteValues={() => console.log('delete factor')}
        getLists={getFactrosList}
        updateValues={updateFactor}
      />
    </div>
  );
}

export default ListOfFactors;
