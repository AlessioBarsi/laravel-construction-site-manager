import React from 'react';
import { Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
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
