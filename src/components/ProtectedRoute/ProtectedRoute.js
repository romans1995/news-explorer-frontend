import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { loggedIn } = useAuth();
    return loggedIn ?(
        children
    ): <Navigate to = "/" replace/>
};

export default ProtectedRoute;