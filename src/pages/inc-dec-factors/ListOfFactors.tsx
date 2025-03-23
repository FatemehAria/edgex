import { theme } from 'antd';

import ListButtons from '@/components/custom/ListButtons';
import ListComponent from '@/components/custom/ListComponent';

import IncDecFactors from '.';
import ListOfFactorsColumns from './ListOfFactorsColumns';
import { createFactor, deleteFactor, getFactrosList, updateFactor } from './util';

function ListOfFactors() {
  const { token } = theme.useToken();

  const transformMergedData = (data: any) => {
    console.log('data', data);

    return {
      Title: data.Title,
      'inc-dec-tasir': data['PriceAgent'] === 0 ? 'percentage' : 'price',
      influcence: data.influcence,
      'inc-dec-display': data['IsDisplayDetail'] ? 'displayPen' : 'displayDocument',
      'inc-dec-mahiyat': data['inc-dec-mahiyat'],
      'inc-dec-active': data['inc-dec-active'],
    };
  };

  return (
    <div style={{ backgroundColor: token.colorBgBlur, minHeight: '100vh' }}>
      <ListButtons />
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
