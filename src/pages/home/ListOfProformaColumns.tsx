import { faCheck, faCopy, faPenToSquare, faPrint, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment-jalaali';
import { useContext } from 'react';

import { useLocale } from '@/locales';

import { IsEdittingProformaContext } from './context/IsEdittingProformaContext';
import { confirmProforma, getEngReport, getPerReport, getSingleProformaInfo } from './util';

export function ListOfProformaColumns({
  deleteRow,
  handleEdit,
  copyRow,
  refreshList,
  handleCopy,
}: {
  deleteRow: (key: string) => void;
  handleEdit: any;
  copyRow: any;
  refreshList: any;
  handleCopy: any;
}) {
  const { formatMessage } = useLocale();
  const { setSingleProformaInfo, setHeaderData, setProformaStatus, setSelectedProformaInfo, proformaStatus } =
    useContext(IsEdittingProformaContext);

  return [
    // ردیف
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.columns.row' })}</span>,
      dataIndex: 'key',
      key: 'key',
      width: 50,
      render: (_: any, record: any, index: number) => <span style={{ textAlign: 'center' }}>{index + 1}</span>,
    },
    // مشتری
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.columns.customer' })}</span>,
      dataIndex: 'CustomerTitle',
      key: 'CustomerTitle',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // نام ایونت
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.columns.eventName' })}</span>,
      dataIndex: 'Event',
      key: 'Event',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // تاریخ
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.columns.date' })}</span>,
      dataIndex: 'Date',
      key: 'Date',
      width: 300,
      render: (text: string) => (
        <span style={{ textAlign: 'center' }}>{moment(text, 'YYYY-MM-DDTHH:mm:ss').format('jYYYY/jMM/jDD')}</span>
      ),
    },
    // تعداد کل
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.columns.totalQty' })}</span>,
      dataIndex: 'QuantityTotal',
      key: 'QuantityTotal',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // هزینه واحد کل
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.columns.unitCostTotal' })}</span>,
      dataIndex: 'UnitCostTotal',
      key: 'UnitCostTotal',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // قیمت نهایی
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.columns.finalPrice' })}</span>,
      dataIndex: 'PriceSaleFinalTotal',
      key: 'PriceSaleFinalTotal',
      width: 600,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // حاشیه سود نهایی
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.columns.profitMarginTotal' })}</span>,
      dataIndex: 'ProfitMarginFinal',
      key: 'ProfitMarginFinal',
      width: 600,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // تایید وضعیت
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.columns.proformaStatus' })}</span>,
      dataIndex: 'StatusTitle',
      key: 'StatusTitle',
      width: 200,
      render: (text: any, record: any) => (
        <span className="center-align">
          {text === 'تایید شده' ? (
            text
          ) : (
            <FontAwesomeIcon
              icon={faCheck}
              onClick={() =>
                confirmProforma(record.ID, setProformaStatus).then(() => {
                  refreshList();
                })
              }
              className="status-icon"
              style={{ cursor: 'pointer', marginRight: 8 }}
            />
          )}
        </span>
      ),
    },
    // چاپ انگلیسی
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.columns.printEng' })}</span>,
      dataIndex: 'eng-print',
      key: 'eng-print',
      width: 200,
      render: (_: any, record: any) => {
        return (
          <span className="center-align">
            <FontAwesomeIcon
              icon={faPrint}
              onClick={() => getEngReport(record.ID)}
              className="print-icon"
              style={{ cursor: 'pointer', marginRight: 8 }}
            />
          </span>
        );
      },
    },
    // چاپ فارسی
    {
      title: <span className="center-align">{formatMessage({ id: 'app.home.columns.printPer' })}</span>,
      dataIndex: 'per-print',
      key: 'per-print',
      width: 200,
      render: (_: any, record: any) => {
        return (
          <span className="center-align">
            <FontAwesomeIcon
              icon={faPrint}
              onClick={() => getPerReport(record.ID)}
              className="print-icon"
              style={{ cursor: 'pointer', marginRight: 8 }}
            />
          </span>
        );
      },
    },
    // ویرایش
    {
      title: <span className="center-align">{formatMessage({ id: 'app.personComapnyInfo.List.edit' })}</span>,
      dataIndex: 'edit',
      key: 'edit',
      width: 200,
      render: (_: any, record: any) => {
        if (proformaStatus || record.StatusTitle === 'تایید شده') {
          return <p>-</p>;
        }

        return (
          <span className="center-align">
            <FontAwesomeIcon
              icon={faPenToSquare}
              onClick={() => (
                handleEdit(record),
                getSingleProformaInfo(record.ID, setSingleProformaInfo, setHeaderData),
                setSelectedProformaInfo({ id: record.ID, code: record.Code })
              )}
              style={{ cursor: 'pointer', marginRight: 8 }}
              className="edit-icon"
            />
          </span>
        );
      },
    },
    // کپی
    {
      title: <span className="center-align">{formatMessage({ id: 'gloabal.columns.copy' })}</span>,
      dataIndex: 'copy',
      key: 'copy',
      render: (_: any, record: any) => (
        <span className="center-align">
          <FontAwesomeIcon
            icon={faCopy}
            onClick={() => (
              handleCopy(record),
              getSingleProformaInfo(record.ID, setSingleProformaInfo, setHeaderData),
              setSelectedProformaInfo({ id: record.ID, code: record.Code })
            )}
            style={{ cursor: 'pointer', marginRight: 8 }}
            className="copy-icon"
          />
        </span>
      ),
    },
    // حذف
    {
      title: <span className="center-align">{formatMessage({ id: 'app.personComapnyInfo.List.delete' })}</span>,
      dataIndex: 'delete',
      key: 'delete',
      render: (_: any, record: any) => {
        return (
          <span className="center-align">
            <FontAwesomeIcon
              icon={faTrashCan}
              onClick={() => {
                deleteRow(record);
              }}
              style={{ cursor: 'pointer', marginRight: 8 }}
              className="delete-icon"
            />
          </span>
        );
      },
    },
  ];
}
