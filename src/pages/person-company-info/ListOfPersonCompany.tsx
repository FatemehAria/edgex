import './index.css';

import { theme } from 'antd';

import ListButtons from '@/components/custom/ListButtons';
import ListComponent from '@/components/custom/ListComponent';

import { ListOfPersonTableColumns } from './ListOfPersonTableColumns';
import PersonCompanyEdit from './PersonCompanyEdit';
import { createCostumer, deleteCompanyPerson, getLists, updateValues } from './util';

function ListOfPersonCompany() {
  const { token } = theme.useToken();

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
      personTypeTitle: data.personTypeTitle || '', 
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
    <div style={{ minHeight: '100vh', backgroundColor: token.colorBgBlur }}>
      <ListButtons />
      <ListComponent
        ModalComponent={PersonCompanyEdit}
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
    </div>
  );
}

export default ListOfPersonCompany;
