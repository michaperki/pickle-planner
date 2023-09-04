import React, { useState, useEffect } from 'react';
import { fetchCreatedGames } from '../../../services/api';

const CreatedGamesList = () => {
  const [createdGames, setCreatedGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // Fetch the list of created games when the component mounts
    fetchCreatedGames()
      .then((data) => {
        setCreatedGames(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Games</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error.message}</p>
      ) : createdGames.length === 0 ? (
        <p>No created games available.</p>
      ) : (
        <ul className="space-y-4">
          {createdGames.map((game) => (
            <li
              key={game.id}
              className="bg-white shadow-lg rounded-md p-4"
            >
              <h3 className="text-lg font-semibold">Court Location: {game.courtLocation}</h3>
              <p className="text-gray-600">Date/Time: {game.dateTime}</p>
              <p className="text-gray-600">Selected Group: {game.selectedGroup}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CreatedGamesList;
