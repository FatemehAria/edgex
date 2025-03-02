import './mock';
import './styles/index.less';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import store from './stores';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);