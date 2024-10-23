import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './Login';


function App() {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const navigate = useNavigate();

   useEffect(()=> {
      const token = localStorage.getItem('token');
      if (token) {
         setIsLoggedIn(true);
      } else {
         setIsLoggedIn(false);
      }
   }, []);

   return (
      <div className="App">
         {!isLoggedIn ? <Login /> : <Outlet />}
      </div>
   );
}
export default App;