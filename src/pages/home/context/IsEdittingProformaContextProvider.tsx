import React, { useState } from 'react';

import { IsEdittingProformaContext } from './IsEdittingProformaContext';

function IsEdittingProformaContextProvider({ children }: { children: React.ReactNode }) {
  const [isEdittingProforma, setIsEdittingProforma] = useState(false);
  const [isCopyingProforma, setIsCopyingProforma] = useState(false);
  const [singleProformaInfo, setSingleProformaInfo] = useState([]);
  const [headerData, setHeaderData] = useState({});
  const [proformaStatus, setProformaStatus] = useState(false);
  const [selectedProformaInfo, setSelectedProformaInfo] = useState({ id: '', code: '', key: '' });
  const [isCopyingProformaTableRow, setIsCopyingProformaTableRow] = useState(false);
  const [isLoadingProformaInfo, setIsLoadingProformaInfo] = useState(false);

  return (
    <IsEdittingProformaContext.Provider
      value={{
        isEdittingProforma,
        isCopyingProforma,
        singleProformaInfo,
        headerData,
        proformaStatus,
        selectedProformaInfo,
        isCopyingProformaTableRow,
        isLoadingProformaInfo,
        setSelectedProformaInfo,
        setProformaStatus,
        setHeaderData,
        setIsEdittingProforma,
        setIsCopyingProforma,
        setIsCopyingProformaTableRow,
        setSingleProformaInfo,
        setIsLoadingProformaInfo,
      }}
    >
      {children}
    </IsEdittingProformaContext.Provider>
  );
}

export default IsEdittingProformaContextProvider;
