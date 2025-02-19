import './columns.css';

import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AutoComplete, Input } from 'antd';

// import FormLayout from '../layout/form-layout';
import AddableSelect from './AddableSelect';

// const handleModalFormSubmit = (values: any) => {
//   console.log('Modal form submitted (unused):', values);
// };

export const Columns = (
  formatMessage: (descriptor: any) => string,
  handleCellChange: (value: string, key: string, dataIndex: string) => void,
  // showModal: (rowKey: number) => void,
  deleteRow: (key: string) => void,
  tableData: any[],
  isRowFilled: (row: any) => boolean,
  // isModalOpen: boolean,
  // modalForm: any,
  // modalFormOptions: MyFormOptions,
  // handleOk: () => void,
  // handleCancel: () => void,
) => {
  return [
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.row' })}</span>,
      dataIndex: 'key',
      key: 'key',
      width: 50,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.category' })}</span>,
      dataIndex: 'category',
      key: 'category',
      width: 200,
      render: (text: string, record: any) => (
        <AddableSelect
          dataIndex="category"
          placeholder="گروه"
          text={text}
          record={record}
          handleCellChange={handleCellChange}
          initialOptions={
            [
              // { label: 'category 1', value: 'category1' },
              // { label: 'category 2', value: 'category2' },
            ]
          }
        />
      ),
    },
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.items' })}</span>,
      dataIndex: 'items',
      key: 'items',
      width: 200,
      render: (text: string, record: any) => (
        <AddableSelect
          dataIndex="items"
          placeholder="آیتم ها"
          text={text}
          record={record}
          handleCellChange={handleCellChange}
          initialOptions={
            [
              // { label: 'category 1', value: 'category1' },
              // { label: 'category 2', value: 'category2' },
            ]
          }
        />
      ),
    },
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.supplier' })}</span>,
      dataIndex: 'supplier',
      key: 'supplier',
      width: 200,
      render: (text: string, record: any) => (
        <AddableSelect
          dataIndex="supplier"
          placeholder="تامین کننده"
          text={text}
          record={record}
          handleCellChange={handleCellChange}
          initialOptions={[
            { label: 'supplier 1', value: 'category1' },
            // { label: 'category 2', value: 'category2' },
          ]}
        />
      ),
    },
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.desc' })}</span>,
      dataIndex: 'description',
      key: 'description',
      width: 600,
      render: (text: string, record: any) => (
        <Input.TextArea
          value={text}
          placeholder="Enter description"
          onChange={e => handleCellChange(e.target.value, record.key, 'description')}
          style={{ width: '100%' }}
        />
      ),
    },
    {
      title: (
        <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.profitPercentage' })}</span>
      ),
      dataIndex: 'recordProfitMargin',
      key: 'recordProfitMargin',
      width: 200,
      render: (text: string, record: any) => (
        <AutoComplete
          value={text}
          placeholder=""
          onChange={value => handleCellChange(value, record.key, 'recordProfitMargin')}
          options={[{ value: '100' }, { value: '200' }]}
          style={{ width: '100%' }}
        />
      ),
    },
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.qty' })}</span>,
      dataIndex: 'qty',
      key: 'qty',
      width: 200,
      render: (text: string, record: any) => (
        <Input
          value={text}
          placeholder="Enter quantity"
          type="number"
          onChange={e => handleCellChange(e.target.value, record.key, 'qty')}
          min={0}
        />
      ),
    },
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.unitCost' })}</span>,
      dataIndex: 'unitCost',
      key: 'unitCost',
      width: 120,
      render: (text: string, record: any) => (
        <AutoComplete
          value={text}
          options={[{ value: '100' }, { value: '200' }]}
          placeholder="Enter cost"
          onChange={value => handleCellChange(value, record.key, 'unitCost')}
          style={{ width: '100%' }}
          allowClear
        />
      ),
    },
    // ******************Modal*********************
    // {
    //   title: `${formatMessage({ id: 'app.home.detailInfo.table.factorValue' })}`,
    //   dataIndex: 'factorValue',
    //   key: 'factorValue',
    //   render: (text: string, record: any) => (
    //     <div>
    //       <FontAwesomeIcon
    //         icon={faUpRightFromSquare}
    //         onClick={() => showModal(record.key)}
    //         style={{ cursor: 'pointer' }}
    //       />
    //       <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    //         <FormLayout
    //           form={modalForm}
    //           FormOptions={modalFormOptions}
    //           isGrid={true}
    //           layoutDir="vertical"
    //           showButton={false}
    //           submitForm={handleModalFormSubmit}
    //         />
    //       </Modal>
    //     </div>
    //   ),
    // },
    {
      title: (
        <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.primarySalesPrice' })}</span>
      ),
      dataIndex: 'primarySalesPrice',
      key: 'primarySalesPrice',
      render: (text: string) => (
        <span className="center-align">{text ? text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0'}</span>
      ),
    },
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.itemTotalPrice' })}</span>,
      dataIndex: 'itemTotalPrice',
      key: 'itemTotalPrice',
      render: (text: string) => (
        <span className="center-align">{text ? text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0'}</span>
      ),
    },
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.price' })}</span>,
      dataIndex: 'totalPriceWithoutFactors',
      key: 'totalPriceWithoutFactors',
      render: (text: string) => (
        <span className="center-align">{text ? text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0'}</span>
      ),
    },
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.itemSalePrice' })}</span>,
      dataIndex: 'itemSalePrice',
      key: 'itemSalePrice',
      render: (text: string) => (
        <span className="center-align">{text ? text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0'}</span>
      ),
    },
    {
      title: (
        <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.itemSalePriceRounded' })}</span>
      ),
      dataIndex: 'itemSalePriceRounded',
      key: 'itemSalePriceRounded',
      render: (text: string) => (
        <span className="center-align">{text ? text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0'}</span>
      ),
    },
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.finalSalePrice' })}</span>,
      dataIndex: 'finalSalePrice',
      key: 'finalSalePrice',
      render: (text: string) => (
        <span className="center-align">{text ? text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0'}</span>
      ),
    },
    {
      title: (
        <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.itemShareOfTaxAndIns' })}</span>
      ),
      dataIndex: 'itemShareOfTaxAndIns',
      key: 'itemShareOfTaxAndIns',
      render: (text: string) => (
        <span className="center-align">{text ? text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0'}</span>
      ),
    },
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.actions' })}</span>,
      dataIndex: 'actions',
      key: 'actions',
      render: (_: any, record: any) => {
        const isDisabled = record.key === tableData[0].key && !isRowFilled(record);

        return (
          <span className="center-align">
            <FontAwesomeIcon
              icon={faTrashCan}
              onClick={() => {
                if (!isDisabled) {
                  deleteRow(record.key);
                }
              }}
              style={{
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                marginRight: 8,
                opacity: isDisabled ? 0.4 : 1,
              }}
            />
          </span>
        );
      },
    },
  ];
};
