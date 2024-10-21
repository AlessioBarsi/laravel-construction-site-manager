import { createContext, useState, useContext, useEffect } from 'react';
import './App.css';
import MainContent from './MainContent';
import LoginForm from './LoginForm';

export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState('Username');
  const [login, isLoggedIn] = useState(false)

  useEffect(() => {
    setUser('Name');
  }, []); 

  return (
    <div>
      Homepage
      <UserContext.Provider value={user}>

        {
          login ? 
          <div>
            <MainContent />
            User is logged in</div> : 
          <div>Please login
            <LoginForm></LoginForm>
          </div>
        }
      </UserContext.Provider>

    </div>
  );
}

export default App;
