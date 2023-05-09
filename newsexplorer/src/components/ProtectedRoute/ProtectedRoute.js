import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, path }) => {
    const { loggedIn } = useAuth();
    console.log('loggedIn', loggedIn);
    return loggedIn ?(
        <Route path={path}>{children}</Route>
    ) : <Navigate to="/" />
};

export default ProtectedRoute;