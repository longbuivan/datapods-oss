// src/index.js
import React from 'react';
// import ReactDOM from 'react-dom';
import ReactDOM from "react-dom/client";


import './styles/tailwind.css';
import App from './components/App';
import reportWebVitals from "./reportWebVitals";

// ReactDOM.render(
//   <React.StrictMode>
//     <React.Fragment>
//       <App />
//     </React.Fragment>

//   </React.StrictMode>,
//   document.getElementById('root')
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();