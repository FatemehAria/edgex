// AppWithIntl.tsx
import React from 'react';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';

import { localeConfig } from '@/locales';

const AppWithIntl = ({ children }: { children: React.ReactNode }) => {
  // Use useSelector inside a functional component, not at the top level.
  const { locale } = useSelector((state: any) => state.user);

  return (
    <IntlProvider locale={locale.split('_')[0]} messages={localeConfig[locale as keyof typeof localeConfig]}>
      {children}
    </IntlProvider>
  );
};

export default AppWithIntl;
