// FriendList.js
import React from 'react';

const FriendList = ({ friends, isLoading, error }) => {
  return (
    <div className="friend-list">
      <h2>Friend List</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <ul>
          {friends.map((friend) => (
            <li key={friend.id}>{friend.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendList;
