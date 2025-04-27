import type { FormInstance } from 'antd';
import type { Dispatch, SetStateAction } from 'react';

import './columns.css';

import { Button, Select, Table } from 'antd';
import { useContext, useEffect } from 'react';

import { IsEdittingProformaContext } from './context/IsEdittingProformaContext';
import FooterTableColumns from './FooterTableColumns';
import { isRowFilled, resetRowFields, round2 } from './home-utils';
import { calculateFinalValues, createProforma, createProformaPayload, updateProforma } from './util';

function ProformaTable({
  tableData,
  columns,
  formatMessage,
  insurancePrice,
  setinsurancePrice,
  setTotalCostOfRows,
  totalCostOfRows,
  setTableData,
  form,
  onCancel,
  showCancelButton,
  footerInsuranceCoefficient,
  setFooterInsuranceCoefficient,
}: {
  tableData: any;
  columns: any;
  formatMessage: any;
  insurancePrice: number;
  setinsurancePrice: Dispatch<SetStateAction<number>>;
  setTotalCostOfRows: Dispatch<SetStateAction<number>>;
  totalCostOfRows: number;
  setTableData: Dispatch<SetStateAction<any[]>>;
  form: FormInstance<any>;
  onCancel?: () => void;
  showCancelButton?: boolean;
  footerInsuranceCoefficient: string;
  setFooterInsuranceCoefficient: Dispatch<SetStateAction<string>>;
}) {
  const {
    isEdittingProforma,
    setIsEdittingProforma,
    setIsCopyingProforma,
    isCopyingProforma,
    selectedProformaInfo,
    singleProformaInfo,
    headerData,
    isCopyingProformaTableRow,
  } = useContext(IsEdittingProformaContext);

  // useEffect(() => {
  //   const totalCost = tableData.reduce((sum: number, row: any) => sum + (parseFloat(row.itemTotalPrice) || 0), 0);

  //   setTotalCostOfRows(round2(totalCost));

  //   const calculatedInsurancePrice = tableData.reduce((sum: number, row: any) => {
  //     const rowTotal = parseFloat(row.itemTotalPrice) || 0;
  //     // const rowCoefficient = Number(row.footerInsuranceCoefficient) || 0;

  //     return sum + rowTotal * Number(footerInsuranceCoefficient);
  //   }, 0);

  //   setinsurancePrice(round2(calculatedInsurancePrice));
  // }, [tableData, setTotalCostOfRows, setinsurancePrice]);

  console.log('footer', footerInsuranceCoefficient);
  // In ProformaTable component
  useEffect(() => {
    // Only calculate if not initial load
    if (insurancePrice !== headerData?.insurancePrice) {
      const calculated = tableData.reduce((sum: number, row: any) => {
        const rowTotal = parseFloat(row.itemTotalPrice) || 0;

        return sum + rowTotal * Number(footerInsuranceCoefficient);
      }, 0);

      setinsurancePrice(round2(calculated));
    }
  }, [tableData, footerInsuranceCoefficient]); // Add footerInsuranceCoefficient
  
  const payload = createProformaPayload(
    tableData,
    insurancePrice,
    isRowFilled,
    isEdittingProforma,
    isCopyingProforma,
    isCopyingProformaTableRow,
    footerInsuranceCoefficient,
    headerData,
    singleProformaInfo,
  );

  // console.log('payload', payload);
  // console.log('insu', insurancePrice);

  const handleSubmition = async () => {
    if (isCopyingProforma) {
      await createProforma(payload);
      setIsCopyingProforma(false);
    } else if (isEdittingProforma) {
      const updatedPayload = { ...payload, id: selectedProformaInfo.id, code: selectedProformaInfo.code };

      await updateProforma(updatedPayload);
      setTableData(prevData =>
        prevData.map(row => (row.key === selectedProformaInfo.key ? { ...row, ...updatedPayload } : row)),
      );
      setIsEdittingProforma(false);
    } else {
      await createProforma(payload);
      form.resetFields();
      setTableData(prevData => prevData.map(row => resetRowFields(row)));
    }

    setinsurancePrice(0);
    setTotalCostOfRows(0);
  };

  return (
    <div>
      <Table
        dataSource={tableData}
        columns={columns}
        pagination={false}
        rowClassName="editable-row"
        scroll={{ x: 'max-content' }}
        footer={() => {
          const finalValues = calculateFinalValues(tableData, insurancePrice);
          const FooterTableData = [
            {
              key: 'footer',
              vat: round2(finalValues.vat)
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              // vat: `${Math.round(finalValues.vat)
              //   .toString()
              //   .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
              total: round2(finalValues.total)
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              // total: `${finalValues.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
              finalProfit: round2(finalValues.finalProfit)
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              // finalProfit: `${finalValues.finalProfit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
              // finalProfitMargin: round2(finalValues.totalProfitMargin).toFixed(2),
              finalProfitMargin: `${finalValues.totalProfitMargin}`,
              insuranceCheckAmount: `${Math.round(finalValues.insuranceCheckAmount)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
              // insuranceCheckAmount: `${Math.round(finalValues.insuranceCheckAmount)
              //   .toString()
              //   .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
            },
          ];

          const footerContent = (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
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
                value={footerInsuranceCoefficient}
                placeholder={formatMessage({ id: 'app.home.detailInfo.table.footerInsurancePrice' })}
                onChange={value => {
                  // update the global coefficient
                  setFooterInsuranceCoefficient(value);
                  // push it into each row so they recalc
                  setTableData(rows => rows.map(r => ({ ...r, footerInsuranceCoefficient: value })));
                }}
                options={[
                  { label: '0.085', value: '0.085' },
                  { label: '0.2', value: '0.2' },
                  { label: '0', value: '0' },
                ]}
                style={{ outline: 'none' }}
              />
              <span>{Math.round(insurancePrice).toLocaleString()}</span>
            </div>
          );

          return <FooterTableColumns tableData={FooterTableData} footerContent={footerContent} />;
        }}
        summary={() => {
          const totalQty = tableData.reduce((sum: number, row: any) => sum + (parseFloat(row.qty) || 0), 0);
          const totalUnitCosts = tableData.reduce(
            (sum: number, row: any) => sum + (parseFloat(String(row.unitCost).replace(/,/g, '')) || 0),
            0,
          );
          const totalCostWithout = tableData.reduce(
            (sum: number, row: any) => sum + (parseFloat(row.totalPriceWithoutFactors) || 0),
            0,
          );
          const totalFinalSalePrice = tableData.reduce(
            (sum: number, row: any) => sum + (parseFloat(row.finalSalePrice) || 0),
            0,
          );
          const totalItemTotalPrice = tableData.reduce(
            (sum: number, row: any) => sum + (parseFloat(row.itemTotalPrice) || 0),
            0,
          );

          const totalPrimarySalesPrice = tableData.reduce(
            (sum: number, row: any) => sum + (parseFloat(row.primarySalesPrice) || 0),
            0,
          );

          const totalItemSalePrice = tableData.reduce(
            (sum: number, row: any) => sum + (parseFloat(row.itemSalePrice) || 0),
            0,
          );

          const totalItemSalePriceRounded = tableData.reduce(
            (sum: number, row: any) => sum + (parseFloat(String(row.itemSalePriceRounded).replace(/,/g, '')) || 0),
            0,
          );
          const totalInsurancePriceForRecord = tableData.reduce(
            (sum: number, row: any) => sum + (parseFloat(String(row.insurancePriceForRecord).replace(/,/g, '')) || 0),
            0,
          );
          const totalItemShareOfTaxAndIns = tableData.reduce(
            (sum: number, row: any) => sum + (parseFloat(String(row.itemShareOfTaxAndIns).replace(/,/g, '')) || 0),
            0,
          );

          return (
            <Table.Summary>
              <Table.Summary.Row style={{ backgroundColor: '#8ebfbb', textAlign: 'center' }}>
                {columns.map((col: any, index: any) => {
                  if (col.dataIndex === 'qty') {
                    return (
                      <Table.Summary.Cell index={index} key={col.key || index}>
                        <strong>{totalQty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong>
                      </Table.Summary.Cell>
                    );
                  }

                  if (col.dataIndex === 'unitCost') {
                    return (
                      <Table.Summary.Cell index={index} key={col.key || index}>
                        <strong>{round2(totalUnitCosts).toLocaleString()}</strong>
                        {/* <strong>{totalUnitCosts.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong> */}
                      </Table.Summary.Cell>
                    );
                  }

                  if (col.dataIndex === 'primarySalesPrice') {
                    return (
                      <Table.Summary.Cell index={index} key={col.key || index}>
                        <strong>{round2(totalPrimarySalesPrice).toLocaleString()}</strong>
                        {/* <strong>{totalPrimarySalesPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong> */}
                      </Table.Summary.Cell>
                    );
                  }

                  if (col.dataIndex === 'insurancePriceForRecord') {
                    return (
                      <Table.Summary.Cell index={index} key={col.key || index}>
                        {/* <strong>{parseFloat(totalInsurancePriceForRecord.toFixed(4))}</strong> */}
                        <strong>{totalInsurancePriceForRecord.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong>
                      </Table.Summary.Cell>
                    );
                  }

                  if (col.dataIndex === 'itemShareOfTaxAndIns') {
                    return (
                      <Table.Summary.Cell index={index} key={col.key || index}>
                        <strong>{round2(totalItemShareOfTaxAndIns).toLocaleString()}</strong>
                        {/* <strong>{totalItemShareOfTaxAndIns.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong> */}
                      </Table.Summary.Cell>
                    );
                  }

                  if (col.dataIndex === 'itemSalePrice') {
                    return (
                      <Table.Summary.Cell index={index} key={col.key || index}>
                        <strong>{round2(totalItemSalePrice).toLocaleString()}</strong>
                        {/* <strong>{totalItemSalePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong> */}
                      </Table.Summary.Cell>
                    );
                  }

                  if (col.dataIndex === 'itemSalePriceRounded') {
                    return (
                      <Table.Summary.Cell index={index} key={col.key || index}>
                        <strong>{totalItemSalePriceRounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong>
                      </Table.Summary.Cell>
                    );
                  }

                  if (col.dataIndex === 'totalPriceWithoutFactors') {
                    return (
                      <Table.Summary.Cell index={index} key={col.key || index}>
                        <strong>{round2(totalCostWithout).toLocaleString()}</strong>
                        {/* <strong>{totalCostWithout.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong> */}
                      </Table.Summary.Cell>
                    );
                  }

                  if (col.dataIndex === 'totalCostWithFactors') {
                    return (
                      <Table.Summary.Cell index={index} key={col.key || index}>
                        <strong>{round2(totalCostOfRows).toLocaleString()}</strong>
                        {/* <strong>{totalCostOfRows.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong> */}
                      </Table.Summary.Cell>
                    );
                  }

                  if (col.dataIndex === 'finalSalePrice') {
                    return (
                      <Table.Summary.Cell index={index} key={col.key || index}>
                        <strong>{round2(totalFinalSalePrice).toLocaleString()}</strong>
                        {/* <strong>{totalFinalSalePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong> */}
                      </Table.Summary.Cell>
                    );
                  }

                  if (col.dataIndex === 'itemTotalPrice') {
                    return (
                      <Table.Summary.Cell index={index} key={col.key || index}>
                        <strong>{totalItemTotalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong>
                      </Table.Summary.Cell>
                    );
                  }

                  return <Table.Summary.Cell index={index} key={col.key || index} />;
                })}
              </Table.Summary.Row>
            </Table.Summary>
          );
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: showCancelButton ? 'space-between' : 'flex-end',
          marginTop: '0.5rem',
        }}
      >
        <Button
          type="default"
          htmlType="button"
          style={{ display: showCancelButton ? 'inline' : 'none' }}
          onClick={onCancel}
        >
          {formatMessage({ id: 'gloabal.buttons.cancel' })}
        </Button>
        <Button type="primary" onClick={handleSubmition}>
          {formatMessage({ id: 'app.home.submissionBtn' })}
        </Button>
      </div>
    </div>
  );
}

export default ProformaTable;
