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

export const createGameRequest = (gameData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                // Simulated response from the server
                const createdGame = { id: '123', ...gameData };
                resolve(createdGame);
            } catch (error) {
                reject(error);
            }
        }, apiDelay);
    });
};

// Simulated API function to fetch created games
export const fetchCreatedGames = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                // Simulated list of created games (you can replace this with actual data)
                const createdGames = [
                    {
                        id: '1',
                        courtLocation: 'Pickleball Court 1',
                        dateTime: '2023-09-15T14:30:00',
                        selectedGroup: 'Group 1',
                    },
                    {
                        id: '2',
                        courtLocation: 'Pickleball Court 2',
                        dateTime: '2023-09-16T10:00:00',
                        selectedGroup: 'Group 2',
                    },
                    // Add more games as needed
                ];

                resolve(createdGames);
            } catch (error) {
                reject(error);
            }
        }, apiDelay);
    });
};

// Simulated API function to fetch games created by friends
export const fetchGamesCreatedByFriends = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Simulated list of games created by friends (you can replace this with actual data)
          const gamesCreatedByFriends = [
            {
              id: '3',
              courtLocation: 'Pickleball Court 3',
              dateTime: '2023-09-18T16:00:00',
              selectedGroup: 'Group 1',
              createdBy: 'friend1', // Add the user who created the game
            },
            {
              id: '4',
              courtLocation: 'Pickleball Court 4',
              dateTime: '2023-09-19T09:30:00',
              selectedGroup: 'Group 2',
              createdBy: 'friend2', // Add the user who created the game
            },
            // Add more games created by friends as needed
          ];
  
          resolve(gamesCreatedByFriends);
        } catch (error) {
          reject(error);
        }
      }, apiDelay);
    });
  };