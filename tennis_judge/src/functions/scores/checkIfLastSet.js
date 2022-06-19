export default function checkIfLastSet(component){
    return (component.state.wonGames1 + component.state.wonGames2) === ((component.state.neededGamesToWin * 2) - 2)
}