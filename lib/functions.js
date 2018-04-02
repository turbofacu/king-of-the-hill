export const getPlayerIndex = (array, id) => array.findIndex(e => e.id === id)

export const getMatchIndex = (array, wId, lId) => array.findIndex(e => e.matchId === wId || e.matchId === lId)

