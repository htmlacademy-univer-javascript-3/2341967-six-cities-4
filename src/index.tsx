import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { getOffersAction, checkAuthAction } from './store/api-action';
import ErrorMessage from './Components/error-message/error-message';
import { ToastContainer } from 'react-toastify';

store.dispatch(getOffersAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store ={store}>
      <ErrorMessage />
      <ToastContainer />
      <App/>
    </Provider>
  </React.StrictMode>,
);
