import { SearchOutlined } from '@ant-design/icons';
import { faCopy, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useLocale } from '@/locales';

import { getExistenceList } from './util';

export function ListOfGroupsColumns({
  deleteRow,
  handleEdit,
  copyRow,
}: {
  deleteRow: (key: string) => void;
  handleEdit: any;
  copyRow: any;
}) {
  const { formatMessage } = useLocale();
  const [existanceList, setExistanceList] = useState<any>([]);
  const { locale } = useSelector(state => state.user);

  useEffect(() => {
    getExistenceList(setExistanceList, locale);
  }, []);

  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`${formatMessage({ id: 'gloabal.listcolumns.search' })}`}
          value={selectedKeys[0]}
          onChange={e => {
            const value = e.target.value;

            setSelectedKeys(value ? [value] : []);
            confirm({ closeDropdown: false });
          }}
          // allowClear
          style={{ width: 180, display: 'block' }}
        />
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value: string, record: any) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : false,
  });

  return [
    // ردیف
    {
      title: <span className="center-align">{formatMessage({ id: 'app.grouping.List.row' })}</span>,
      dataIndex: 'key',
      key: 'key',
      width: 50,
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // کد
    {
      title: <span className="center-align">{formatMessage({ id: 'app.grouping.List.code' })}</span>,
      dataIndex: 'Code',
      key: 'Code',
      width: 300,
      ...getColumnSearchProps('Code'),
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // عنوان
    {
      title: <span className="center-align">{formatMessage({ id: 'app.grouping.List.titlePer' })}</span>,
      dataIndex: 'TitlePersian',
      key: 'TitlePersian',
      width: 300,
      ...getColumnSearchProps('TitlePersian'),
      render: (text: string) => <span style={{ textAlign: 'center' }}>{text}</span>,
    },
    // موجودیت
    {
      title: <span className="center-align">{formatMessage({ id: 'app.grouping.List.exisatnce' })}</span>,
      dataIndex: 'ExistenceCode',
      key: 'ExistenceCode',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }: any) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={`${formatMessage({ id: 'gloabal.listcolumns.search' })}`}
            value={selectedKeys[0]}
            onChange={e => {
              const value = e.target.value;

              setSelectedKeys(value ? [value] : []);
              confirm({ closeDropdown: false });
            }}
            style={{ width: 180, display: 'block' }}
          />
        </div>
      ),
      filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value: string, record: any) => {
        const label = existanceList.find((item: any) => item.value === Number(record.ExistenceCode))?.label || '';

        return label.toLowerCase().includes((value as string).toLowerCase());
      },
      width: 300,
      render: (text: string) => (
        <span style={{ textAlign: 'center' }}>
          {existanceList.find((item: any) => item.value === Number(text)).label}
        </span>
      ),
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
            onClick={() => copyRow(record)}
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
        // const isDisabled = record.key === tableData[0].key && !isRowFilled(record);

        return (
          <span className="center-align">
            <FontAwesomeIcon
              icon={faTrashCan}
              onClick={() => deleteRow(record)}
              style={{ cursor: 'pointer', marginRight: 8 }}
              className="delete-icon"
            />
          </span>
        );
      },
    },
  ];
}
