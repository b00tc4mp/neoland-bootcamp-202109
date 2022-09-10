import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { context } from './logic'
import { BrowserRouter } from "react-router-dom";

context.API_URL = process.env.REACT_APP_API_URL

ReactDOM.render(
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode> 
  </BrowserRouter>,
  document.getElementById('root')
);
