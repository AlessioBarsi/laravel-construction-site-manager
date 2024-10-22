import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
function User() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('user')
        .then(response => setUser(response.data));
     }, []);

    function handleLogout() {
        axios.post('logout')
        .finally(() => {
           localStorage.removeItem('token');
           axios.defaults.headers.common['Authorization'] = 'Bearer';
           navigate('/login');
        });
    }

    return (
        <div>
           <div>User ID: {user.id}</div>
           <div>Email: {user.email}</div>
           <button onClick={handleLogout}>Logout</button>
        </div>
     );
}

export default User;