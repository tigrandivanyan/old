export default function filterState(newState, state){

  if(state){
    return {
        player1:          newState.player1 !== undefined ? newState.player1 : state.player1,
        player2:          newState.player2 !== undefined ? newState.player2 : state.player2,
        wonGames1:        newState.wonGames1 !== undefined ? newState.wonGames1 : state.wonGames1,
        wonGames2:        newState.wonGames2 !== undefined ? newState.wonGames2 : state.wonGames2,
        lastSet:          newState.lastSet !== undefined ? newState.lastSet : state.lastSet,
        doNotReverse:     newState.doNotReverse !== undefined ? newState.doNotReverse : state.doNotReverse,
        neededSetsToWin:  newState.neededSetsToWin !== undefined ? newState.neededSetsToWin : state.neededSetsToWin,
        neededGamesToWin: newState.neededGamesToWin !== undefined ? newState.neededGamesToWin : state.neededGamesToWin,
        reverseInLastSet: newState.reverseInLastSet !== undefined ? newState.reverseInLastSet : state.reverseInLastSet,
        names:            newState.names !== undefined ? newState.names !== null ? newState.names : state.names : state.names,
        tourID:           newState.tourID ? newState.tourID : state.tourID
      }

  }else{

    return {
      player1:newState.player1,
      player2:newState.player2,
      wonGames1:newState.wonGames1,
      wonGames2:newState.wonGames2,
      doNotReverse: newState.doNotReverse,
      names: newState.names,
      tourID: newState.tourID,
    }

  }
}