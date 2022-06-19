export default function checkIfSetCanBeCorrect(state){

    if(state.player1 < state.neededSetsToWin && state.player2 < state.neededSetsToWin){
        return true;
    }

    if(state.player1 >= state.neededSetsToWin || state.player2 >= state.neededSetsToWin){
        if(Math.abs(state.player1 - state.player2) <= 2){
            return true;
        }
    }

    if(state.player2 <= state.neededSetsToWin && state.player1 <= state.neededSetsToWin){
        return true;
    }

    return false;
}