import ListButtons from '@/components/custom/ListButtons';
import ListComponent from '@/components/custom/ListComponent';

import { ListOfProformaColumns } from './ListOfProformaColumns';
import ListOfProformaEdit from './ListOfProformaEdit';
import { deleteProforma, getProformaList } from './util';

function ListOfProforma() {
  return (
    <div style={{ minHeight: ' 100vh' }}>
      <ListButtons
        route="https://localhost:7214/api/ReportPerformaInvoiceHeaderDetail/export-excel"
        title="proforma_export"
      />
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
