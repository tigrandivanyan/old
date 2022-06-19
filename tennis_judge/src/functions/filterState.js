import log from "./log";

export default function filterState(newState, state) {

  function rightState(elem) {
    if (newState[elem] !== undefined && newState[elem] !== null) {
      return newState[elem];
    } else {
      return state[elem];
    }
  }


  console.log('filterState.js', [newState, newState.tourID ? newState.tourID : "nothing"])

  return {
    player1: rightState('player1'),
    player2: rightState('player2'),
    wonGames1: rightState('wonGames1'),
    wonGames2: rightState('wonGames2'),
    lastSet: rightState('lastSet'),
    doNotReverse: rightState('doNotReverse'),
    neededSetsToWin: rightState('neededSetsToWin'),
    neededGamesToWin: rightState('neededGamesToWin'),
    reverseInLastSet: rightState('reverseInLastSet'),
    names: rightState('names'),
    warningText: rightState('warningText'),
    block: rightState('block'),
    delay: rightState('delay'),
    tourID: newState.tourID ? newState.tourID : state.tourID,
    started: rightState('started'),
    changeSet: rightState('changeSet'),
    finishedGame: rightState('finishedGame'),
  }
}