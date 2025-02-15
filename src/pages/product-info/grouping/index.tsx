import type { TreeSelectProps } from 'antd';

import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, TreeSelect } from 'antd';
import React, { useState } from 'react';

import { useLocale } from '@/locales';


const treeData = [
  {
    value: 'parent 1',
    title: 'parent 1',
    children: [
      {
        value: 'parent 1-0',
        title: 'parent 1-0',
        children: [
          {
            value: 'leaf1',
            title: 'leaf1',
          },
          {
            value: 'leaf2',
            title: 'leaf2',
          },
          {
            value: 'leaf3',
            title: 'leaf3',
          },
          {
            value: 'leaf4',
            title: 'leaf4',
          },
          {
            value: 'leaf5',
            title: 'leaf5',
          },
          {
            value: 'leaf6',
            title: 'leaf6',
          },
        ],
      },
      {
        value: 'parent 1-1',
        title: 'parent 1-1',
        children: [
          {
            value: 'leaf11',
            title: <b style={{ color: '#08c' }}>leaf11</b>,
          },
        ],
      },
    ],
  },
];
const dataSource = [
  {
    key: '1',
    index: '1',
    group: 'گروه یک',
    product: 'کالا 1',
    delete: <FontAwesomeIcon icon={faTrashCan} />,
  },
  {
    key: '2',
    index: '2',
    group: 'گروه دو',
    product: 'کالا 2',
    delete: <FontAwesomeIcon icon={faTrashCan} />,
  },
  {
    key: '3',
    index: '3',
    group: 'گروه سه',
    product: 'کالا 3',
    delete: <FontAwesomeIcon icon={faTrashCan} />,
  },
];

function Grouping() {
  const { formatMessage } = useLocale();

  const columns = [
    {
      title: `${formatMessage({ id: 'app.productInfo.grouping.columns.row' })}`,
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: `${formatMessage({ id: 'app.productInfo.grouping.columns.group' })}`,
      dataIndex: 'group',
      key: 'group',
    },
    {
      title: `${formatMessage({ id: 'app.productInfo.grouping.columns.product' })}`,
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: `${formatMessage({ id: 'app.productInfo.grouping.columns.delete' })}`,
      dataIndex: 'delete',
      key: 'delete',
      render: (text: any, record: any) => (
        <span onClick={() => handleDelete(record.index)} style={{ cursor: 'pointer' }}>
          {text}
        </span>
      ),
    },
  ];
  const [value, setValue] = useState<string>();
  const [tableData, setTableData] = useState(dataSource);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    // console.log("new value", newValue);
  };

  const handleDelete = (index: string | number) => {
    setTableData(prevData => prevData.filter(item => item.index !== index));
  };

  const onPopupScroll: TreeSelectProps['onPopupScroll'] = e => {
    console.log('onPopupScroll', e);
  };

  return (
    <div className="grouping-container">
      <div className="select-container">
        <TreeSelect
          showSearch
          treeNodeFilterProp="title"
          treeData={treeData}
          style={{ width: '100%' }}
          onPopupScroll={onPopupScroll}
          onChange={handleChange}
          value={value}
          treeDefaultExpandAll
          placeholder={`${formatMessage({ id: 'app.productInfo.grouping.tree.placeholder' })}`}
          allowClear
        />
      </div>
      <div className="table-container">{value ? <Table dataSource={tableData} columns={columns} /> : ''}</div>
    </div>
  );
}

export default Grouping;
