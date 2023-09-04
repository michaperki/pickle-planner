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
                // Update the game data to include the number of players and status
                const gamesWithStatus = data.map((game) => {
                    const status = game.players.length === 4 ? 'closed' : 'open';
                    return { ...game, status, numPlayers: game.players.length };
                });

                setCreatedGames(gamesWithStatus);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="created-games-list">
            <h2 className="text-2xl font-semibold mb-4">My Games</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">Error: {error.message}</p>
            ) : createdGames.length === 0 ? (
                <p>No created games available.</p>
            ) : (
                <ul>
                    {createdGames.map((game) => (
                        <li key={game.id} className="border border-gray-300 rounded p-4 mb-4">
                            <h3 className="text-lg font-semibold">Court Location: {game.courtLocation}</h3>
                            <p>Date/Time: {game.dateTime}</p>
                            <p>Selected Group: {game.selectedGroup}</p>
                            <p>
                                Number of Players: <span className={`text-${game.status === 'open' ? 'green' : 'red'}-500`}>{`${game.numPlayers}/4`}</span>
                            </p>
                            <p>Status: <span className={`text-${game.status === 'open' ? 'green' : 'red'}-500`}>{game.status}</span></p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CreatedGamesList;
