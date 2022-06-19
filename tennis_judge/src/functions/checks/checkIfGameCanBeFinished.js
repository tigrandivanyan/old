export default function checkIfGameCanBeFinished(state, type){
    if(type === "set"){
        if(state.player1 >= state.neededSetsToWin || state.player2 >= state.neededSetsToWin){
            if(  (state.player1 - state.player2 >= 2) || (state.player2 - state.player1 >= 2)  ){
                if(state.wonGames1 < state.neededGamesToWin && state.wonGames2 < state.neededGamesToWin){
                    return true;
                }
            }
        }
    }else if(type === "game"){
        console.log(state);
        console.log(state.wonGames1 >= state.neededGamesToWin || state.wonGames2 >= state.neededGamesToWin)
        if(state.wonGames1 >= state.neededGamesToWin || state.wonGames2 >= state.neededGamesToWin){
            return true;
        }
    }

    return false;
    
}