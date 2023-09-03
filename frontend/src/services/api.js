// src/services/api.js
const apiUrl = 'http://127.0.0.1:5000'; // Replace with your actual API URL

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        return data; // You can return the response data if needed
    } catch (error) {
        throw error;
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${apiUrl}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data)

            return data; // Return the response data, if needed
        } else {
            const errorData = await response.json();
            throw new Error(errorData.error);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};