// src/components/auth/Login.js
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { loginUser } from '../../services/api'; // Import the API function
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState(''); // Update state variable name to 'email'
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await loginUser(email, password); // Update API function call to use 'email'

            if (response.access_token) {
                login(response.access_token); // Store the token in your authentication context
                navigate('/protected');
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (error) {
            setError('Login failed. Please try again later.');
        }
    };


    return (
        <div>
            <h2>Login</h2>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Update state update function to 'setEmail'
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={handleLogin}>Login</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;

