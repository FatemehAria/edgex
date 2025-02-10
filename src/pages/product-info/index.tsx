import '@/styles/product-info.css';

import React, { useState } from 'react';

import Grouping from './grouping';
import MainInfo from './main-info';
import Specifications from './specifications';

function ProductInfo() {
  const [tab, setTab] = useState(0);

  return (
    <div className="pro-info-container">
      <div className="tabs">
        <p onClick={() => setTab(0)} className={`single-tab ${tab === 0 ? 'active-tab' : ''}`}>
          اطلاعات اصلی
        </p>
        <p onClick={() => setTab(1)} className={`single-tab ${tab === 1 ? 'active-tab' : ''}`}>
          ویژگی ها
        </p>
        <p onClick={() => setTab(2)} className={`single-tab ${tab === 2 ? 'active-tab' : ''}`}>
          گروه بندی
        </p>
      </div>

      {tab === 0 ? <MainInfo /> : tab === 1 ? <Specifications /> : <Grouping />}
    </div>
  );
}

export default ProductInfo;
