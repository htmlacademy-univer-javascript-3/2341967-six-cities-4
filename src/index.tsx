import { Provider } from 'react-redux';
import { store } from './store';
import { getOffersAction, checkAuthAction, getFavoriteOffersAction } from './store/api-action';
import { ToastContainer } from 'react-toastify';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/app/app';

store.dispatch(getOffersAction());
store.dispatch(getFavoriteOffersAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store ={store}>
      <ToastContainer />
      <App/>
    </Provider>
  </React.StrictMode>,
);
