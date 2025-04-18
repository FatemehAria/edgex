import type { CSSProperties } from 'react';

import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, Form, Modal, theme } from 'antd';
import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useLocale } from '@/locales';

import ProformaCostumer from '../costumer-info/ProformaCostumer';
import { getCustomersList } from '../costumer-info/util';
import ProformaGrouping from '../grouping-specifications/ProformaGrouping';
import { getGroupList } from '../grouping-specifications/util';
import FormLayout from '../layout/form-layout';
import ProformaStuff from '../proforma-stuff';
import ProformaSupplier from '../supplier/ProformaSupplier';
import { getSuppliersList } from '../supplier/util';
import { IsEdittingProformaContext } from './context/IsEdittingProformaContext';
import { EditColumns } from './EditColumns';
import { ProformaFormOptions } from './FormOptionsOfPro';
import { handleNewCustomer, handleNewGroup, handleNewItem, handleNewSupplier, isRowFilled } from './home-utils';
import ProformaTable from './ProformaTable';
import { getStuffbyId } from './util';

function ListOfProformaEdit({ updateEditedRow }: { updateEditedRow?: any }) {
  const { token } = theme.useToken();
  const { locale } = useSelector(state => state.user);
  const { formatMessage } = useLocale();
  const [nextKey, setNextKey] = useState(2);
  const { singleProformaInfo, headerData, setHeaderData, isLoadingProformaInfo } =
    useContext(IsEdittingProformaContext);
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

  console.log('headerData', headerData);
  useEffect(() => {
    // if (singleProformaInfo) {
    setTableData(singleProformaInfo);
    // }
  }, [singleProformaInfo]);

  const [customerOptions, setCustomerOptions] = useState<{ label: string; value: string }[]>([]);
  const [selectedCostumer, setSelectedCostumer] = useState<string>('');
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

  const openCustomerModal = () => {
    setIsCustomerModalOpen(true);
  };

  useEffect(() => {
    form.setFieldsValue({ CustomerTitle: selectedCostumer });
  }, [selectedCostumer, form]);

  useEffect(() => {
    getCustomersList((rawData: any) => {
      const transformed = rawData.map((item: any) => ({
        label: item.text ? item.text : '',
        value: item.id ? item.id : '',
      }));

      setCustomerOptions(transformed);
    }, locale);
  }, [locale]);

  useEffect(() => {
    if (headerData && customerOptions.length > 0) {
      // Ensure the form field "CustomerTitle" is updated with the customer ID.
      // Assume headerData.CustomerTitle is a string ID.
      form.setFieldsValue({
        CustomerTitle: headerData.CustomerTitle,
      });
    }
  }, [headerData, customerOptions, form]);

  const [supplierOptions, setSupplierOptions] = useState<{ label: string; value: string }[]>([]);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [activeSupplierRow, setActiveSupplierRow] = useState<number | null>(null);

  useEffect(() => {
    getSuppliersList((rawData: any) => {
      const transformed = rawData.map((item: any) => ({
        label: item.text,
        value: item.id,
      }));

      setSupplierOptions(transformed);
    }, locale);
  }, [locale]);

  const [groupingOptions, setGroupingOptions] = useState<{ label: string; value: string }[]>([]);
  const [isGroupingModalOpen, setIsGroupingModalOpen] = useState(false);
  const [groupRefresh, setGroupRefresh] = useState(false);
  const [activeGroupingRow, setActiveGroupingRow] = useState<number | null>(null);

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

  useEffect(() => {
    getStuffbyId((rawData: any) => {
      const transformed = rawData.map((item: any) => ({
        label: item.Title || item.text,
        value: item.id,
      }));

      setItemOptions(transformed);
    }, locale);
  }, [localStorage.getItem('selected-cat-ID'), localStorage.getItem('category-initialValue'), locale]);

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

  useEffect(() => {
    const lastRow = tableData[tableData.length - 1];

    if (lastRow && isRowFilled(lastRow)) {
      setTableData(prevData => [...prevData, createEmptyRow()]);
    }
  }, [tableData]);

  const allColumns = EditColumns(
    formatMessage,
    tableData,
    isRowFilled,
    setIsSupplierModalOpen,
    supplierOptions,
    setActiveSupplierRow,
    setActiveGroupingRow,
    setIsGroupingModalOpen,
    groupingOptions,
    itemOptions,
    openItemModal,
    setActiveItemRow,
    setTableData,
  );

  const columns = allColumns.filter(col => !col.hidden);

  // useEffect(() => {
  //   if (headerData) {
  //     const formattedData = {
  //       ...headerData,
  //       Date: headerData['Date'] ? dayjs(headerData['Date']) : null,
  //     };

  //     // form.resetFields();
  //     form.setFieldsValue(formattedData);
  //   }
  // }, [headerData, form]);

  const proformaFormOptions: any = ProformaFormOptions(
    formatMessage,
    customerOptions,
    openCustomerModal,
    setHeaderData,
    updateEditedRow,
    headerData,
    locale,
    headerData,
  );

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
          setTableData={setTableData}
          form={form}
          // isRowFilled={isRowFilled}
        />
      ),
      style: panelStyle,
    },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: token.colorBgBlur, overflow: 'auto' }}>
      {!isLoadingProformaInfo ? (
        <>
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
            <ProformaCostumer
              onCustomerSubmit={values =>
                handleNewCustomer(values, setCustomerOptions, setSelectedCostumer, setIsCustomerModalOpen)
              }
            />
          </Modal>

          <Modal
            title={formatMessage({ id: 'app.costumerInfo.modalHeader' })}
            open={isSupplierModalOpen}
            onCancel={() => setIsSupplierModalOpen(false)}
            footer={null}
          >
            <ProformaSupplier
              onSupplierSubmit={values =>
                handleNewSupplier(
                  values,
                  setSupplierOptions,
                  activeSupplierRow,
                  setTableData,
                  setActiveGroupingRow,
                  setIsSupplierModalOpen,
                  locale,
                )
              }
            />
          </Modal>

          <Modal
            title={formatMessage({ id: 'app.costumerInfo.modalHeader' })}
            open={isGroupingModalOpen}
            onCancel={() => setIsGroupingModalOpen(false)}
            footer={null}
          >
            <ProformaGrouping
              onGroupSubmit={values =>
                handleNewGroup(
                  values,
                  setGroupingOptions,
                  setIsGroupingModalOpen,
                  activeGroupingRow,
                  setTableData,
                  setActiveGroupingRow,
                )
              }
            />
          </Modal>

          <Modal
            title={formatMessage({ id: 'app.itemsInfo.modalHeader' })}
            open={isItemModalOpen}
            onCancel={() => setIsItemModalOpen(false)}
            footer={null}
          >
            <ProformaStuff
              onItemSubmit={values =>
                handleNewItem(values, setItemOptions, activeItemRow, setTableData, setActiveItemRow, setIsItemModalOpen)
              }
            />
          </Modal>
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

export default ListOfProformaEdit;
