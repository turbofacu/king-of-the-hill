export const getPlayerIndex = (array, id) => {
  return array.findIndex((e) => {
    return e.id === id
  })
}

export const getMatchIndex = (array, wId, lId) => {
  return array.findIndex((e) => {
    return e.matchId === wId || e.matchId === lId
  })
}
