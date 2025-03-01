import type { CSSProperties } from 'react';

import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, Form, Modal, theme } from 'antd';
import { useEffect, useState } from 'react';

import { useLocale } from '@/locales';
import { formatValue } from '@/utils/formatTypingNums';

import CostumerInfo from '../costumer-info';
import FormLayout from '../layout/form-layout';
import Supplier from '../supplier';
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
  const [form] = Form.useForm();
  // Manage customer options state
  const [customerOptions, setCustomerOptions] = useState<{ label: string; value: string }[]>([
    // { label: 'مشتری یک', value: '1' },
    // { label: 'مشتری دو', value: '2' },
  ]);
  const [selectedCostumer, setSelectedCostumer] = useState<string>('');
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

  const openCustomerModal = () => {
    setIsCustomerModalOpen(true);
  };

  // وقتی خالی باشه و مشتری جدید اضافه کنیم
  const handleNewCustomer = (values: any) => {
    const newCustomerName = values['costumer-info-factor-code'] || 'New Customer';
    const newCustomer = { label: newCustomerName, value: newCustomerName };

    setCustomerOptions(prev => [...prev, newCustomer]);
    setSelectedCostumer(newCustomer.value);
    setIsCustomerModalOpen(false);
  };

  useEffect(() => {
    form.setFieldsValue({ 'header-info-costumer': selectedCostumer });
  }, [selectedCostumer, form]);

  const [supplierOptions, setSupplierOptions] = useState<{ label: string; value: string }[]>([
    // Possibly prefill with some suppliers if desired.
  ]);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [activeSupplierRow, setActiveSupplierRow] = useState<number | null>(null);

  const handleNewSupplier = (values: any) => {
    // Use the field 'supplier-person-company' from the form as the new supplier name.
    const newSupplierName = values['supplier-person-company'] || 'New Supplier';
    const newSupplier = { label: newSupplierName, value: newSupplierName };

    setSupplierOptions(prev => [...prev, newSupplier]);

    if (activeSupplierRow !== null) {
      // Update the specific row in tableData:
      setTableData(prevData =>
        prevData.map(row => (row.key === activeSupplierRow ? { ...row, supplier: newSupplier.value } : row)),
      );
      setActiveSupplierRow(null);
    }

    setIsSupplierModalOpen(false);
  };

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
    const requiredFields = ['qty', 'unitCost', 'recordProfitMargin'];

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

          if (['qty', 'unitCost', 'factorValue', 'itemSalePriceRounded', 'recordProfitMargin'].includes(dataIndex)) {
            const qty = parseFloat(updatedRow.qty) || 0;
            // Remove commas before converting to a number:
            const unitCost = parseFloat(String(updatedRow.unitCost).replace(/,/g, '')) || 0;

            // هزینه کل
            updatedRow.totalPriceWithoutFactors = qty * unitCost;

            const {
              'record-percentage-discount': percentageDiscount = 0,
              'record-commute': commute = 0,
              'record-amount-discount': amountDiscount = 0,
            } = updatedRow.modalValues || {};

            // قیمت فروش اولیه
            const primarySalesPrice = Number(updatedRow.recordProfitMargin) * unitCost + unitCost;

            updatedRow.primarySalesPrice = primarySalesPrice;

            // قیمت کل آیتم
            const itemTotalPrice = primarySalesPrice * qty;

            updatedRow.itemTotalPrice = itemTotalPrice;

            const totalCost = totalCostOfRows || 1;
            const qtyNumber = qty || 1;

            const shareOfTaxAndInsModulo = Number(insurancePrice) / totalCost / qtyNumber;
            // سهم آیتم از بیمه و مالیات
            const shareOfTaxAndIns = shareOfTaxAndInsModulo * 0.115 * itemTotalPrice;

            updatedRow.itemShareOfTaxAndIns = Math.ceil(shareOfTaxAndIns);

            // قیمت فروش آیتم
            const itemSalePrice = primarySalesPrice + shareOfTaxAndIns;

            updatedRow.itemSalePrice = itemSalePrice;
            // قیمت فروش آیتم رند شده

            if (dataIndex === 'itemSalePriceRounded') {
              updatedRow.itemSalePriceRounded = formatValue(value);
            } else {
              updatedRow.itemSalePriceRounded = formatValue(String(Math.round(itemSalePrice)));
            }

            // قیمت فروش نهایی
            const finalSalePrice = parseFloat(String(updatedRow.itemSalePriceRounded).replace(/,/g, '')) * qty;

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

  const columns = Columns(
    formatMessage,
    handleCellChange,
    deleteRow,
    tableData,
    isRowFilled,
    setIsSupplierModalOpen,
    supplierOptions,
    setActiveSupplierRow,
  );

  const proformaFormOptions: any = ProformaFormOptions(formatMessage, customerOptions, openCustomerModal);

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
          form={form}
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
    <>
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

      {/* Modal for adding a new customer */}
      <Modal
        title="Add New Costumer"
        open={isCustomerModalOpen}
        onCancel={() => setIsCustomerModalOpen(false)}
        footer={null}
      >
        <CostumerInfo onCustomerSubmit={handleNewCustomer} />
      </Modal>

      <Modal
        title="Add New Supplier"
        open={isSupplierModalOpen}
        onCancel={() => setIsSupplierModalOpen(false)}
        footer={null}
      >
        <Supplier onSupplierSubmit={handleNewSupplier} />
      </Modal>
    </>
  );
}

export default Home;
