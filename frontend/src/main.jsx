import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter , Routes, Route } from 'react-router-dom';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Login from './Login.jsx';
import User from './User.jsx';

// Set axios to a window property for easy access
window.axios = axios;
// Default headers for API calls
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// Base URL for your API calls
window.axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';

// If a token exists in local storage, set it in axios authorization header
const token = localStorage.getItem('token');
if (token) {
   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Intercept responses. If 401 error, clear token and redirect to login
axios.interceptors.response.use(
  response => response,
  error => {
     if (error.response?.status === 401) {
        localStorage.removeItem('token');
        axios.defaults.headers.common['Authorization'] = 'Bearer';
        // Redirect to login route
        return <Redirect to="/login" />;
     }
     return Promise.reject(error);
  }
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
         <Routes>
            <Route path="/" element={<App />}>
               <Route path="/login" element={<Login />} />
               <Route path="/user" element={<User />} />
            </Route>
         </Routes>
   </BrowserRouter>
  </StrictMode>,
)
