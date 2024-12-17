import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { CircularProgress } from '@mui/material';

export function PrivateRoute() {
    const { isLoading, isLoggedIn } = useAuth();
    if (isLoading) {
        return <div className='flex items-center justify-center h-screen'><CircularProgress/></div>
    }
    // If not logged in, redirect to login page
    // Otherwise, render the child routes
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}