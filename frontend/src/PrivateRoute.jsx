import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function PrivateRoute() {
    const { isLoading, isLoggedIn } = useAuth();
    if (isLoading) {
        return <div>LOADING</div>
    }
    // If not logged in, redirect to login page
    // Otherwise, render the child routes
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}