import React, { useState } from 'react';

import { IsEdittingProformaContext } from './IsEdittingProformaContext';

function IsEdittingProformaContextProvider({ children }: { children: React.ReactNode }) {
  const [isEdittingProforma, setIsEdittingProforma] = useState(false);
  const [isCopyingProforma, setIsCopyingProforma] = useState(false);
  const [singleProformaInfo, setSingleProformaInfo] = useState([]);
  const [headerData, setHeaderData] = useState({});

  return (
    <IsEdittingProformaContext.Provider
      value={{
        isEdittingProforma,
        isCopyingProforma,
        singleProformaInfo,
        headerData,
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
