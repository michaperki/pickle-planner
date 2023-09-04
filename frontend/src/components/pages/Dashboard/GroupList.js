import React from 'react';

const GroupList = ({ groups, isLoading, error }) => {
  return (
    <div className="group-list p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Saved Groups</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error.message}</p>
      ) : groups.length === 0 ? (
        <p>No saved groups available.</p>
      ) : (
        <ul>
          {groups.map((group) => (
            <li key={group.id} className="mb-4">
              <h3 className="text-md font-medium mb-1">{group.groupName}</h3>
              <p className="text-sm">
                Selected Friends: {group.selectedFriends ? group.selectedFriends.join(', ') : ''}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GroupList;
