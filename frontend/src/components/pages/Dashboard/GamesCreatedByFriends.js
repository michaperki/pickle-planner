import React from 'react';

const GamesCreatedByFriendsList = ({ gamesCreatedByFriends, isLoading, error }) => {
  return (
    <div className="games-created-by-friends-list">
      <h2 className="text-xl font-semibold mb-4">Games Created by Friends</h2>
      {isLoading ? (
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error.message}</p>
      ) : gamesCreatedByFriends.length === 0 ? (
        <p>No games created by friends available.</p>
      ) : (
        <ul>
          {gamesCreatedByFriends.map((game) => (
            <li key={game.id} className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Court Location: {game.courtLocation}</h3>
              <p>Date/Time: {game.dateTime}</p>
              <p>Selected Group: {game.selectedGroup}</p>
              <p>Created By: {game.createdBy}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GamesCreatedByFriendsList;
