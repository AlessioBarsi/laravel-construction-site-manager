import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { CircularProgress } from '@mui/material';

export function AdminRoute() {
    const { isLoading, isAdmin } = useAuth();
    if (isLoading) {
        return <div className='flex items-center justify-center h-screen'><CircularProgress/></div>
    }
    // If not admin in, redirect to home page
    // Otherwise, render the child routes
    return isAdmin ? <Outlet /> : <Navigate to="/home" replace />;
}