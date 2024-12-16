import React from 'react';
import { Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './Login';
import { Toaster } from 'react-hot-toast';

const appStyles = {
   backgroundImage: 'url(/images/background.png)', // Replace with your image path 
   backgroundSize: 'cover',
   backgroundRepeat: 'no-repeat',
   backgroundPosition: 'center',
   height: '100vh',
   margin: 0,
   padding: 0,
};

function App() {
   const { isLoggedIn } = useAuth();

   return (
      <div className="App" style={appStyles}>
         {!isLoggedIn ? <Login /> : <Outlet />}
      </div>
   );
}

export default function AppWrapper({ children }) {
   return (
      <div style={appStyles}>
      <AuthProvider>
         <Toaster position='top-right' />
         {children}
      </AuthProvider>
      </div>
   );
}
