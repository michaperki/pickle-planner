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
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="modal-bg absolute inset-0 bg-black opacity-50" onClick={onModalClose}></div>
        <div className="modal-container bg-white rounded-lg shadow-lg p-4 w-full md:w-96 z-60" style={{ zIndex: 9999 }}>
          <h2 className="text-2xl font-semibold mb-4">Create Game</h2>
          <form onSubmit={onCreateGame}>
            <div className="mb-4">
              <label htmlFor="courtLocation" className="block text-sm font-medium mb-1">Court Location:</label>
              <input
                type="text"
                id="courtLocation"
                value={courtLocation}
                onChange={onCourtLocationChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="dateTime" className="block text-sm font-medium mb-1">Day/Time:</label>
              <input
                type="datetime-local"
                id="dateTime"
                value={dateTime}
                onChange={onDateTimeChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="selectedGroup" className="block text-sm font-medium mb-1">Select Group:</label>
              <select
                id="selectedGroup"
                value={selectedGroup}
                onChange={onGroupSelect}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
              >
                <option value="">Select a group</option>
                {savedGroups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.groupName}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
              >
                Create Game
              </button>
              <button
                type="button"
                onClick={onModalClose}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-200"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default GameCreationModal;
