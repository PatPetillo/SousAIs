import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import './index.scss';
// import './style.scss';
// import './content.scss';
import store from './store';
import Routes from './routes';

// establishes socket connection
import './socket';

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app'),
);
