import type { Dispatch, SetStateAction } from 'react';

import './columns.css';

import { Button, Table } from 'antd';
import { useContext, useEffect } from 'react';

import { IsEdittingProformaContext } from './context/IsEdittingProformaContext';
import FooterTableColumns from './FooterTableColumns';
import { calculateFinalValues, createProforma, createProformaPayload, updateProforma } from './util';

function ProformaTable({
  tableData,
  columns,
  formatMessage,
  // footerInsuranceCoefficient,
  insurancePrice,
  setinsurancePrice,
  setTotalCostOfRows,
  totalCostOfRows,
  isRowFilled,
}: {
  tableData: any;
  columns: any;
  formatMessage: any;
  // setFooterInsuranceCoefficient: Dispatch<SetStateAction<string>>;
  // footerInsuranceCoefficient: string;
  insurancePrice: number;
  setinsurancePrice: Dispatch<SetStateAction<number>>;
  setTotalCostOfRows: Dispatch<SetStateAction<number>>;
  totalCostOfRows: number;
  isRowFilled: any;
}) {
  const { isEdittingProforma, setIsEdittingProforma, setIsCopyingProforma, isCopyingProforma } =
    useContext(IsEdittingProformaContext);
  // useEffect(() => {
  //   // Calculate the total cost (sum of itemTotalPrice)
  //   const totalCost = tableData.reduce((sum: number, row: any) => sum + (parseFloat(row.itemTotalPrice) || 0), 0);

  //   setTotalCostOfRows(totalCost);

  //   // Calculate the insurance price based on the footer coefficient
  //   const calculatedInsurancePrice = Number(footerInsuranceCoefficient) * totalCost;

  //   setinsurancePrice(calculatedInsurancePrice);
  // }, [tableData, footerInsuranceCoefficient, setTotalCostOfRows, setinsurancePrice]);

  useEffect(() => {
    const totalCost = tableData.reduce((sum: number, row: any) => sum + (parseFloat(row.itemTotalPrice) || 0), 0);

    setTotalCostOfRows(totalCost);

    const calculatedInsurancePrice = tableData.reduce((sum: number, row: any) => {
      const rowTotal = parseFloat(row.itemTotalPrice) || 0; // defaults to 0 if NaN or empty
      const rowCoefficient = Number(row.footerInsuranceCoefficient) || 0; // defaults to 0 if undefined

      return sum + rowTotal * rowCoefficient;
    }, 0);

    setinsurancePrice(calculatedInsurancePrice);
  }, [tableData, setTotalCostOfRows, setinsurancePrice]);

  // const payload = createProformaPayload(tableData, insurancePrice, isRowFilled, footerInsuranceCoefficient);
  const payload = createProformaPayload(tableData, insurancePrice, isRowFilled);

  console.log('payload', payload);

  // const handleSubmition = async () => {
  //   if (isCopyingProforma) {
  //     await createProforma(payload);
  //     setIsCopyingProforma(false);
  //   } else if (isEdittingProforma) {
  //     await updateProforma(payload);
  //     setIsEdittingProforma(false);
  //   }
  // };

  const handleSubmition = async () => {
    if (isCopyingProforma) {
      // If copy mode is active, execute the create API.
      await createProforma(payload);
      setIsCopyingProforma(false);
    } else if (isEdittingProforma) {
      // Otherwise, if editing, execute the update API.
      await updateProforma(payload);
      setIsEdittingProforma(false);
    }
  };

  return (
    <div>
      <Table
        dataSource={tableData}
        columns={columns}
        pagination={false}
        rowClassName="editable-row"
        scroll={{ x: 3000 }}
        footer={() => {
          const finalValues = calculateFinalValues(tableData, insurancePrice);
          // const totalFinalSalePrice = tableData.reduce(
          //   (sum: number, row: any) => sum + (parseFloat(row.finalSalePrice) || 0),
          //   0,
          // );
          // const vat = 0.1 * totalFinalSalePrice;
          // const total = vat + totalFinalSalePrice;
          // const tenPercentTax = 0.1 * totalFinalSalePrice;
          // const finalProfit =
          //   totalFinalSalePrice -
          //   tenPercentTax -
          //   insurancePrice -
          //   tableData.reduce((sum: number, row: any) => sum + (parseFloat(row.totalPriceWithoutFactors) || 0), 0);
          // const totalProfitMargin = totalFinalSalePrice > 0 ? (finalProfit * 100) / totalFinalSalePrice : 0;
          // const insuranceCheckAmount = 0.0778 * totalFinalSalePrice;

          // const FooterTableData = [
          //   {
          //     key: 'footer',
          //     vat: `${Math.round(vat)
          //       .toString()
          //       .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
          //     total: `${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
          //     finalProfit: `${finalProfit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
          //     finalProfitMargin: `${totalProfitMargin}`,
          //     insuranceCheckAmount: `${Math.round(insuranceCheckAmount)
          //       .toString()
          //       .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
          //   },
          // ];
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
