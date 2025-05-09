import './columns.css';

import { faCopy, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Select, Tooltip } from 'antd';
import { type Dispatch, type SetStateAction, useContext, useState } from 'react';

import { handleValueChange } from '@/utils/formatTypingNums';

import AutoFocusAddableSelectEdit from './AutoFocusAddableSelectEdit';
import AutoFocusInput from './AutoFocusInput';
import AutoFocusTextArea from './AutoFocusTextArea';
import { IsEdittingProformaContext } from './context/IsEdittingProformaContext';
import { deleteRow, handleCellChange } from './home-utils';

export const EditColumns = (
  formatMessage: (descriptor: any) => string,
  tableData: any,
  isRowFilled: (row: any) => boolean,
  setIsSupplierModalOpen: any,
  supplierOptions: { label: string; value: string }[],
  setActiveSupplierRow: any,
  setActiveGroupingRow: Dispatch<SetStateAction<number | null>>,
  setIsGroupingModalOpen: Dispatch<SetStateAction<boolean>>,
  groupingOptions: { label: string; value: string }[],
  itemOptions: any,
  openItemModal: any,
  setActiveItemRow: any,
  setTableData: Dispatch<SetStateAction<any[]>>,
  setSelectedCatId: Dispatch<SetStateAction<string | null>>,
  insurancePrice: number,
  totalCostOfRows: number,
) => {
  const { setIsCopyingProformaTableRow } = useContext(IsEdittingProformaContext);
  const [editVersion, setEditVersion] = useState(0);
  const bumpVersion = () => setEditVersion(v => v + 1);

  const copyRow = (record: any) => {
    setIsCopyingProformaTableRow(true);
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
    // existenceCategoryTitleModified
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.row' })}</span>,
      dataIndex: 'existenceCategoryTitleModified',
      key: 'existenceCategoryTitleModified',
      width: 50,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
      hidden: true,
    },
    // existenceCategoryTitleModified
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.detailInfo.table.row' })}</span>,
      dataIndex: 'stuffParentTitleModified',
      key: 'stuffParentTitleModified',
      width: 50,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
      hidden: true,
    },
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
        <AutoFocusAddableSelectEdit
          id={`cell-${record.key}-category`}
          nextId={`cell-${record.key}-items`}
          dataIndex="category"
          placeholder={formatMessage({ id: 'app.home.detailInfo.table.category.placeholder' })}
          text={record.categoryLabel}
          record={record}
          initialOptions={groupingOptions.map((group: any) => ({
            label: group.label,
            value: group.value,
          }))}
          debounceTime={5000}
          // mode="tags"
          editableOptions={true}
          allowAddNew={true}
          onAddNew={() => {
            setIsGroupingModalOpen(true);
            setActiveGroupingRow(record.key);
            handleCellChange('', record.key, 'items', setTableData, tableData, insurancePrice, totalCostOfRows);
            localStorage.removeItem('items-initialValue');
          }}
          setTableData={setTableData}
          tableData={tableData}
          setSelectedCatId={setSelectedCatId}
          editVersion={editVersion}
          onOptionEdited={bumpVersion}
          insurancePrice={insurancePrice}
          totalCostOfRows={totalCostOfRows}
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
        <AutoFocusAddableSelectEdit
          key={record.category + '-' + record.key}
          id={`cell-${record.key}-items`}
          nextId={`cell-${record.key}-supplier`}
          dataIndex="items"
          placeholder={formatMessage({ id: 'app.home.detailInfo.table.items.placeholder' })}
          text={record.itemsLabel}
          record={record}
          initialOptions={itemOptions[record.category] || []}
          debounceTime={5000}
          // mode="tags"
          editableOptions={true}
          allowAddNew={true}
          onAddNew={() => {
            openItemModal();
            setActiveItemRow(record.key);
          }}
          setTableData={setTableData}
          tableData={tableData}
          editVersion={editVersion}
          onOptionEdited={bumpVersion}
          insurancePrice={insurancePrice}
          totalCostOfRows={totalCostOfRows}
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
        <AutoFocusAddableSelectEdit
          id={`cell-${record.key}-supplier`}
          nextId={`cell-${record.key}-description`}
          dataIndex="supplier"
          placeholder={formatMessage({ id: 'app.home.detailInfo.table.supplier.placeholder' })}
          text={record.spplierLabel}
          record={record}
          // mode="tags"
          initialOptions={supplierOptions}
          debounceTime={5000}
          allowAddNew={true}
          onAddNew={() => {
            setIsSupplierModalOpen(true);
            setActiveSupplierRow(record.key);
          }}
          setTableData={setTableData}
          tableData={tableData}
          editVersion={editVersion}
          onOptionEdited={bumpVersion}
          insurancePrice={insurancePrice}
          totalCostOfRows={totalCostOfRows}
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
          onDebouncedChange={value =>
            handleCellChange(value, record.key, 'description', setTableData, tableData, insurancePrice, totalCostOfRows)
          }
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
          onDebouncedChange={value =>
            handleCellChange(value, record.key, 'qty', setTableData, tableData, insurancePrice, totalCostOfRows)
          }
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
          onDebouncedChange={value =>
            handleValueChange(value, record, 'unitCost', setTableData, tableData, insurancePrice, totalCostOfRows)
          }
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
            handleCellChange(
              value.replace('/', '.'),
              record.key,
              'recordProfitMargin',
              setTableData,
              tableData,
              insurancePrice,
              totalCostOfRows,
            )
          }
          style={{ width: '100%' }}
          debounceTime={5000}
        />
      ),
    },
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
            handleCellChange(
              value,
              record.key,
              'itemSalePriceRounded',
              setTableData,
              tableData,
              insurancePrice,
              totalCostOfRows,
            )
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
      // render: (_: any, record: any) => {
      //   const isDisabled = record.key === tableData[0].key && !isRowFilled(record);

      //   return (
      //     <span className="center-align">
      //       <FontAwesomeIcon
      //         icon={faTrashCan}
      //         onClick={() => {
      //           if (!isDisabled) {
      //             deleteRow(record.key, setTableData);
      //           }
      //         }}
      //         style={{
      //           cursor: isDisabled ? 'not-allowed' : 'pointer',
      //           marginRight: 8,
      //           opacity: isDisabled ? 0.4 : 1,
      //         }}
      //         className="delete-icon"
      //       />
      //     </span>
      //   );
      // },
      render: (_: any, record: any) => {
        const isFirstRow = record.key === tableData[0].key;
        const isLastRow = record.key === tableData[tableData.length - 1].key;
        const isRowEmpty = !isRowFilled(record);
        const isDisabled = (isFirstRow || isLastRow) && isRowEmpty;

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
              className="delete-icon"
            />
          </span>
        );
      },
    },
  ];
};
