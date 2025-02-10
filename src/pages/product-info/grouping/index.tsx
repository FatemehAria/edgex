import type { TreeSelectProps } from 'antd';

import { TreeSelect } from 'antd';
import React, { useState } from 'react';

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

function Grouping() {
  const [value, setValue] = useState<string>();

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const onPopupScroll: TreeSelectProps['onPopupScroll'] = e => {
    console.log('onPopupScroll', e);
  };

  return (
    <div className="grouping-container">
      <TreeSelect
        showSearch
        treeNodeFilterProp="title"
        treeData={treeData}
        style={{ width: '100%' }}
        onPopupScroll={onPopupScroll}
        onChange={handleChange}
        value={value}
        treeDefaultExpandAll
        placeholder="جستجو"
        allowClear
      />
      <div>2</div>
    </div>
  );
}

export default Grouping;
