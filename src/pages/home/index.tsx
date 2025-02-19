import type { CSSProperties } from 'react';

import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, theme } from 'antd';
import { useEffect, useState } from 'react';

import { useLocale } from '@/locales';

import FormLayout from '../layout/form-layout';
import { Columns } from './Columns';
import { ProformaFormOptions } from './FormOptionsOfPro';
import ProformaTable from './ProformaTable';

function Home() {
  const { token } = theme.useToken();
  const { formatMessage } = useLocale();
  const [nextKey, setNextKey] = useState(2);
  const [footerInsuranceCoefficient, setFooterInsuranceCoefficient] = useState<string>('0.085'); // default "0.085"
  const [insurancePrice, setinsurancePrice] = useState<number>(0);
  const [totalCostOfRows, setTotalCostOfRows] = useState<number>(0);
  const [tableData, setTableData] = useState<any[]>([
    {
      key: 1,
      category: '',
      supplier: '',
      recordProfitMargin: 0,
      primarySalesPrice: 0,
      itemTotalPrice: 0,
      totalPriceWithoutFactors: 0,
      footerInsurancePrice: 0,
      itemShareOfTaxAndIns: 0,
      itemSalePrice: 0,
      itemSalePriceRounded: 0,
      finalSalePrice: 0,
      totalFinalSalePrice: 0,
      totalProfitMargin: 0,
      insuranceCheckAmount: 0,
      vat: 0,
      total: 0,
      tenPercentTax: 0,
      finalProfit: 0,
      qty: '',
      unitCost: '',
      totalPriceWithFactors: 0,
      description: '',
      factorValue: '',
      modalValues: {
        'record-percentage-discount': 0,
        'record-commute': 0,
        'record-amount-discount': 0,
      },
      factor: '',
    },
  ]);

  // const [modalForm] = Form.useForm();
  // const [activeRowKey, setActiveRowKey] = useState<number | null>(null);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const createEmptyRow = () => {
    const newRow = {
      key: nextKey,
      category: '',
      items: '',
      supplier: '',
      recordProfitMargin: 0,
      primarySalesPrice: 0,
      itemTotalPrice: 0,
      footerInsurancePrice: 0,
      itemShareOfTaxAndIns: 0,
      itemSalePrice: 0,
      finalSalePrice: 0,
      totalFinalSalePrice: 0,
      totalProfitMargin: 0,
      insuranceCheckAmount: 0,
      itemSalePriceRounded: 0,
      vat: 0,
      total: 0,
      finalProfit: 0,
      tenPercentTax: 0,
      qty: '',
      unitCost: '',
      totalPriceWithFactors: 0,
      totalPriceWithoutFactors: 0,
      description: '',
      factorValue: '',
      modalValues: {
        'record-percentage-discount': 0,
        'record-commute': 0,
        'record-amount-discount': 0,
      },
      factor: '',
    };

    setNextKey(prev => prev + 1);

    return newRow;
  };

  const isRowFilled = (row: any) => {
    const requiredFields = ['qty', 'unitCost'];

    return requiredFields.every(field => {
      const value = row[field];

      return value !== undefined && value !== null && value.toString().trim() !== '';
    });
  };

  const handleCellChange = (value: string, key: string, dataIndex: string) => {
    setTableData(prevData =>
      prevData.map(row => {
        if (row.key === key) {
          const updatedRow = { ...row, [dataIndex]: value };

          if (dataIndex === 'qty' || dataIndex === 'unitCost' || dataIndex === 'factorValue') {
            const qty = parseFloat(updatedRow.qty) || 0;
            // Remove commas before converting to a number:
            const unitCost = parseFloat(String(updatedRow.unitCost).replace(/,/g, '')) || 0;

            // Total price without factors
            updatedRow.totalPriceWithoutFactors = qty * unitCost;

            const {
              'record-percentage-discount': percentageDiscount = 0,
              'record-commute': commute = 0,
              'record-amount-discount': amountDiscount = 0,
            } = updatedRow.modalValues || {};

            // Primary sales price calculation
            const primarySalesPrice = Number(updatedRow.recordProfitMargin) * unitCost + unitCost;

            updatedRow.primarySalesPrice = primarySalesPrice;

            // Total item price
            const itemTotalPrice = primarySalesPrice * qty;

            updatedRow.itemTotalPrice = itemTotalPrice;

            // Guard against division by zero. If totalCostOfRows or qty is zero, use 1 as fallback.
            const totalCost = totalCostOfRows || 1;
            const qtyNumber = qty || 1;
            const shareOfTaxAndInsModulo = Number(insurancePrice) / totalCost / qtyNumber;
            // سهم آیتم از بیمه و مالیات
            const shareOfTaxAndIns = shareOfTaxAndInsModulo * 0.115 * itemTotalPrice;

            updatedRow.itemShareOfTaxAndIns = Math.ceil(shareOfTaxAndIns);

            console.log(updatedRow.itemShareOfTaxAndIns);
            // Item sale price = primary sales price + share of tax and insurance
            const itemSalePrice = primarySalesPrice + shareOfTaxAndIns;

            updatedRow.itemSalePrice = itemSalePrice;
            updatedRow.itemSalePriceRounded = Math.ceil(itemSalePrice);

            // Final sale price = item sale price * quantity
            const finalSalePrice = itemSalePrice * qty;

            updatedRow.finalSalePrice = finalSalePrice;

            const recordPercentageDiscount = (Number(percentageDiscount) / 100) * updatedRow.totalPriceWithoutFactors;

            updatedRow.totalPriceWithFactors =
              primarySalesPrice +
              Number(commute) +
              updatedRow.totalPriceWithoutFactors -
              Number(amountDiscount) -
              recordPercentageDiscount;
          }

          return updatedRow;
        }

        return row;
      }),
    );
  };

  useEffect(() => {
    const lastRow = tableData[tableData.length - 1];

    if (lastRow && isRowFilled(lastRow)) {
      setTableData(prevData => [...prevData, createEmptyRow()]);
    }
  }, [tableData]);

  const deleteRow = (key: string) => {
    setTableData(prevData => {
      const rowToDelete = prevData.find(row => row.key === key);

      if (rowToDelete && prevData[0].key === rowToDelete.key && !isRowFilled(rowToDelete)) {
        return prevData;
      }

      return prevData.filter(row => row.key !== key);
    });
  };

  // const showModal = (rowKey: number) => {
  //   setActiveRowKey(rowKey);
  //   setIsModalOpen(true);
  //   const row = tableData.find(r => r.key === rowKey);

  //   if (row && row.modalValues) {
  //     modalForm.setFieldsValue(row.modalValues);
  //   } else {
  //     modalForm.resetFields();
  //   }
  // };

  // const handleOk = async () => {
  //   try {
  //     const values = await modalForm.validateFields();

  //     setTableData(prevData =>
  //       prevData.map(row => {
  //         if (row.key === activeRowKey) {
  //           const updatedRow = { ...row, modalValues: { ...values } };
  //           const qty = parseFloat(updatedRow.qty) || 0;
  //           const unitCost = parseFloat(updatedRow.unitCost) || 0;
  //           const totalPriceWithoutFactors = qty * unitCost;

  //           updatedRow.totalPriceWithoutFactors = totalPriceWithoutFactors;
  //           const percentageDiscount = Number(values['record-percentage-discount'] || 0);
  //           const commute = Number(values['record-commute'] || 0);
  //           const amountDiscount = Number(values['record-amount-discount'] || 0);
  //           const primarySalesPrice = Number(updatedRow.recordProfitMargin) * unitCost + unitCost;

  //           updatedRow.primarySalesPrice = primarySalesPrice;
  //           const itemTotalPrice = primarySalesPrice * qty;

  //           updatedRow.itemTotalPrice = itemTotalPrice;
  //           const recordPercentageDiscount = (percentageDiscount / 100) * totalPriceWithoutFactors;

  //           updatedRow.totalPriceWithFactors =
  //             primarySalesPrice + commute + totalPriceWithoutFactors - amountDiscount - recordPercentageDiscount;
  //           updatedRow.factor = commute + amountDiscount + primarySalesPrice + recordPercentageDiscount;
  //           updatedRow.decFactors = recordPercentageDiscount + amountDiscount;
  //           updatedRow.incFactors = commute + primarySalesPrice;

  //           return updatedRow;
  //         }

  //         return row;
  //       }),
  //     );
  //     setIsModalOpen(false);
  //     modalForm.resetFields();
  //     setActiveRowKey(null);
  //   } catch (error) {
  //     console.error('Form validation failed:', error);
  //   }
  // };

  // const handleCancel = () => {
  //   setIsModalOpen(false);
  //   modalForm.resetFields();
  //   setActiveRowKey(null);
  // };

  // const modalFormOptions: any = ModalFormOptions(formatMessage);

  const columns = Columns(
    formatMessage,
    handleCellChange,
    // showModal,
    deleteRow,
    tableData,
    isRowFilled,
    // isModalOpen,
    // modalForm,
    // modalFormOptions,
    // handleOk,
    // handleCancel,
  );
  const proformaFormOptions: any = ProformaFormOptions(formatMessage);

  const panelStyle: CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
    fontWeight: 600,
  };

  const getItems = (panelStyle: CSSProperties) => [
    {
      key: '1',
      label: `${formatMessage({ id: 'app.home.headerInfo' })}`,
      children: (
        <FormLayout
          FormOptions={proformaFormOptions}
          layoutDir="vertical"
          isGrid={true}
          submitForm={() => console.log('')}
        />
      ),
      style: panelStyle,
    },
    {
      key: '2',
      label: `${formatMessage({ id: 'app.home.detailInfo' })}`,
      children: (
        <ProformaTable
          columns={columns}
          formatMessage={formatMessage}
          tableData={tableData}
          footerInsuranceCoefficient={footerInsuranceCoefficient}
          setFooterInsuranceCoefficient={setFooterInsuranceCoefficient}
          insurancePrice={insurancePrice}
          setinsurancePrice={setinsurancePrice}
          setTotalCostOfRows={setTotalCostOfRows}
          totalCostOfRows={totalCostOfRows}
        />
      ),
      style: panelStyle,
    },
  ];

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      style={{ background: token.colorBgContainer }}
    >
      {getItems(panelStyle).map((item: any) => (
        <Collapse.Panel key={item.key} header={item.label} style={item.style}>
          {item.children}
        </Collapse.Panel>
      ))}
    </Collapse>
  );
}

export default Home;
