import React, { useState } from 'react';

import { SearchContext } from './SearchContext';

function SearchContextProvider({ children }: { children: React.ReactNode }) {
  const [searchInput, setSearchInput] = useState('');

  return <SearchContext.Provider value={{ searchInput, setSearchInput }}>{children}</SearchContext.Provider>;
}

export default SearchContextProvider;
