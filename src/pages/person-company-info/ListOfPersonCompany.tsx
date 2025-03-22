import './index.css';

import ListButtons from '@/components/custom/ListButtons';
import ListComponent from '@/components/custom/ListComponent';

import { ListOfPersonTableColumns } from './ListOfPersonTableColumns';
import PersonCompanyInfo from './PersonCompanyInfo';
import { createCostumer, deleteCompanyPerson, getLists, updateValues } from './util';

function ListOfPersonCompany() {
  const transformMergedData = (data: any) => {
    return {
      id: data.ID, // mapping uppercase to lowercase
      code: data.Code || 0,
      personTypeCode: data.PersonTypeCode,
      title: data.Title,
      name: data.Name || '', // default if not provided
      family: data.Family || '',
      dateBirth: data.DateBirth ? new Date(data.DateBirth).toISOString() : null,
      logo: data.Logo || '',
      telephone: data.Telephone,
      mobile: data.Mobile,
      email: data.Email,
      fax: data.Fax || '',
      codeEconomic: data.CodeEconomic || '',
      codeNational: data.CodeNational || '',
      zipCode: data.ZipCode || '',
      isActive: data.IsActive,
      address: data.Address || '',
      roleIDs: data.RoleIDs || [0],
      personTypeTitle: data.personTypeTitle || '', // note: check spelling and casing
      provinceID: data.ProvinceID || '',
      cityID: data.CityID || '',
      errorMessage: data.errorMessage || '',
      numRow: data.numRow || '',
      isActiveSuplier: data.isActiveSuplier !== undefined ? data.isActiveSuplier : true,
      isActiveCustomer: data.isActiveCustomer !== undefined ? data.isActiveCustomer : true,
      isCustomer: data.isCustomer !== undefined ? data.isCustomer : true,
      isSuplier: data.isSuplier !== undefined ? data.isSuplier : true,
      titlePersian: data.TitlePersian || '',
      namePersian: data.NamePersian || '',
      familyPersian: data.FamilyPersian || '',
    };
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <ListButtons />
      <ListComponent
        ModalComponent={PersonCompanyInfo}
        columnsComponent={ListOfPersonTableColumns}
        deleteEndpoint="/CompanyPerson/delete"
        deleteId="123"
        getListEndpoint="/CompanyPerson"
        updateEndpoint="/CompanyPerson/edit"
        updateId="123"
        deleteValues={deleteCompanyPerson}
        getLists={getLists}
        updateValues={updateValues}
        createListItem={createCostumer}
        transformData={transformMergedData}
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
