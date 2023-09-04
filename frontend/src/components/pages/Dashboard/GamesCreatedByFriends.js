import React from 'react';

const GamesCreatedByFriendsList = ({ gamesCreatedByFriends, isLoading, error }) => {
  return (
    <div className="games-created-by-friends-list">
      <h2>Games Created by Friends</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : gamesCreatedByFriends.length === 0 ? (
        <p>No games created by friends available.</p>
      ) : (
        <ul>
          {gamesCreatedByFriends.map((game) => (
            <li key={game.id}>
              <h3>Court Location: {game.courtLocation}</h3>
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
