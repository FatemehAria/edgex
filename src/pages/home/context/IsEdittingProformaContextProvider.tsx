import React, { useState } from 'react';

import { IsEdittingProformaContext } from './IsEdittingProformaContext';

function IsEdittingProformaContextProvider({ children }: { children: React.ReactNode }) {
  const [isEdittingProforma, setIsEdittingProforma] = useState(false);
  const [isCopyingProforma, setIsCopyingProforma] = useState(false);
  const [singleProformaInfo, setSingleProformaInfo] = useState([]);
  const [headerData, setHeaderData] = useState({});
  const [proformaStatus, setProformaStatus] = useState(false);
  const [selectedProformaInfo, setSelectedProformaInfo] = useState({ id: '', code: '' });

  return (
    <IsEdittingProformaContext.Provider
      value={{
        isEdittingProforma,
        isCopyingProforma,
        singleProformaInfo,
        headerData,
        proformaStatus,
        selectedProformaInfo,
        setSelectedProformaInfo,
        setProformaStatus,
        setHeaderData,
        setIsEdittingProforma,
        setIsCopyingProforma,
        setSingleProformaInfo,
      }}
    >
      {children}
    </IsEdittingProformaContext.Provider>
  );
}

export default IsEdittingProformaContextProvider;
