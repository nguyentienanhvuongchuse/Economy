import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { GlobalState } from './state/provider'
import reducer, { initialstate } from './state/reducer';

ReactDOM.render(
  <GlobalState initialstate={initialstate} reducer={reducer}>
    <App />
  </GlobalState>,
  document.getElementById('root')
);
