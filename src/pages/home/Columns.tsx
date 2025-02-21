import './columns.css';

import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { handleValueChange } from '@/utils/formatTypingNums';

// import FormLayout from '../layout/form-layout';
import AutoFocusAddableSelect from './AutoFocusAddableSelect';
import AutoFocusAutoComplete from './AutoFocusAutoComplete';
import AutoFocusInput from './AutoFocusInput';
import AutoFocusTextArea from './AutoFocusTextArea';

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
    // شماره
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.row' })}</span>,
      dataIndex: 'key',
      key: 'key',
      width: 50,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // گروه
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.category' })}</span>,
      dataIndex: 'category',
      key: 'category',
      width: 200,
      render: (text: string, record: any) => (
        <AutoFocusAddableSelect
          id={`cell-${record.key}-category`}
          nextId={`cell-${record.key}-items`}
          dataIndex="category"
          placeholder={formatMessage({ id: 'app.home.detailInfo.table.category.placeholder' })}
          text={text}
          record={record}
          handleCellChange={handleCellChange}
          initialOptions={[]}
        />
      ),
    },
    // آیتم ها
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.items' })}</span>,
      dataIndex: 'items',
      key: 'items',
      width: 200,
      render: (text: string, record: any) => (
        <AutoFocusAddableSelect
          id={`cell-${record.key}-items`}
          nextId={`cell-${record.key}-supplier`}
          dataIndex="items"
          placeholder={formatMessage({ id: 'app.home.detailInfo.table.items.placeholder' })}
          text={text}
          record={record}
          handleCellChange={handleCellChange}
          initialOptions={[]}
        />
      ),
    },
    // تامین کننده
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.supplier' })}</span>,
      dataIndex: 'supplier',
      key: 'supplier',
      width: 200,
      render: (text: string, record: any) => (
        <AutoFocusAddableSelect
          id={`cell-${record.key}-supplier`}
          nextId={`cell-${record.key}-description`}
          dataIndex="supplier"
          placeholder={formatMessage({ id: 'app.home.detailInfo.table.supplier.placeholder' })}
          text={text}
          record={record}
          handleCellChange={handleCellChange}
          initialOptions={[{ label: 'supplier 1', value: 'supplier1' }]}
        />
      ),
    },
    // توضیحات
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.desc' })}</span>,
      dataIndex: 'description',
      key: 'description',
      width: 600,
      render: (text: string, record: any) => (
        <AutoFocusTextArea
          id={`cell-${record.key}-description`}
          nextId={`cell-${record.key}-recordProfitMargin`}
          value={text}
          placeholder={formatMessage({ id: 'app.home.detailInfo.table.desc.placeholder' })}
          onDebouncedChange={value => handleCellChange(value, record.key, 'description')}
          style={{ width: '100%' }}
          debounceTime={3000}
        />
      ),
    },
    // درصد سود
    {
      title: (
        <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.profitPercentage' })}</span>
      ),
      dataIndex: 'recordProfitMargin',
      key: 'recordProfitMargin',
      width: 200,
      render: (text: string, record: any) => (
        <AutoFocusInput
          id={`cell-${record.key}-recordProfitMargin`}
          nextId={`cell-${record.key}-qty`}
          value={text}
          placeholder="Enter quantity"
          type="text"
          onDebouncedChange={value => handleCellChange(value, record.key, 'recordProfitMargin')}
          style={{ width: '100%' }}
          debounceTime={3000}
        />
      ),
    },
    // تعداد
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.qty' })}</span>,
      dataIndex: 'qty',
      key: 'qty',
      width: 200,
      render: (text: string, record: any) => (
        <AutoFocusInput
          id={`cell-${record.key}-qty`}
          nextId={`cell-${record.key}-unitCost`}
          value={text}
          placeholder="Enter quantity"
          type="number"
          onDebouncedChange={value => handleCellChange(value, record.key, 'qty')}
          style={{ width: '100%' }}
          debounceTime={3000}
        />
      ),
    },
    // هزینه
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.unitCost' })}</span>,
      dataIndex: 'unitCost',
      key: 'unitCost',
      width: 120,
      render: (text: string, record: any) => (
        <AutoFocusAutoComplete
          id={`cell-${record.key}-unitCost`}
          value={text}
          placeholder="Enter cost"
          onDebouncedChange={value =>
            // Use your handleValueChange that formats the value before calling handleCellChange.
            handleValueChange(value, handleCellChange, record, 'unitCost')
          }
          style={{ width: '100%' }}
          options={[
            { label: '100', value: '100' },
            { label: '200', value: '200' },
          ]}
          debounceTime={3000}
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
      render: (text: string, record: any) => (
        <AutoFocusInput
          id={`cell-${record.key}-itemSalePriceRounded`}
          value={text}
          placeholder="Enter rounded sale price"
          type="input"
          onDebouncedChange={value => handleCellChange(value, record.key, 'itemSalePriceRounded')}
          style={{ width: '100%' }}
          debounceTime={3000}
        />
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
