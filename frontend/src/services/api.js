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

// services/api.js

// Simulated data for the friend list
const mockFriendList = [
    { id: 1, name: 'Friend 1' },
    { id: 2, name: 'Friend 2' },
    { id: 3, name: 'Friend 3' },
    // Add more friends as needed
];

// Simulated delay for API response (in milliseconds)
const apiDelay = 1000;

// Simulated API function to fetch the friend list
export const fetchFriendList = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(mockFriendList);
        }, apiDelay);
    });
};

// Simulated Firebase-like database
const mockFirebaseDatabase = {
    groups: [],
};

// Simulated API function to save a group to the Firebase-like database
export const saveGroupToFirebase = (groupData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                // Simulate a unique group ID
                const groupId = Date.now().toString();
                const groupWithId = { id: groupId, ...groupData };

                // Push the group to the simulated Firebase database
                mockFirebaseDatabase.groups.push(groupWithId);

                resolve(groupWithId);
            } catch (error) {
                reject(error);
            }
        }, apiDelay);
    });
};

// Simulated API function to fetch the list of saved groups
export const fetchSavedGroups = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Simulated list of saved groups (you can replace this with actual data)
          const savedGroups = [
            { id: '1', groupName: 'Group 1', selectedFriends: ['friend1', 'friend2'] },
            { id: '2', groupName: 'Group 2', selectedFriends: ['friend3', 'friend4'] },
            // Add more groups as needed
          ];
  
          resolve(savedGroups);
        } catch (error) {
          reject(error);
        }
      }, apiDelay);
    });
  };