import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event) {
        //Prevents the default action of refreshing the page when submitting the form
        event.preventDefault();
        axios.post('/login', { email, password })
        .then(response => {
            localStorage.setItem('token', response.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            navigate('/user');
        })
        .catch(error => {
            if (error.response.status === 422) {
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
                 <input type="text" onChange={e => setEmail(e.target.value)} autoComplete="email" />
              </div>
              <div>
                 <label>Password:</label>
                 <input type="password" onChange={e => setPassword(e.target.value)} />
              </div>
              <button type="submit">Login</button>
           </form>
        </div>
    );
}
