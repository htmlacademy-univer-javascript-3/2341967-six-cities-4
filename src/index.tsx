import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { reviews } from './mocks/reviews';
import { getOffersAction } from './store/api-action';
import ErrorMessage from './Components/error-message/error-message';

store.dispatch(getOffersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store ={store}>
      <ErrorMessage />
      <App
        reviews = {reviews}
      />
    </Provider>
  </React.StrictMode>,
);
