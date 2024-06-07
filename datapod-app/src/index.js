// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';

import './styles/tailwind.css'; // Import Tailwind CSS
import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <React.Fragment>
      <App />
    </React.Fragment>
    
  </React.StrictMode>,
  document.getElementById('root')
);
