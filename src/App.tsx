import 'dayjs/locale/zh-cn';

import { ConfigProvider, Spin, theme as antdTheme } from 'antd';
import enUS from 'antd/es/locale/en_US';
import faIR from 'antd/es/locale/fa_IR';
import axios from 'axios';
import dayjs from 'dayjs';
import { Suspense, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { history, HistoryRouter } from '@/routes/history';

import CopyRight from './components/basic/copy-right';
import { localeConfig, LocaleFormatter } from './locales';
import SearchContextProvider from './pages/home/context/SearchContextProvider';
import RenderRouter from './routes';
import { setGlobalState } from './stores/global.store';

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

  const getMedia = async () => {
    try {
      const { data } = await axios.get('/media/uploadedMedia');

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  return (
    <div>
      <ConfigProvider
        locale={getAntdLocale()}
        componentSize="middle"
        theme={{
          token: { colorPrimary: '#13c2c2' },
          algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
          components: {
            Input: {
              colorBorder: `${theme === 'dark' ? '#13c2c2' : '#d9d9d9'}`,
              colorTextPlaceholder: `${theme === 'dark' ? '#13c2c2' : '#d9d9d9'}`,
            },
            Card: {
              colorBorder: `${theme === 'dark' ? '#13c2c2' : '#E5E4E2'}`,
            },
          },
        }}
        direction={locale === 'fa_IR' ? 'rtl' : 'ltr'}
      >
        <IntlProvider locale={locale.split('_')[0]} messages={localeConfig[locale]}>
          <HistoryRouter history={history}>
            <SearchContextProvider>
              <Suspense fallback={null}>
                <Spin
                  spinning={loading}
                  className="app-loading-wrapper"
                  style={{
                    backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                  }}
                  tip={<LocaleFormatter id="gloabal.tips.loading" />}
                ></Spin>
                <RenderRouter />
              </Suspense>
            </SearchContextProvider>
          </HistoryRouter>
        </IntlProvider>
      </ConfigProvider>
      <CopyRight />
    </div>
  );
};

export default App;
