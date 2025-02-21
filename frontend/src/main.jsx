import axios from 'axios';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppWrapper from './App.jsx';
import App from './App.jsx';
import Header from './Header.jsx';
import Login from './Login.jsx';
import User from './User.jsx';
import Site from './Site.jsx';
import Sites from './Sites.jsx';
import Users from './Users.jsx';
import Home from './Home.jsx';
import Profile from './Profile.jsx';
import Reports from './Reports.jsx';
import Report from './Report.jsx';
import Register from './Register.jsx';
import './index.css';
import { PrivateRoute } from './PrivateRoute.jsx';

// Set axios to a window property for easy access
window.axios = axios;
// Default headers for API calls
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// Base URL for your API calls
window.axios.defaults.baseURL = import.meta.env.VITE_API_URL;

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
      }
      return Promise.reject(error);
   }
);

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <BrowserRouter>
         <AppWrapper>
            <Routes>
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register/>}/>

                  <Route element={<PrivateRoute/>}>
                  <Route path="/" element={<Header />}>
                     <Route index element={<App />} />
                     <Route path="/home" element={<Home />} />
                     <Route path="/profile" element={<Profile/>}/>
                     <Route path="/reports" element={<Reports />}/>
                     <Route path="/reports/:id" element={<Report />}/>
                     <Route path="/users" element={<Users />} />
                     <Route path="/users/:id" element={<User />} />
                     <Route path="/sites" element={<Sites />} />
                     <Route path="/sites/:id" element={<Site />} />
                  </Route>
               </Route>
            </Routes>
         </AppWrapper>
      </BrowserRouter>
   </StrictMode>,
)
