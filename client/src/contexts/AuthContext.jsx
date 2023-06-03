import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import marqueeServer from '../api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const login = async (username, password) => {
        try {
            const response = await marqueeServer.post('/api/login', { username, password });
            const { token } = response.data;
            setToken(token);
            localStorage.setItem('token', token);
            setError(null);
        } catch (error) {
            setToken(null);
            setError('Invalid credentials. Please try again.');
            alert("Invalid Credentials!");
        }
    };

    const logout = () => {
        setToken(null);
        setError(null);
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
