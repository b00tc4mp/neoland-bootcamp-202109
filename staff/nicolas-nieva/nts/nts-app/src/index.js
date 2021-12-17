import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './components/App.jsx';
import reportWebVitals from './reportWebVitals';
import { context } from './logic'

context.API_URL = process.env.REACT_APP_API_URL


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
