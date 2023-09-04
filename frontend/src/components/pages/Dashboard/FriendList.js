import React from 'react';

const FriendList = ({ friends, isLoading, error }) => {
  return (
    <div className="friend-list p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Friend List</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error.message}</p>
      ) : (
        <ul>
          {friends.map((friend) => (
            <li key={friend.id} className="text-md mb-2">{friend.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendList;
