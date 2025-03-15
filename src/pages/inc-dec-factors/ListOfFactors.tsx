import ExcelButton from '@/components/custom/ExcelButton';
import ListComponent from '@/components/custom/ListComponent';

import IncDecFactors from '.';
import ListOfFactorsColumns from './ListOfFactorsColumns';
import { getFactrosList } from './util';

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
        updateEndpoint="/updat"
        updateId="123"
        deleteValues={() => console.log('delete factor')}
        getLists={getFactrosList}
        updateValues={() => console.log('update list')}
      />
    </div>
  );
}

export default ListOfFactors;
