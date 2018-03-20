export const getPlayerIndex = (array, id) => {
  let playerIndex
  array.forEach((e, index) => {
    if (e.id === id) {
      playerIndex = index
    }
  })
  return playerIndex
}

export const getMatchIndex = (array, wId, lId) => {
  let matchIndex
  array.forEach((e, index) => {
    if (e.matchId === wId || e.matchId === lId) {
      matchIndex = index
    }
  })
  return matchIndex
}
