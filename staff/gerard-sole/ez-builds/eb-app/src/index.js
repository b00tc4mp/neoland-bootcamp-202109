import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { context } from './logic';
import { BrowserRouter as Router } from 'react-router-dom'

context.API_URL = process.env.REACT_APP_API_URL

ReactDOM.render(
<React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();