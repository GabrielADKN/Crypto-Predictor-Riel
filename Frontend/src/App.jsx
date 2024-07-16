import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PredictionForm from './components/PredictionForm';
import PrivateRoute from './components/PrivateRoute';
import NavigationBar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';

/**
 * Renders the main application component.
 *
 * @return {JSX.Element} The rendered application component.
 */
const App = () => {
    return (
        <AuthProvider>
            <Router>
                <NavigationBar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/predict" element={<PrivateRoute element={<PredictionForm />} />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
