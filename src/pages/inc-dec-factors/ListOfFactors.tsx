import ExcelButton from '@/components/custom/ExcelButton';
import ListComponent from '@/components/custom/ListComponent';

import IncDecFactors from '.';
import ListOfFactorsColumns from './ListOfFactorsColumns';

function ListOfFactors() {
  return (
    <div style={{ overflow: 'hidden', minHeight: ' 100vh' }}>
      <ExcelButton />
      <ListComponent
        ModalComponent={IncDecFactors}
        columnsComponent={ListOfFactorsColumns}
        deleteEndpoint="/delete"
        deleteId="123"
        getListEndpoint="/get"
        updateEndpoint="/updat"
        updateId="123"
      />
    </div>
  );
}

export default ListOfFactors;
