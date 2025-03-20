import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useLocale } from '@/locales';

function ListOfProductsColumns({ deleteRow, handleEdit }: { deleteRow: (key: string) => void; handleEdit: any }) {
  const { formatMessage } = useLocale();

  return [
    // ردیف
    {
      title: <span className="center-align">{formatMessage({ id: 'app.productInfo.List.row' })}</span>,
      dataIndex: 'key',
      key: 'key',
      width: 50,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // عنوان
    {
      title: <span className="center-align">{formatMessage({ id: 'app.productInfo.List.titleEng' })}</span>,
      dataIndex: 'Title',
      key: 'Title',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // عنوان فارسی
    {
      title: <span className="center-align">{formatMessage({ id: 'app.productInfo.List.titlePer' })}</span>,
      dataIndex: 'TitlePersian',
      key: 'TitlePersian',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // نرخ
    {
      title: <span className="center-align">{formatMessage({ id: 'app.productInfo.List.rate' })}</span>,
      dataIndex: 'rate',
      key: 'rate',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // توضیحات
    {
      title: <span className="center-align">{formatMessage({ id: 'app.productInfo.List.desc' })}</span>,
      dataIndex: 'Description',
      key: 'Description',
      width: 300,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
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

export default ListOfProductsColumns;
