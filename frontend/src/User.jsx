import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function User() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get('user')
            .then(response => setUser(response.data))
            .catch(error => {
                if (error.response.status === 401) {
                    navigate('/login'); // If unauthorized, redirect to login
                }
            });
        } else {
            navigate('/login'); // No token, redirect to login
        }
    }, [navigate]);

    function handleLogout() {
        axios.post('logout')
        .finally(() => {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
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
