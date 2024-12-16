import React from 'react';
import { Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './Login';
import { Toaster } from 'react-hot-toast';

function App() {
   const { isLoggedIn } = useAuth();

   return (
      <div className="App">
         {!isLoggedIn ? <Login /> : <Outlet />}
      </div>
   );
}

export default function AppWrapper({children}) {
   return (
       <AuthProvider>
         <Toaster position='top-right'/>
           {children}
       </AuthProvider>
   );
}
