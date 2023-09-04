// GroupList.js
import React from 'react';

const GroupList = ({ groups, isLoading, error }) => {
  return (
    <div className="group-list">
      <h2>Saved Groups</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : groups.length === 0 ? (
        <p>No saved groups available.</p>
      ) : (
        <ul>
          {groups.map((group) => (
            <li key={group.id}>
              <h3>{group.groupName}</h3>
              <p>Selected Friends: {group.selectedFriends.join(', ')}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GroupList;
