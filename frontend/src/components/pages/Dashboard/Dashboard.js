// Dashboard.js
import React, { useState, useEffect } from 'react';
import FriendList from './FriendList';
import GroupModal from './GroupModal';
import GroupList from './GroupList';
import { fetchFriendList, saveGroupToFirebase, fetchSavedGroups } from '../../../services/api'; // Import the new function

const Dashboard = () => {
    // State for managing the group creation modal
    const [isCreatingGroup, setIsCreatingGroup] = useState(false);

    // State for managing friend list data
    const [friends, setFriends] = useState([]);
    const [isLoadingFriends, setIsLoadingFriends] = useState(true);
    const [errorFriends, setErrorFriends] = useState(null);

    // State for managing selected friends and group name within the modal
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [groupName, setGroupName] = useState('');

    // State for managing the list of saved groups
    const [groups, setGroups] = useState([]);
    const [isLoadingGroups, setIsLoadingGroups] = useState(true);
    const [errorGroups, setErrorGroups] = useState(null);

    // Function to fetch the list of saved groups
    const fetchGroups = () => {
        setIsLoadingGroups(true);
        setErrorGroups(null);

        fetchSavedGroups()
            .then((data) => {
                setGroups(data);
                setIsLoadingGroups(false);
            })
            .catch((error) => {
                setErrorGroups(error);
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
            .then((savedGroup) => {
                console.log('Group saved to Firebase:', savedGroup);
                // Close the group creation modal
                handleCancelGroupCreation();
            })
            .catch((error) => {
                console.error('Error saving group:', error);
                // Handle any error condition as needed
            });
    };

    useEffect(() => {
        // Fetch the friend list data when the component mounts
        fetchFriendList()
            .then((data) => {
                setFriends(data);
                setIsLoadingFriends(false);
            })
            .catch((error) => {
                setErrorFriends(error);
                setIsLoadingFriends(false);
            });

        // Fetch the list of saved groups when the component mounts
        fetchGroups();
    }, []);

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

            {/* Render GroupList */}
            <GroupList groups={groups} isLoading={isLoadingGroups} error={errorGroups} />
        </div>
    );
};

export default Dashboard;
