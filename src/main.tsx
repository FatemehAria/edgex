import './mock';
import './styles/index.less';

import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';

import App from './App';
import AppWithIntl from './components/custom/IntlProviderApp';
import store from './stores';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <AppWithIntl>
      <App />
      <Toaster
        position="top-left"
        toastOptions={{
          style: {
            direction: 'rtl',
            fontWeight: '700',
          },
        }}
      />
    </AppWithIntl>
  </Provider>,
);
