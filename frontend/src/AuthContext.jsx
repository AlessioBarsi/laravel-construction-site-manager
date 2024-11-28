import React, { createContext, useState, useContext, useEffect } from 'react';
import { userService } from './api/users';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            fetchUserDetails();
        }
    }, []);

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get('/user');
            setIsLoggedIn(true);
            setUserId(response.data.id);
            console.log(response.data.id);
        } catch (error) {
            console.log(error);
            logout();
        }
    };

    const login = (token, id) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
        setUserId(id);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUserId(null);
        alert('You logged out!')
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
