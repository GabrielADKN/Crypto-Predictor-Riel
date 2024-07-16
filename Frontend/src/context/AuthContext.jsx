import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

/**
 * Creates an authentication provider component that wraps its children with authentication state and login/logout functionality.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the authentication provider.
 * @return {React.ReactElement} The authentication provider component.
 */
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    const login = (data) => {
        setIsAuthenticated(true);
        localStorage.setItem('token', data.token);
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
