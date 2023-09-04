import React, { useState } from 'react';

const GroupModal = ({ friends, selectedFriends, onFriendSelect, groupName, onGroupNameChange, onSave, onCancel }) => {
  const handleFriendToggle = (friendId) => {
    onFriendSelect(friendId);
  };

  return (
    <div className="group-modal p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Create a Group</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Group Name:</label>
        <input
          type="text"
          className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
          value={groupName}
          onChange={onGroupNameChange}
        />
      </div>
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">Select Friends:</h4>
        <ul>
          {friends.map((friend) => (
            <li key={friend.id} className="mb-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedFriends.includes(friend.id)}
                  onChange={() => handleFriendToggle(friend.id)}
                  className="text-blue-500 form-checkbox focus:ring-2 focus:ring-blue-200"
                />
                <span className="text-sm">{friend.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-end">
        <button
          onClick={onSave}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default GroupModal;
