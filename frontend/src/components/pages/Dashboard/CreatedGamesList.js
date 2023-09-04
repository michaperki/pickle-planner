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
    <div className="created-games-list">
      <h2>My Games</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : createdGames.length === 0 ? (
        <p>No created games available.</p>
      ) : (
        <ul>
          {createdGames.map((game) => (
            <li key={game.id}>
              <h3>Court Location: {game.courtLocation}</h3>
              <p>Date/Time: {game.dateTime}</p>
              <p>Selected Group: {game.selectedGroup}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CreatedGamesList;
