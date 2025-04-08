import type { Dispatch, SetStateAction } from 'react';

import './columns.css';

import { faCopy, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Select } from 'antd';

import { handleValueChange } from '@/utils/formatTypingNums';

import AutoFocusAddableSelect from './AutoFocusAddableSelect';
import AutoFocusInput from './AutoFocusInput';
import AutoFocusTextArea from './AutoFocusTextArea';
import { deleteRow, handleCellChange } from './home-utils';

export const EditColumns = (
  formatMessage: (descriptor: any) => string,
  tableData: any,
  isRowFilled: (row: any) => boolean,
  setIsSupplierModalOpen: any,
  supplierOptions: { label: string; value: string }[],
  setActiveSupplierRow: any,
  insurancePrice: number,
  // setFooterInsuranceCoefficient: Dispatch<SetStateAction<string>>,
  // footerInsuranceCoefficient: string,
  setActiveGroupingRow: Dispatch<SetStateAction<number | null>>,
  setIsGroupingModalOpen: Dispatch<SetStateAction<boolean>>,
  groupingOptions: { label: string; value: string }[],
  itemOptions: { label: string; value: string }[],
  openItemModal: any,
  setActiveItemRow: any,
  setTableData: Dispatch<SetStateAction<any[]>>,
) => {
  const copyRow = (record: any) => {
    setTableData(prevData => {
      const index = prevData.findIndex(row => row.key === record.key);

      const maxKey = prevData.reduce((max, row) => Math.max(max, Number(row.key)), 0);
      const newKey = (maxKey + 1).toString();

      const newRow = { ...record, key: newKey, isCopied: true };

      const newData = [...prevData];

      newData.splice(index + 1, 0, newRow);

      return newData;
    });
  };

  return [
    // شماره
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.row' })}</span>,
      dataIndex: 'key',
      key: 'key',
      width: 50,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // PerformaInvoiceDetailID
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.row' })}</span>,
      dataIndex: 'PerformaInvoiceDetailID',
      key: 'PerformaInvoiceDetailID',
      width: 50,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
      hidden: true,
    },
    // id
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.row' })}</span>,
      dataIndex: 'id',
      key: 'id',
      width: 50,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
      hidden: true,
    },
    // performaInvoiceDetailAgentsReducingIncreasingList
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.row' })}</span>,
      dataIndex: 'redIncId',
      key: 'redIncId',
      width: 50,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
      hidden: true,
    },
    // performaInvoiceHeaderAgentsReducingIncreasingList
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.row' })}</span>,
      dataIndex: 'headerReducingIncreasingId',
      key: 'headerReducingIncreasingId',
      width: 50,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
      hidden: true,
    },
    // code
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.row' })}</span>,
      dataIndex: 'code',
      key: 'code',
      width: 50,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
      hidden: true,
    },
    // گروه
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.category' })}</span>,
      dataIndex: 'category',
      key: 'category',
      width: 300,
      render: (text: string, record: any) => (
        <AutoFocusAddableSelect
          id={`cell-${record.key}-category`}
          nextId={`cell-${record.key}-items`}
          dataIndex="category"
          placeholder={formatMessage({ id: 'app.home.detailInfo.table.category.placeholder' })}
          text={text}
          record={record}
          initialOptions={groupingOptions.map((group: any) => ({
            label: group.label,
            value: group.value,
          }))}
          debounceTime={5000}
          mode="tags"
          editableOptions={true}
          allowAddNew={true}
          onAddNew={() => {
            setIsGroupingModalOpen(true);
            setActiveGroupingRow(record.key);
          }}
          setTableData={setTableData}
          tableData={tableData}
        />
      ),
    },
    // آیتم ها
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.items' })}</span>,
      dataIndex: 'items',
      key: 'items',
      width: 300,
      render: (text: string, record: any) => (
        <AutoFocusAddableSelect
          id={`cell-${record.key}-items`}
          nextId={`cell-${record.key}-supplier`}
          dataIndex="items"
          placeholder={formatMessage({ id: 'app.home.detailInfo.table.items.placeholder' })}
          text={text}
          record={record}
          initialOptions={itemOptions}
          debounceTime={5000}
          mode="tags"
          editableOptions={true}
          allowAddNew={true}
          onAddNew={() => {
            openItemModal();
            setActiveItemRow(record.key);
          }}
          setTableData={setTableData}
          tableData={tableData}
        />
      ),
    },
    // تامین کننده
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.supplier' })}</span>,
      dataIndex: 'supplier',
      key: 'supplier',
      width: 300,
      render: (text: string, record: any) => (
        <AutoFocusAddableSelect
          id={`cell-${record.key}-supplier`}
          nextId={`cell-${record.key}-description`}
          dataIndex="supplier"
          placeholder={formatMessage({ id: 'app.home.detailInfo.table.supplier.placeholder' })}
          text={text}
          record={record}
          mode="tags"
          initialOptions={supplierOptions}
          debounceTime={5000}
          allowAddNew={true}
          onAddNew={() => {
            setIsSupplierModalOpen(true);
            setActiveSupplierRow(record.key);
          }}
          setTableData={setTableData}
          tableData={tableData}
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
          onDebouncedChange={value => handleCellChange(value, record.key, 'description', setTableData, tableData)}
          style={{ width: '100%' }}
          debounceTime={5000}
        />
      ),
    },
    // تعداد
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.qty' })}</span>,
      dataIndex: 'qty',
      key: 'qty',
      width: 250,
      render: (text: string, record: any) => (
        <AutoFocusInput
          id={`cell-${record.key}-qty`}
          nextId={`cell-${record.key}-unitCost`}
          value={text}
          placeholder={formatMessage({ id: 'app.home.detailInfo.table.qty.placeholder' })}
          type="number"
          onDebouncedChange={value => handleCellChange(value, record.key, 'qty', setTableData, tableData)}
          style={{ width: '100%' }}
          debounceTime={5000}
          min={0}
        />
      ),
    },
    // هزینه
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.unitCost' })}</span>,
      dataIndex: 'unitCost',
      key: 'unitCost',
      width: 300,
      render: (text: string, record: any) => (
        <AutoFocusInput
          id={`cell-${record.key}-unitCost`}
          nextId={`cell-${record.key}-recordProfitMargin`}
          value={text}
          placeholder={formatMessage({ id: 'app.home.detailInfo.table.unitCost.placeholder' })}
          onDebouncedChange={value => handleValueChange(value, record, 'unitCost', setTableData, tableData)}
          style={{ width: '100%' }}
          debounceTime={5000}
        />
      ),
    },
    //هزینه کل
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.price' })}</span>,
      dataIndex: 'totalPriceWithoutFactors',
      key: 'totalPriceWithoutFactors',
      render: (text: string) => (
        <span className="center-align">{text ? text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0'}</span>
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
          nextId={`cell-${record.key}-itemSalePriceRounded`}
          value={text}
          placeholder={formatMessage({ id: 'app.home.detailInfo.table.profitPercentage.placeholder' })}
          type="text"
          onDebouncedChange={value =>
            handleCellChange(value.replace('/', '.'), record.key, 'recordProfitMargin', setTableData, tableData)
          }
          style={{ width: '100%' }}
          debounceTime={5000}
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
    // مبلغ بیمه
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.insurancePrice' })}</span>,
      dataIndex: 'insurancePriceForRecord',
      key: 'insurancePriceForRecord',
      render: (text: string, record: any) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '0 0.5rem',
            borderRadius: '0.5rem',
            width: '200px',
            margin: 'auto',
            border: '1px solid #dcdcdc',
          }}
        >
          <Select
            variant="borderless"
            // value={footerInsuranceCoefficient}
            value={record.footerInsuranceCoefficient || '0.085'}
            placeholder={`${formatMessage({
              id: 'app.home.detailInfo.table.footerInsurancePrice',
            })}`}
            // onChange={value => setFooterInsuranceCoefficient(value)}
            onChange={value =>
              handleCellChange(value, record.key, 'footerInsuranceCoefficient', setTableData, tableData)
            }
            options={[
              { label: '0.085', value: '0.085' },
              { label: '0.2', value: '0.2' },
              { label: '0', value: '0' },
            ]}
            style={{ outline: 'none' }}
          />
          <span>
            <span>{(record.insurancePriceForRecord || 0).toFixed(6).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
          </span>
        </div>
      ),
    },
    //سهم از بیمه و مالیات
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
          onDebouncedChange={value =>
            handleCellChange(value, record.key, 'itemSalePriceRounded', setTableData, tableData)
          }
          style={{ width: '100%' }}
          debounceTime={5000}
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
    //کپی
    {
      title: <span className="center-align">{formatMessage({ id: 'gloabal.columns.copy' })}</span>,
      dataIndex: 'copy',
      key: 'copy',
      render: (_: any, record: any) => (
        <span className="center-align">
          <FontAwesomeIcon
            icon={faCopy}
            onClick={() => copyRow(record)}
            style={{ cursor: 'pointer', marginRight: 8 }}
          />
        </span>
      ),
    },
    // حذف
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
                  deleteRow(record.key, setTableData);
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
