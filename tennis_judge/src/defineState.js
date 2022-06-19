export default function defineState(){

    return {
        player1:"",
        player2:"",
        wonGames1:"",
        wonGames2:"",
    
        editing:false,
    
        beforeEdit:{},
    
        newSet:false,
        lastSet:false,
    
        newSetButton:false,
        newGameButton:false,
        finishGameButton:false,
    
        warningText:"",
    
        doNotReverse:false,
        reverseInLastSet:false,
    
        systemAlert:"",
        internetAlert:"",
        internetColor:"red",
    
        names:{
          player1:"Игрок 1",
          player2:"Игрок 2",
          judge:"Судья"
        },
        neededSetsToWin:11,
        neededGamesToWin:5,

        changeSet:false,
        tourID:""
    }

}