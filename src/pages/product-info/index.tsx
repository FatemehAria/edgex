import React, { useState } from 'react';
import MainInfo from './main-info';
import Specifications from './specifications';
import Grouping from './grouping';

function ProductInfo() {
  const [tab, setTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        <p onClick={() => setTab(0)}>اطلاعات اصلی</p>
        <p onClick={() => setTab(1)}>ویژگی ها</p>
        <p onClick={() => setTab(2)}>گروه بندی</p>
      </div>

      {tab === 0 ? <MainInfo /> : tab === 1 ? <Specifications /> : <Grouping />}
    </div>
  );
}

export default ProductInfo;
