import React, { useState } from 'react';

import { IsEdittingProformaContext } from './IsEdittingProformaContext';

function IsEdittingProformaContextProvider({ children }: { children: React.ReactNode }) {
  const [isEdittingProforma, setIsEdittingProforma] = useState(false);
  const [isCopyingProforma, setIsCopyingProforma] = useState(false);

  return (
    <IsEdittingProformaContext.Provider
      value={{ isEdittingProforma, setIsEdittingProforma, setIsCopyingProforma, isCopyingProforma }}
    >
      {children}
    </IsEdittingProformaContext.Provider>
  );
}

export default IsEdittingProformaContextProvider;
