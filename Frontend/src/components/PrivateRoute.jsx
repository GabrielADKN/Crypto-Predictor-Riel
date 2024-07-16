import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * Renders the given element if the user is authenticated, otherwise redirects to the login page.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {React.ReactElement} props.element - The element to render if the user is authenticated.
 * @return {React.ReactElement} The rendered element or a Navigate component to redirect to the login page.
 */
const PrivateRoute = ({ element }) => {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
