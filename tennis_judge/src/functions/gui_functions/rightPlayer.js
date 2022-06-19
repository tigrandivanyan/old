let reverse;

function rightPlayer(type, side, state, setState){
    

    if((state.wonGames1 + state.wonGames2) % 2 !== 0){
        reverse = true;
    }else{
        reverse = false;
    }

    
    if(state.doNotReverse){
        reverse = !reverse;
    }
    
    if(state.reverseInLastSet){
        reverse = !reverse;
    }

    if(window.location.pathname === '/Desktop'){
        reverse = !reverse;
    }
    
    if(type === "big"){
        if(side === "left"){
            return reverse ? "player2" : "player1"
        }else{
            return reverse ? "player1" : "player2"
        }
    }else{
        if(side === "left"){
            return reverse ? "wonGames2" : "wonGames1"
        }else{
            return reverse ? "wonGames1" : "wonGames2"
        }
    }
}

export default rightPlayer;