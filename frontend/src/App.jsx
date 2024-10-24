import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import './App.css';
import Login from './Login';


function App() {
   const { isLoggedIn } = useAuth();

   return (
      <div className="App">
         {!isLoggedIn ? <Login /> : <Outlet />}
      </div>
   );
}

export default function AppWrapper() {
   return (
       <AuthProvider>
           <App />
       </AuthProvider>
   );
}
