import React, { useState, useEffect } from 'react';
import FriendList from './FriendList';
import GroupModal from './GroupModal';
import GroupList from './GroupList';
import GameCreationModal from './GameCreationModal'; // Import the GameCreationModal component
import CreatedGamesList from './CreatedGamesList';
import GamesCreatedByFriendsList from './GamesCreatedByFriends';
import { fetchFriendList, saveGroupToFirebase, fetchSavedGroups, createGameRequest, fetchCreatedGames, fetchGamesCreatedByFriends } from '../../../services/api';

const Dashboard = ({ user }) => {
    // State for managing the group creation modal
    const [isCreatingGroup, setIsCreatingGroup] = useState(false);
    const [courtLocation, setCourtLocation] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');

    // State for managing friend list data
    const [friends, setFriends] = useState([]);
    const [isLoadingFriends, setIsLoadingFriends] = useState(true);
    const [errorFriends] = useState(null);

    // State for managing selected friends and group name within the modal
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [groupName, setGroupName] = useState('');

    // State for managing the list of saved groups
    const [groups, setGroups] = useState([]);
    const [isLoadingGroups, setIsLoadingGroups] = useState(true);
    const [errorGroups] = useState(null);

    // State for managing the game creation modal
    const [isCreatingGame, setIsCreatingGame] = useState(false);

    // State for managing the list of created games
    const [createdGames, setCreatedGames] = useState([]);
    const [isLoadingCreatedGames, setIsLoadingCreatedGames] = useState(true);
    const [errorCreatedGames, setErrorCreatedGames] = useState(null);

    // State for managing games created by friends
    const [gamesCreatedByFriends, setGamesCreatedByFriends] = useState([]);
    const [isLoadingGamesCreatedByFriends, setIsLoadingGamesCreatedByFriends] = useState(true);
    const [errorGamesCreatedByFriends, setErrorGamesCreatedByFriends] = useState(null);

    // Function to fetch games created by friends
    const fetchGamesCreatedByFriendsData = () => {
        setIsLoadingGamesCreatedByFriends(true);
        setErrorGamesCreatedByFriends(null);

        // Fetch the list of games created by friends when needed
        fetchGamesCreatedByFriends()
            .then((data) => {
                // Filter the games to include only those created by friends
                const filteredGames = data.filter((game) => game.createdBy !== user);
                setGamesCreatedByFriends(filteredGames);
                setIsLoadingGamesCreatedByFriends(false);
            })
            .catch((error) => {
                setErrorGamesCreatedByFriends(error);
                setIsLoadingGamesCreatedByFriends(false);
            });
    };


    // Function to fetch the list of created games
    const fetchGames = () => {
        setIsLoadingCreatedGames(true);
        setErrorCreatedGames(null);

        // Fetch the list of created games when needed
        fetchCreatedGames()
            .then((data) => {
                setCreatedGames(data);
                setIsLoadingCreatedGames(false);
            })
            .catch((error) => {
                setErrorCreatedGames(error);
                setIsLoadingCreatedGames(false);
            });
    };

    // Function to fetch the list of saved groups
    const fetchGroups = () => {
        setIsLoadingGroups(true);

        fetchSavedGroups()
            .then((data) => {
                setGroups(data);
                setIsLoadingGroups(false);
            })
            .catch((error) => {
                setIsLoadingGroups(false);
            });
    };

    // Function to open the group creation modal
    const handleCreateGroupClick = () => {
        setIsCreatingGroup(true);
    };

    // Function to close the group creation modal
    const handleCancelGroupCreation = () => {
        setIsCreatingGroup(false);
        // Optionally, reset selectedFriends and groupName
        setSelectedFriends([]);
        setGroupName('');
    };

    // Function to handle saving the group data
    const handleSaveGroup = () => {
        // Create an object with group data
        const groupData = {
            groupName,
            selectedFriends,
        };

        // Call the saveGroupToFirebase function to save the group data
        saveGroupToFirebase(groupData)
            .then(() => {
                // Close the group creation modal
                handleCancelGroupCreation();
                // Refresh the list of saved groups
                fetchGroups();
            })
            .catch((error) => {
                // Handle any error condition as needed
            });
    };

    // Function to open the game creation modal
    const handleCreateGameClick = () => {
        setIsCreatingGame(true);
    };

    // Function to close the game creation modal
    const handleCancelGameCreation = () => {
        setIsCreatingGame(false);
        // Optionally, reset form input values
        setCourtLocation('');
        setDateTime('');
        setSelectedGroup('');
    };

    // Function to handle creating a game
    const handleCreateGame = (e) => {
        e.preventDefault();
        // Create an object with game data
        const gameData = {
            courtLocation,
            dateTime,
            selectedGroup,
        };

        // Call the createGameRequest function to create the game
        createGameRequest(gameData)
            .then((createdGame) => {
                console.log('Game created:', createdGame);
                // Close the game creation modal
                handleCancelGameCreation();
            })
            .catch((error) => {
                console.error('Error creating game:', error);
            });
    };

    useEffect(() => {
        // Fetch the friend list data when the component mounts
        fetchFriendList()
            .then((data) => {
                setFriends(data);
                setIsLoadingFriends(false);
            })
            .catch(() => {
                setIsLoadingFriends(false);
            });

        // Fetch the list of saved groups when the component mounts
        fetchGroups();

        // Fetch the list of created games when the component mounts
        fetchGames();

        // Fetch the list of created games when the component mounts
        fetchGamesCreatedByFriendsData(); // Fetch games created by friends

    }, [user]);

    // Function to handle friend selection in the GroupModal
    const handleFriendSelect = (friendId) => {
        if (selectedFriends.includes(friendId)) {
            // If the friend is already selected, remove it
            setSelectedFriends(selectedFriends.filter((id) => id !== friendId));
        } else {
            // If the friend is not selected, add it
            setSelectedFriends([...selectedFriends, friendId]);
        }
    };

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <button onClick={handleCreateGroupClick}>Create Group</button>
            <button onClick={handleCreateGameClick}>Create Game</button>

            {/* Render FriendList */}
            <FriendList friends={friends} isLoading={isLoadingFriends} error={errorFriends} />

            {/* Render GroupModal */}
            {isCreatingGroup && (
                <GroupModal
                    friends={friends}
                    selectedFriends={selectedFriends}
                    groupName={groupName}
                    onFriendSelect={handleFriendSelect}
                    onGroupNameChange={(e) => setGroupName(e.target.value)}
                    onSave={handleSaveGroup}
                    onCancel={handleCancelGroupCreation}
                />
            )}

            {/* Render GameCreationModal */}
            {isCreatingGame && (
                <GameCreationModal
                    isVisible={isCreatingGame}
                    onModalClose={handleCancelGameCreation}
                    courtLocation={courtLocation}
                    onCourtLocationChange={(e) => setCourtLocation(e.target.value)}
                    dateTime={dateTime}
                    onDateTimeChange={(e) => setDateTime(e.target.value)}
                    selectedGroup={selectedGroup}
                    onGroupSelect={(e) => setSelectedGroup(e.target.value)}
                    savedGroups={groups}
                    onCreateGame={handleCreateGame}
                />
            )}

            {/* Render CreatedGamesList */}
            <CreatedGamesList
                createdGames={createdGames}
                isLoading={isLoadingCreatedGames}
                error={errorCreatedGames}
            />

            {/* Render GroupList */}
            <GroupList groups={groups} isLoading={isLoadingGroups} error={errorGroups} />

            <GamesCreatedByFriendsList
                currentUser={user}
                gamesCreatedByFriends={gamesCreatedByFriends}
                isLoading={isLoadingGamesCreatedByFriends}
                error={errorGamesCreatedByFriends}
            />
        </div>
    );
};

export default Dashboard;
