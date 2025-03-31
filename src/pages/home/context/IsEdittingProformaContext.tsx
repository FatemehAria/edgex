import type { Dispatch, SetStateAction } from 'react';

import { createContext } from 'react';

type EditProformaContextType = {
  isEdittingProforma: boolean;
  isCopyingProforma: boolean;
  setIsEdittingProforma: Dispatch<SetStateAction<boolean>>;
  setIsCopyingProforma: Dispatch<SetStateAction<boolean>>;
};

export const IsEdittingProformaContext = createContext<EditProformaContextType>({
  isEdittingProforma: false,
  isCopyingProforma: false,
  setIsEdittingProforma: () => {},
  setIsCopyingProforma: () => {},
});
