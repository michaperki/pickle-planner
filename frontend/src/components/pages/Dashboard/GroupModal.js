// GroupModal.js
import React, { useState } from 'react';

const GroupModal = ({ friends, selectedFriends, onFriendSelect, groupName, onGroupNameChange, onSave, onCancel }) => {
  const handleFriendToggle = (friendId) => {
    onFriendSelect(friendId);
  };

  return (
    <div className="group-modal">
      <h3>Create a Group</h3>
      <label>
        Group Name:
        <input
          type="text"
          value={groupName}
          onChange={onGroupNameChange}
        />
      </label>
      <div>
        <h4>Select Friends:</h4>
        <ul>
          {friends.map((friend) => (
            <li key={friend.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedFriends.includes(friend.id)}
                  onChange={() => handleFriendToggle(friend.id)}
                />
                {friend.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={onSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default GroupModal;
