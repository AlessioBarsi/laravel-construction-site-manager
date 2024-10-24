import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthContext";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('/login', { email, password })
        .then(response => {
            login(response.data.token);
            navigate('/dashboard');
        })
        .catch(error => {
            if (error.response && error.response.status === 422) {
                setErrorMessage(error.response.data.message);
            }
            setPassword('');
        });
    }
    
    return (
        <div>
           {errorMessage && <div>{errorMessage}</div>}
           <form onSubmit={handleSubmit}>
              <div>
                 <label>Email:</label>
                 <input type="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
              </div>
              <div>
                 <label>Password:</label>
                 <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <button type="submit">Login</button>
           </form>
        </div>
    );
}
