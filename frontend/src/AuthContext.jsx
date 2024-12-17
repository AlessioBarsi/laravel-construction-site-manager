import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            fetchUserDetails();
        } else {
            setIsLoading(false);
        }
    }, []);

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get('/user');
            setIsLoggedIn(true);
            setUserId(response.data.id);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            logout();
            setIsLoading(false);
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
        toast('You logged out!')
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userId, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
