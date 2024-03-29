import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../components/providers/AuthProvider';

const PrivateRoutes = ({ children }) => {
	const { user, loading } = useContext(AuthContext);
	const location = useLocation();
	if (loading) {
		return <div>Loading.........</div>;
	}
	if (user) {
		return children;
	}
	return <Navigate to='/login' state={{ from: location }} replace></Navigate>;
};

export default PrivateRoutes;
