import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { App } from 'components/App';
import GlobalCss from 'global.css';
import { BrowserRouter } from 'react-router-dom';

// import css from './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
      <GlobalCss />
      <ToastContainer autoClose={2500} />
    </BrowserRouter>
  </>
);
