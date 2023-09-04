import React, { useState, useEffect } from 'react';
import { fetchGamesCreatedByFriends, joinGame } from '../../../services/api';

const GamesCreatedByFriendsList = ({ user }) => {
  const [gamesCreatedByFriends, setGamesCreatedByFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleJoinGame = (gameId) => {
    joinGame(gameId, user.id)
      .then((updatedGame) => {
        // Handle the success case, such as showing a success message or updating the game list
        console.log('Joined game:', updatedGame);
      })
      .catch((error) => {
        // Handle the error case, such as showing an error message
        console.error('Error joining game:', error.message);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // Fetch the list of games created by friends when the component mounts
    fetchGamesCreatedByFriends()
      .then((data) => {
        // Filter and format games created by friends
        const formattedGames = data
          .filter((game) => game.createdBy !== user.id)
          .map((game) => {
            const status = game.players.length === 4 ? 'closed' : 'open';
            return { ...game, status, numPlayers: game.players.length };
          });

        setGamesCreatedByFriends(formattedGames);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [user]);

  return (
    <div className="games-created-by-friends-list">
      <h2 className="text-2xl font-semibold mb-4">Games Created by Friends</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : gamesCreatedByFriends.length === 0 ? (
        <p>No games created by friends available.</p>
      ) : (
        <ul>
          {gamesCreatedByFriends.map((game) => (
            <li key={game.id} className="border border-gray-300 rounded p-4 mb-4">
              <h3 className="text-lg font-semibold">Court Location: {game.courtLocation}</h3>
              <p>Date/Time: {game.dateTime}</p>
              <p>Selected Group: {game.selectedGroup}</p>
              <p>
                Number of Players: <span className={`text-${game.status === 'open' ? 'green' : 'red'}-500`}>{`${game.numPlayers}/4`}</span>
              </p>
              <p>
                Status: <span className={`text-${game.status === 'open' ? 'green' : 'red'}-500`}>{game.status}</span>
              </p>
              {game.status === 'open' && (
                <button
                  onClick={() => handleJoinGame(game.id)}
                  className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
                  Join
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GamesCreatedByFriendsList;
