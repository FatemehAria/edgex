import type { CSSProperties } from 'react';

import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, Form, Modal, theme } from 'antd';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';

import { useLocale } from '@/locales';
import { formatValue } from '@/utils/formatTypingNums';

import ProformaCostumer from '../costumer-info/ProformaCostumer';
import { createCustomer, getCustomersList } from '../costumer-info/util';
import ProformaGrouping from '../grouping-specifications/ProformaGrouping';
import { getGroupList } from '../grouping-specifications/util';
import FormLayout from '../layout/form-layout';
import ProformaStuff from '../proforma-stuff';
import ProformaSupplier from '../supplier/ProformaSupplier';
import { createSupplier, getSuppliersList } from '../supplier/util';
import { IsEdittingProformaContext } from './context/IsEdittingProformaContext';
import { EditColumns } from './EditColumns';
import { ProformaFormOptions } from './FormOptionsOfPro';
import ProformaTable from './ProformaTable';
import { createProformaCategory, createProformaStuff, getStuffbyId } from './util';

function ListOfProformaEdit() {
  const { token } = theme.useToken();
  const { formatMessage } = useLocale();
  const [nextKey, setNextKey] = useState(2);
  const { singleProformaInfo, headerData } = useContext(IsEdittingProformaContext);
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
      footerInsuranceCoefficient: '0.085',
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
      insurancePriceForRecord: 0,
      modalValues: {
        'record-percentage-discount': 0,
        'record-commute': 0,
        'record-amount-discount': 0,
      },
      factor: '',
    },
  ]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (singleProformaInfo) {
      setTableData(singleProformaInfo);
    }
  }, [singleProformaInfo]);

  const [customerOptions, setCustomerOptions] = useState<{ label: string; value: string }[]>([]);
  const [selectedCostumer, setSelectedCostumer] = useState<string>('');
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

  const openCustomerModal = () => {
    setIsCustomerModalOpen(true);
  };

  const handleNewCustomer = (values: any) => {
    console.log('values for new customer', values);
    const newCustomer = {
      label: values['companyPersonTitle'],
      value: values['companyPersonTitle'],
      companyPersonType: values['companyPersonType'],
      companyPersonTitle: values['companyPersonTitle'],
      telephone: values['telephone'],
      provinceID: values['provinceID'],
      cityID: values['cityID'],
      address: values['address'],
      isActive: values['isActive'],
    };

    setCustomerOptions(prev => [...prev, newCustomer]);

    setSelectedCostumer(newCustomer.value);

    createCustomer(newCustomer);

    setIsCustomerModalOpen(false);
  };

  useEffect(() => {
    form.setFieldsValue({ 'header-info-costumer': selectedCostumer });
  }, [selectedCostumer, form]);

  useEffect(() => {
    getCustomersList((rawData: any) => {
      const transformed = rawData.map((item: any) => ({
        label: item.text ? item.text : '',
        value: item.id ? item.id : '',
      }));

      setCustomerOptions(transformed);
    });
  }, []);

  const [supplierOptions, setSupplierOptions] = useState<{ label: string; value: string }[]>([]);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [activeSupplierRow, setActiveSupplierRow] = useState<number | null>(null);

  const handleNewSupplier = (values: any) => {
    const newSupplier = {
      label: values['companyPersonTitle'],
      value: values['companyPersonTitle'],
      personTypeCode: values['personTypeCode'],
      companyPersonTitle: values['companyPersonTitle'],
      isActive: values['isActive'],
    };

    setSupplierOptions(prev => [...prev, newSupplier]);

    if (activeSupplierRow !== null) {
      setTableData(prevData =>
        prevData.map(row => (row.key === activeSupplierRow ? { ...row, supplier: newSupplier.value } : row)),
      );
      setActiveSupplierRow(null);
    }

    createSupplier(values);

    setIsSupplierModalOpen(false);
  };

  useEffect(() => {
    getSuppliersList((rawData: any) => {
      const transformed = rawData.map((item: any) => ({
        label: item.text,
        value: item.id, // or item.ID, or item.whatever
        // value: item.ID, // or item.ID, or item.whatever
      }));

      setSupplierOptions(transformed);
    });
  }, []);

  const [groupingOptions, setGroupingOptions] = useState<{ label: string; value: string }[]>([]);
  const [isGroupingModalOpen, setIsGroupingModalOpen] = useState(false);
  const [groupRefresh, setGroupRefresh] = useState(false);
  const [activeGroupingRow, setActiveGroupingRow] = useState<number | null>(null);

  const handleNewGroup = (values: any) => {
    console.log('Group submitted:', values);

    const newGroup = {
      label: values['Title'],
      value: values['Title'],
      Title: values['Title'],
      'grp-specification-title-persian': values['TiltePersian'],
      ExistenceCode: values['ExistenceCode'] || '1',
    };

    setGroupingOptions(prev => [...prev, newGroup]);

    createProformaCategory(newGroup);

    setGroupRefresh(prev => !prev);

    setIsGroupingModalOpen(false);
  };

  useEffect(() => {
    getGroupList('/ExistenceCategory', (rawData: any) => {
      const transformed = rawData.map((item: any) => ({
        label: item.Title,
        value: item.ID,
      }));

      setGroupingOptions(transformed);
    });
  }, [groupRefresh]);

  const [itemOptions, setItemOptions] = useState<any[]>([]);
  const [activeItemRow, setActiveItemRow] = useState<number | null>(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);

  const openItemModal = () => {
    setIsItemModalOpen(true);
  };

  const handleNewItem = (values: any) => {
    console.log('item values', values);

    const newItem = {
      label: values['title'],
      value: values['title'],
      Title: values['title'],
      TitlePersian: values['titlePersian'],
      Description: values['description'],
    };

    setItemOptions(prev => [...prev, newItem]);

    if (activeItemRow !== null) {
      setTableData(prevData =>
        prevData.map(row => (row.key === activeItemRow ? { ...row, items: newItem.value } : row)),
      );
      setActiveItemRow(null);
    }

    createProformaStuff(newItem);
    setIsItemModalOpen(false);
  };

  useEffect(() => {
    getStuffbyId((rawData: any) => {
      const transformed = rawData.map((item: any) => ({
        label: item.Title || item.text,
        value: item.id,
      }));

      setItemOptions(transformed);
    });
  }, [localStorage.getItem('selected-cat-ID'), localStorage.getItem('category-initialValue')]);

  const createEmptyRow = () => {
    const newRow = {
      key: nextKey,
      category: '',
      items: '',
      supplier: '',
      recordProfitMargin: 0,
      primarySalesPrice: 0,
      itemTotalPrice: 0,
      footerInsuranceCoefficient: '0.085',
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
      insurancePriceForRecord: 0,
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

          if (
            [
              'qty',
              'unitCost',
              'factorValue',
              'itemSalePriceRounded',
              'recordProfitMargin',
              'footerInsuranceCoefficient',
            ].includes(dataIndex)
          ) {
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

            // مبلغ بیمه برای هر رکورد
            const insurancePriceForRecord = updatedRow.itemTotalPrice * Number(updatedRow.footerInsuranceCoefficient);

            updatedRow.insurancePriceForRecord = insurancePriceForRecord;

            // const totalCost = totalCostOfRows || 1;
            const qtyNumber = qty || 1;

            const sumOfItemTotalPrice = tableData.reduce(
              (sum: number, row: any) => sum + (parseFloat(row.itemTotalPrice) || 0),
              0,
            );

            console.log(sumOfItemTotalPrice);
            const shareOfTaxAndInsModulo = insurancePriceForRecord / sumOfItemTotalPrice / qtyNumber;

            // سهم آیتم از بیمه و مالیات
            // const shareOfTaxAndIns = shareOfTaxAndInsModulo * 0.115 * itemTotalPrice;
            const shareOfTaxAndIns = shareOfTaxAndInsModulo * 0.115;

            // updatedRow.itemShareOfTaxAndIns = Math.ceil(shareOfTaxAndIns);
            updatedRow.itemShareOfTaxAndIns = shareOfTaxAndIns;

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

  const allColumns = EditColumns(
    formatMessage, // 1. formatMessage
    handleCellChange, // 2. handleCellChange
    deleteRow, // 3. deleteRow
    tableData, // 4. tableData
    isRowFilled, // 5. isRowFilled
    setIsSupplierModalOpen, // 6. setIsSupplierModalOpen
    supplierOptions, // 7. supplierOptions
    setActiveSupplierRow, // 8. setActiveSupplierRow
    insurancePrice, // 9. insurancePrice
    setActiveGroupingRow, // 12. setActiveGroupingRow
    setIsGroupingModalOpen, // 13. setIsGroupingModalOpen
    groupingOptions, // 14. groupingOptions
    itemOptions, // 15. itemOptions
    openItemModal, // 16. openItemModal
    setActiveItemRow, // 17. setActiveItemRow
    setTableData, // 18. setTableData
  );

  const columns = allColumns.filter(col => !col.hidden);

  useEffect(() => {
    if (headerData) {
      const formattedData = {
        ...headerData,
        'header-info-date': headerData['header-info-date'] ? dayjs(headerData['header-info-date']) : null,
      };

      form.resetFields();
      form.setFieldsValue(formattedData);
    }
  }, [headerData, form]);

  const proformaFormOptions: any = ProformaFormOptions(formatMessage, customerOptions, openCustomerModal, headerData);

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
    <div style={{ minHeight: '100vh', backgroundColor: token.colorBgBlur, overflow: 'auto' }}>
      <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        style={{ background: token.colorBgContainer }}
        items={getItems(panelStyle)}
      ></Collapse>

      <Modal
        title={formatMessage({ id: 'app.costumerInfo.modalHeader' })}
        open={isCustomerModalOpen}
        onCancel={() => setIsCustomerModalOpen(false)}
        footer={null}
      >
        <ProformaCostumer onCustomerSubmit={handleNewCustomer} />
      </Modal>

      <Modal
        title={formatMessage({ id: 'app.costumerInfo.modalHeader' })}
        open={isSupplierModalOpen}
        onCancel={() => setIsSupplierModalOpen(false)}
        footer={null}
      >
        <ProformaSupplier onSupplierSubmit={handleNewSupplier} />
      </Modal>

      <Modal
        title={formatMessage({ id: 'app.costumerInfo.modalHeader' })}
        open={isGroupingModalOpen}
        onCancel={() => setIsGroupingModalOpen(false)}
        footer={null}
      >
        <ProformaGrouping onGroupSubmit={handleNewGroup} />
      </Modal>

      <Modal
        title={formatMessage({ id: 'app.itemsInfo.modalHeader' })}
        open={isItemModalOpen}
        onCancel={() => setIsItemModalOpen(false)}
        footer={null}
      >
        <ProformaStuff onItemSubmit={handleNewItem} />
      </Modal>
    </div>
  );
}

export default ListOfProformaEdit;
