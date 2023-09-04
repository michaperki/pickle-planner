// GameCreationModal.js
import React from 'react';

const GameCreationModal = ({
  isVisible,
  onModalClose,
  courtLocation,
  onCourtLocationChange,
  dateTime,
  onDateTimeChange,
  selectedGroup,
  onGroupSelect,
  savedGroups,
  onCreateGame,
}) => {
  return (
    isVisible && (
      <div className="game-creation-modal">
        <h2>Create Game</h2>
        <form onSubmit={onCreateGame}>
          <label>
            Court Location:
            <input type="text" value={courtLocation} onChange={onCourtLocationChange} />
          </label>
          <label>
            Day/Time:
            <input type="datetime-local" value={dateTime} onChange={onDateTimeChange} />
          </label>
          <label>
            Select Group:
            <select value={selectedGroup} onChange={onGroupSelect}>
              <option value="">Select a group</option>
              {savedGroups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.groupName}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Create Game</button>
        </form>
        <button onClick={onModalClose}>Close</button>
      </div>
    )
  );
};

export default GameCreationModal;
