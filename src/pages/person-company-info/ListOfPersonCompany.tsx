import './index.css';

import ExcelButton from '@/components/custom/ExcelButton';
import ListComponent from '@/components/custom/ListComponent';

import { ListOfPersonTableColumns } from './ListOfPersonTableColumns';
import PersonCompanyInfo from './PersonCompanyInfo';

function ListOfPersonCompany() {
  return (
    <div style={{ overflow: 'hidden', height: ' 100vh' }}>
      <ExcelButton />
      <ListComponent
        ModalComponent={PersonCompanyInfo}
        columnsComponent={ListOfPersonTableColumns}
        deleteEndpoint="/delete"
        deleteId="123"
        getListEndpoint="/CompanyPerson"
        updateEndpoint="/CompanyPerson/edit"
        updateId="123"
      />
      {/* <Table
        dataSource={tableData}
        columns={columns}
        pagination={false}
        className="custom-footer-table"
        // scroll={{ x: 2000 }}
      />
      <Modal title="ویرایش اطلاعات" open={isEditModalOpen} onCancel={() => setIsEditModalOpen(false)} footer={null}>
        <PersonCompanyInfo initialValues={selectedRowForEdit || {}} onSubmit={handleUpdate} showButton={true} />
      </Modal> */}
    </div>
  );
}

export default ListOfPersonCompany;
