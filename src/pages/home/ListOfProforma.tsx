import { useContext } from 'react';

import ListButtons from '@/components/custom/ListButtons';
import ListComponent from '@/components/custom/ListComponent';

import { IsEdittingProformaContext } from './context/IsEdittingProformaContext';
import { ListOfProformaColumns } from './ListOfProformaColumns';
import ListOfProformaEdit from './ListOfProformaEdit';
import { deleteProforma, getProformaList } from './util';

function ListOfProforma() {

  return (
    <div style={{ minHeight: ' 100vh' }}>
      <ListButtons />
      <ListComponent
        ModalComponent={ListOfProformaEdit}
        columnsComponent={ListOfProformaColumns}
        deleteEndpoint="/PerformaInvoiceHeader/delete"
        deleteId=""
        getListEndpoint="/PerformaInvoiceHeader"
        updateEndpoint="/update"
        updateId="123"
        deleteValues={deleteProforma}
        getLists={getProformaList}
        updateValues={() => console.log('update proforma')}
        createListItem={() => console.log('create proforma')}
      />
    </div>
  );
}

export default ListOfProforma;
