import type { FormInstance } from 'antd';
import type { Dispatch, SetStateAction } from 'react';

import './columns.css';

import { Button, Table } from 'antd';
import { useContext, useEffect } from 'react';

import { IsEdittingProformaContext } from './context/IsEdittingProformaContext';
import FooterTableColumns from './FooterTableColumns';
import { isRowFilled, resetRowFields } from './home-utils';
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
}) {
  const {
    isEdittingProforma,
    setIsEdittingProforma,
    setIsCopyingProforma,
    isCopyingProforma,
    selectedProformaInfo,
    singleProformaInfo,
    headerData,
    isCopyingProformaTableRow
  } = useContext(IsEdittingProformaContext);

  useEffect(() => {
    const totalCost = tableData.reduce((sum: number, row: any) => sum + (parseFloat(row.itemTotalPrice) || 0), 0);

    setTotalCostOfRows(totalCost);

    const calculatedInsurancePrice = tableData.reduce((sum: number, row: any) => {
      const rowTotal = parseFloat(row.itemTotalPrice) || 0;
      const rowCoefficient = Number(row.footerInsuranceCoefficient) || 0;

      return sum + rowTotal * rowCoefficient;
    }, 0);

    setinsurancePrice(calculatedInsurancePrice);
  }, [tableData, setTotalCostOfRows, setinsurancePrice]);

  const payload = createProformaPayload(
    tableData,
    insurancePrice,
    isRowFilled,
    isEdittingProforma,
    isCopyingProforma,
    isCopyingProformaTableRow,
    headerData,
    singleProformaInfo,
  );

  console.log('payload', payload);

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
              vat: `${Math.round(finalValues.vat)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
              total: `${finalValues.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
              finalProfit: `${finalValues.finalProfit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
              finalProfitMargin: `${finalValues.totalProfitMargin}`,
              insuranceCheckAmount: `${Math.round(finalValues.insuranceCheckAmount)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
            },
          ];

          const footerContent = <div></div>;

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
                        <strong>{totalUnitCosts.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong>
                      </Table.Summary.Cell>
                    );
                  }

                  if (col.dataIndex === 'primarySalesPrice') {
                    return (
                      <Table.Summary.Cell index={index} key={col.key || index}>
                        <strong>{totalPrimarySalesPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong>
                      </Table.Summary.Cell>
                    );
                  }

                  if (col.dataIndex === 'insurancePriceForRecord') {
                    return (
                      <Table.Summary.Cell index={index} key={col.key || index}>
                        <strong>{totalInsurancePriceForRecord.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong>
                      </Table.Summary.Cell>
                    );
                  }

                  if (col.dataIndex === 'itemShareOfTaxAndIns') {
                    return (
                      <Table.Summary.Cell index={index} key={col.key || index}>
                        <strong>{totalItemShareOfTaxAndIns.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong>
                      </Table.Summary.Cell>
                    );
                  }

                  if (col.dataIndex === 'itemSalePrice') {
                    return (
                      <Table.Summary.Cell index={index} key={col.key || index}>
                        <strong>{totalItemSalePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong>
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
                        <strong>{totalCostWithout.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong>
                      </Table.Summary.Cell>
                    );
                  }

                  if (col.dataIndex === 'totalCostWithFactors') {
                    return (
                      <Table.Summary.Cell index={index} key={col.key || index}>
                        <strong>{totalCostOfRows.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong>
                      </Table.Summary.Cell>
                    );
                  }

                  if (col.dataIndex === 'finalSalePrice') {
                    return (
                      <Table.Summary.Cell index={index} key={col.key || index}>
                        <strong>{totalFinalSalePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong>
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
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
        <Button type="primary" onClick={handleSubmition}>
          {formatMessage({ id: 'app.home.submissionBtn' })}
        </Button>
      </div>
    </div>
  );
}

export default ProformaTable;
