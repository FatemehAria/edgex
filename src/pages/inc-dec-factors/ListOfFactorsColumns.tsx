import { faCopy, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useLocale } from '@/locales';

function ListOfFactorsColumns({
  deleteRow,
  handleEdit,
  copyRow,
}: {
  deleteRow: (key: string) => void;
  handleEdit: any;
  copyRow: any;
}) {
  const { formatMessage } = useLocale();

  return [
    // ردیف
    {
      title: <span className="center-align">{formatMessage({ id: 'app.incDecFactors.List.row' })}</span>,
      dataIndex: 'key',
      key: 'key',
      width: 50,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // کد
    {
      title: <span className="center-align">{formatMessage({ id: 'app.incDecFactors.List.code' })}</span>,
      dataIndex: 'Code',
      key: 'Code',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // عنوان
    {
      title: <span className="center-align">{formatMessage({ id: 'app.incDecFactors.List.title' })}</span>,
      dataIndex: 'Title',
      key: 'Title',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // تاثیر
    {
      title: <span className="center-align">{formatMessage({ id: 'app.incDecFactors.List.influence' })}</span>,
      dataIndex: 'influcence',
      key: 'influcence',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // نمایش در سند
    {
      title: <span className="center-align">{formatMessage({ id: 'app.incDecFactors.List.document' })}</span>,
      dataIndex: 'displayDocument',
      key: 'displayDocument',
      width: 600,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text ? 'بله' : 'خیر'}</span>,
    },
    // نمایش در قلم
    {
      title: <span className="center-align">{formatMessage({ id: 'app.incDecFactors.List.pen' })}</span>,
      dataIndex: 'displayPen',
      key: 'displayPen',
      width: 250,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text ? 'بله' : 'خیر'}</span>,
    },
    // ویرایش
    {
      title: <span className="center-align">{formatMessage({ id: 'app.personComapnyInfo.List.edit' })}</span>,
      dataIndex: 'edit',
      key: 'edit',
      width: 200,
      render: (_: any, record: any) => {
        // const isDisabled = record.key === tableData[0].key && !isRowFilled(record);

        return (
          <span className="center-align">
            <FontAwesomeIcon
              icon={faPenToSquare}
              onClick={() => handleEdit(record)}
              // style={{
              //   cursor: isDisabled ? 'not-allowed' : 'pointer',
              //   marginRight: 8,
              //   opacity: isDisabled ? 0.4 : 1,
              // }}
            />
          </span>
        );
      },
    },
    // کپی
    {
      title: <span className="center-align">{formatMessage({ id: 'gloabal.columns.copy' })}</span>, // Adjust translation if needed
      dataIndex: 'copy',
      key: 'copy',
      render: (_: any, record: any) => (
        <span className="center-align">
          <FontAwesomeIcon
            icon={faCopy}
            onClick={() => copyRow(record)} // Call copy function
            style={{ cursor: 'pointer', marginRight: 8 }}
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
        // const isDisabled = record.key === tableData[0].key && !isRowFilled(record);

        return (
          <span className="center-align">
            <FontAwesomeIcon
              icon={faTrashCan}
              onClick={() => {
                deleteRow(record);
              }}
              // style={{
              //   cursor: isDisabled ? 'not-allowed' : 'pointer',
              //   marginRight: 8,
              //   opacity: isDisabled ? 0.4 : 1,
              // }}
            />
          </span>
        );
      },
    },
  ];
}

export default ListOfFactorsColumns;
