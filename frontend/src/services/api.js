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
// services/api.js
export const saveGroupToFirebase = async (groupData) => {
    try {
        const response = await fetch(`${apiUrl}/api/create_group`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(groupData),
        });

        if (!response.ok) {
            throw new Error('Error saving group to Firebase');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
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

export const createGameRequest = async (gameData) => {
    try {
        const response = await fetch(`${apiUrl}/api/create_game`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gameData),
        });

        if (!response.ok) {
            throw new Error('Error creating game');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

// Simulated list of games
const mockGames = [
    {
        id: '1',
        courtLocation: 'Pickleball Court 1',
        dateTime: '2023-09-15T14:30:00',
        selectedGroup: 'Group 1',
        status: 'open',
        players: ['AqXvDJ8fXXYS9xan1lGgiTEwM7g2'],
    },
    {
        id: '2',
        courtLocation: 'Pickleball Court 2',
        dateTime: '2023-09-16T10:00:00',
        selectedGroup: 'Group 2',
        status: 'open',
        players: ['user2'],
    },
    // Add more games as needed
];

// Function to join an existing game
export const joinGame = (gameId, userId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const gameIndex = mockGames.findIndex((game) => game.id === gameId);
                if (gameIndex !== -1) {
                    const game = mockGames[gameIndex];
                    if (game.status === 'open' && game.players.length < 4) {
                        game.players.push(userId);
                        if (game.players.length === 4) {
                            game.status = 'closed';
                        }
                        resolve(game);
                    } else {
                        reject(new Error('Game is not open or already full.'));
                    }
                } else {
                    reject(new Error('Game not found.'));
                }
            } catch (error) {
                reject(error);
            }
        }, apiDelay);
    });
};

// Function to determine the game status
export const determineGameStatus = (game) => {
    if (game.status === 'open') {
        if (game.players.length === 4) {
            return 'Full';
        } else {
            return `${game.players.length}/4`;
        }
    } else {
        return 'Closed';
    }
};

// ...

// Updated API function to fetch created games
export const fetchCreatedGames = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(mockGames);
            } catch (error) {
                reject(error);
            }
        }, apiDelay);
    });
};

// ...

// Updated API function to fetch games created by friends
export const fetchGamesCreatedByFriends = (userId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                // Filter games created by friends based on the provided user ID
                const gamesCreatedByFriends = mockGames.filter(
                    (game) => !game.players.includes(userId) && game.status === 'open'
                );
                resolve(gamesCreatedByFriends);
            } catch (error) {
                reject(error);
            }
        }, apiDelay);
    });
};