import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL = 'https://fitnesstrac-kr.herokuapp.com/api';

export const getHeaders = () => {
  const token = localStorage.getItem('token')
  if(token) {
    return {'Authorization':`Bearer ` + token};
  } else {
    return undefined
  }
}



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


