import 'dayjs/locale/zh-cn';

import { ConfigProvider, Spin, theme as antdTheme } from 'antd';
import enUS from 'antd/es/locale/en_US';
import faIR from 'antd/es/locale/fa_IR';
import { JalaliLocaleListener } from 'antd-jalali';
import dayjs from 'dayjs';
import { Suspense, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { history, HistoryRouter } from '@/routes/history';

import ProvinceContextProvider from './context/ProvinceContextProvider';
import { localeConfig, LocaleFormatter } from './locales';
import SearchContextProvider from './pages/home/context/SearchContextProvider';
import RenderRouter from './routes';
import { setGlobalState } from './stores/global.store';
import IsEdittingProformaContextProvider from './pages/home/context/IsEdittingProformaContextProvider';

const App: React.FC = () => {
  const { locale } = useSelector(state => state.user);
  const { theme, loading } = useSelector(state => state.global);

  const dispatch = useDispatch();

  const setTheme = (dark = true) => {
    dispatch(
      setGlobalState({
        theme: dark ? 'dark' : 'light',
      }),
    );
  };

  /** initial theme */
  useEffect(() => {
    setTheme(theme === 'dark');

    // watch system theme change
    if (!localStorage.getItem('theme')) {
      const mql = window.matchMedia('(prefers-color-scheme: dark)');

      function matchMode(e: MediaQueryListEvent) {
        setTheme(e.matches);
      }

      mql.addEventListener('change', matchMode);
    }
  }, []);

  // set the locale for the user
  // more languages options can be added here
  useEffect(() => {
    if (locale === 'en_US') {
      dayjs.locale('en');
    } else if (locale === 'fa_IR') {
      dayjs.locale('fa-IR');
    }
  }, [locale]);

  /**
   * handler function that passes locale
   * information to ConfigProvider for
   * setting language across text components
   */
  const getAntdLocale = () => {
    if (locale === 'en_US') {
      return enUS;
    } else if (locale === 'fa_IR') {
      return faIR;
    }
  };

  return (
    <div>
      <ConfigProvider
        locale={getAntdLocale()}
        componentSize="middle"
        // #13c2c2
        theme={{
          token: { colorPrimary: '#0e8b8b	', fontFamily: `${locale === 'fa_IR' ? 'IranYekan' : 'Montserrat'}` },
          algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
          components: {
            Input: {
              colorBorder: `${theme === 'dark' ? '#0e8b8b	' : '#d9d9d9'}`,
              colorTextPlaceholder: `${theme === 'dark' ? '#0e8b8b	' : '#d9d9d9'}`,
            },
            Select: {
              colorBorder: `${theme === 'dark' ? '#0e8b8b	' : '#d9d9d9'}`,
              colorTextPlaceholder: `${theme === 'dark' ? '#0e8b8b	' : '#d9d9d9'}`,
            },
            DatePicker: {
              colorBorder: `${theme === 'dark' ? '#0e8b8b	' : '#d9d9d9'}`,
              colorTextPlaceholder: `${theme === 'dark' ? '#0e8b8b	' : '#d9d9d9'}`,
            },
            Radio: {
              colorBorder: `${theme === 'dark' ? '#0e8b8b	' : '#d9d9d9'}`,
              colorTextPlaceholder: `${theme === 'dark' ? '#0e8b8b	' : '#d9d9d9'}`,
            },
            Checkbox: {
              colorBorder: `${theme === 'dark' ? '#0e8b8b	' : '#d9d9d9'}`,
              colorTextPlaceholder: `${theme === 'dark' ? '#0e8b8b	' : '#d9d9d9'}`,
            },
            InputNumber: {
              colorBorder: `${theme === 'dark' ? '#0e8b8b	' : '#d9d9d9'}`,
              colorTextPlaceholder: `${theme === 'dark' ? '#0e8b8b	' : '#d9d9d9'}`,
            },
            Card: {
              colorBorder: `${theme === 'dark' ? '#0e8b8b	' : '#E5E4E2'}`,
            },
          },
        }}
        direction={locale === 'fa_IR' ? 'rtl' : 'ltr'}
      >
        {locale === 'fa_IR' && <JalaliLocaleListener />}
        <IntlProvider locale={locale.split('_')[0]} messages={localeConfig[locale]}>
          <HistoryRouter history={history}>
            <SearchContextProvider>
              <ProvinceContextProvider>
                <IsEdittingProformaContextProvider>
                  <Suspense fallback={null}>
                    {/* <Spin
                    spinning={loading}
                    className="app-loading-wrapper"
                    style={{
                      backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                    }}
                    tip={<LocaleFormatter id="gloabal.tips.loading" />}
                  > */}
                    <RenderRouter />
                    {/* </Spin> */}
                  </Suspense>
                </IsEdittingProformaContextProvider>
              </ProvinceContextProvider>
            </SearchContextProvider>
          </HistoryRouter>
        </IntlProvider>
      </ConfigProvider>
      {/* <CopyRight /> */}
    </div>
  );
};

export default App;
