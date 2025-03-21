import ExcelButton from '@/components/custom/ExcelButton';
import ListComponent from '@/components/custom/ListComponent';

import IncDecFactors from '.';
import ListOfFactorsColumns from './ListOfFactorsColumns';
import { createFactor, deleteFactor, getFactrosList, updateFactor } from './util';

function ListOfFactors() {
  // const transformMergedData = (data: any) => {
  //   return {
  //     id: data.ID,
  //     code: data.Code || 0,
  //     title: data.Title,
  //     effectTypeCode: data['inc-dec-tasir'] === 'price' ? 1 : 0,
  //     priceAgent: data['inc-dec-tasir'] === 'price' ? data['influcence'] : 0,
  //     percentAgent: data['inc-dec-tasir'] === 'percentage' ? data['influcence'] : 0,
  //     isActive: data['inc-dec-active'],
  //     isDisplayDetail: data['inc-dec-display'] === 'displayPen',
  //     isDisplayDocument: data['inc-dec-display'] === 'displayDocument',
  //     agentTypeCode: data['inc-dec-mahiyat'],
  //   };
  // };

  const transformMergedData = (data: any) => {
    console.log('data', data);

    return {
      Title: data.Title,
      influcence: data.influcence,
      'inc-dec-display': data['inc-dec-display'],
      'inc-dec-tasir': data['inc-dec-tasir'],
      'inc-dec-mahiyat': data['inc-dec-mahiyat'],
      'inc-dec-active': data['inc-dec-active'],
    };
  };

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
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
        transformData={transformMergedData}
      />
    </div>
  );
}

export default ListOfFactors;
