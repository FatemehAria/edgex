import type { CSSProperties } from 'react';

import { CaretRightOutlined } from '@ant-design/icons';
import { Collapse, Form, Modal, Spin, theme } from 'antd';
import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import RedirectionButton from '@/components/custom/RedirectionButton';
import { LocaleFormatter, useLocale } from '@/locales';

import ProformaCostumer from '../costumer-info/ProformaCostumer';
import { getCustomersList } from '../costumer-info/util';
import ProformaGrouping from '../grouping-specifications/ProformaGrouping';
import { getGroupList } from '../grouping-specifications/util';
import FormLayout from '../layout/form-layout';
import ProformaStuff from '../proforma-stuff';
import ProformaSupplier from '../supplier/ProformaSupplier';
import { getSuppliersList } from '../supplier/util';
import { Columns } from './Columns';
import { IsEdittingProformaContext } from './context/IsEdittingProformaContext';
import { ProformaFormOptions } from './FormOptionsOfPro';
import { handleNewCustomer, handleNewGroup, handleNewItem, handleNewSupplier, isRowFilled } from './home-utils';
import ProformaTable from './ProformaTable';
import { getLastUnitCostByID, getStuffbyId } from './util';

function Home() {
  const { token } = theme.useToken();
  const { formatMessage } = useLocale();
  const [nextKey, setNextKey] = useState(2);
  const { locale } = useSelector(state => state.user);
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
  const [customerOptions, setCustomerOptions] = useState<{ label: string; value: string }[]>([]);
  const [selectedCostumer, setSelectedCostumer] = useState<string>('');
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const { setHeaderData } = useContext(IsEdittingProformaContext);
  const [selectedCatId, setSelectedCatId] = useState(localStorage.getItem('category-initialValue'));
  const [processedItems, setProcessedItems] = useState<Set<string>>(new Set());
  // const [userEditedUnits, setUserEditedUnits] = useState<Set<number>>(new Set());

  // const markUnitAsEdited = (rowKey: number) => {
  //   setUserEditedUnits(prev => new Set(prev.add(rowKey)));
  // };

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
  const [activeGroupingRow, setActiveGroupingRow] = useState<number | null>(null);

  useEffect(() => {
    getGroupList('/ExistenceCategory', (rawData: any) => {
      const transformed = rawData.map((item: any) => ({
        label: item.Title,
        value: item.ID,
      }));

      setGroupingOptions(transformed);
    });
  }, []);

  // const [itemOptions, setItemOptions] = useState<any[]>([]);
  const [itemOptionsMap, setItemOptionsMap] = useState<Record<string, { label: string; value: string }[]>>({});
  const [activeItemRow, setActiveItemRow] = useState<number | null>(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const prevItemsRef = useRef<Record<string, string>>({});

  const openItemModal = () => {
    setIsItemModalOpen(true);
  };

  useEffect(() => {
    if (selectedCatId) {
      getStuffbyId(
        (rawData: any) => {
          const transformed = rawData.map((item: any) => ({
            label: item.text ? item.text : locale === 'fa_IR' ? 'تعریف نشده' : 'Not defined',
            value: item.id,
          }));

          setItemOptionsMap(prev => ({
            ...prev,
            [selectedCatId!]: transformed,
          }));
        },
        locale,
        selectedCatId!,
      );
    }

    // console.log('selectedCatId', selectedCatId);
  }, [selectedCatId, locale]);

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

  useEffect(() => {
    tableData.forEach(row => {
      const itemId = row.items;
      const rowKey = row.key;
      const prevItemId = prevItemsRef.current[rowKey];
      const currItemId = row.items;

      // if (userEditedUnits.has(rowKey)) return;

      if (processedItems.has(`${rowKey}-${itemId}`) && row.unitCost === '') {
        // setProcessedItems(prev => {
        //   const newSet = new Set(prev);
        //   newSet.delete(`${rowKey}-${itemId}`);
        //   return newSet;
        // });
      }

      if (currItemId && currItemId !== prevItemId) {
        setProcessedItems(flags => {
          const next = new Set(flags);

          next.delete(`${rowKey}-${currItemId}`);

          return next;
        });
      }

      if (itemId && !processedItems.has(`${rowKey}-${itemId}`) && !row.unitCost) {
        getLastUnitCostByID(itemId).then(unitCost => {
          if (unitCost !== undefined) {
            setTableData(prevData =>
              prevData.map(r => (r.key === rowKey ? { ...r, unitCost: unitCost.toString() } : r)),
            );
            setProcessedItems(prev => new Set(prev.add(`${rowKey}-${itemId}`)));
          }
        });
      }

      prevItemsRef.current[rowKey] = currItemId;
    });
  }, [tableData, processedItems, setTableData]);
  // }, [tableData, processedItems, setTableData,userEditedUnits]);

  const columns = Columns(
    formatMessage,
    tableData,
    isRowFilled,
    setIsSupplierModalOpen,
    supplierOptions,
    setActiveSupplierRow,
    setActiveGroupingRow,
    setIsGroupingModalOpen,
    groupingOptions,
    itemOptionsMap,
    openItemModal,
    setActiveItemRow,
    setTableData,
    setSelectedCatId,
    insurancePrice,
    totalCostOfRows,
    // markUnitAsEdited,
  );

  const updateEditedRow = (field: string, value: any) => {
    localStorage.setItem(`header-info-${field.toLowerCase()}`, JSON.stringify(value));
  };

  const proformaFormOptions: any = ProformaFormOptions(
    formatMessage,
    customerOptions,
    openCustomerModal,
    setHeaderData,
    updateEditedRow,
  );
  const [allowRender, setAllowRender] = useState(false);
  // const { theme } = useSelector(state => state.global);

  useLayoutEffect(() => {
    const justReloaded = sessionStorage.getItem('_home_reloaded');

    if (!justReloaded) {
      // First time seeing this locale in *this* session:
      // 1) set a flag so we know not to reload the next time
      sessionStorage.setItem('_home_reloaded', '1');
      // 2) trigger the actual page reload
      window.location.reload();
      // we don’t call setAllowRender(true) because we're reloading
    } else {
      // We’ve just reloaded once, clear the flag and allow the UI to show
      sessionStorage.removeItem('_home_reloaded');
      setAllowRender(true);
    }
  }, [locale]);

  if (!allowRender) {
    // either return null for a blank page, or show a spinner:
    const spinnerStyle: CSSProperties = {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'var(--antd-token-color-bg-container)', // or a hard-coded color
    };

    return (
      <div style={spinnerStyle}>
        <Spin size="large" />
      </div>
    );
  }

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
          footerInsuranceCoefficient={footerInsuranceCoefficient}
          setFooterInsuranceCoefficient={setFooterInsuranceCoefficient}
        />
      ),
      style: panelStyle,
    },
  ];
  // const last = sessionStorage.getItem('lastLocale');

  // if (last && last !== locale) {
  //   // We know we've already asked to reload ONCE,
  //   // so clear the flag and let React render normally
  //   sessionStorage.removeItem('lastLocale');
  //   // Don’t return null here — we’ve already reloaded
  // } else if (!last && locale) {
  //   // First time seeing this locale in *this* session:
  //   // store it, then kick off a reload BEFORE painting
  //   sessionStorage.setItem('lastLocale', locale);
  //   window.location.reload();

  //   return null;
  // }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: token.colorBgBlur, overflow: 'auto' }}>
      <RedirectionButton btnText={formatMessage({ id: 'app.home.redirectionBtn' })} linkAddress="/proforma-list" />
      <Collapse
        bordered={false}
        defaultActiveKey={['1', '2']}
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
            handleNewCustomer(
              values,
              setCustomerOptions,
              setSelectedCostumer,
              setIsCustomerModalOpen,
              form,
              setHeaderData,
              updateEditedRow,
            )
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
          // initialOptions={itemOptionsMap[selectedCatId!] || []} // << supply only this category
          onItemSubmit={values =>
            handleNewItem(
              values,
              setItemOptionsMap, // << map setter
              activeItemRow,
              setTableData,
              setActiveItemRow,
              setIsItemModalOpen,
              selectedCatId!, // << current category
            )
          }
        />
      </Modal>
    </div>
  );
}

export default Home;
