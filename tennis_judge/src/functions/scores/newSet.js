import setStates from '../../mainFunctions/setStates';
import checkIfGameCanBeFinished from '../checks/checkIfGameCanBeFinished';

export default function newSet(component, socket) {
  if (!component.state.editing) {

    if (checkIfGameCanBeFinished(component.state, 'set')) {
      let newScores = {
        player1: 0,
        player2: 0,
        wonGames1: component.state.wonGames1,
        wonGames2: component.state.wonGames2,
        names: component.state.names,
        source: component.state.source,
      }

      
      if (component.state.player1 > component.state.player2) {
        newScores.wonGames1 += 1;
      } else {
        newScores.wonGames2 += 1;
      }
      
      socket.emit('newSet', newScores);

      setStates(component, newScores);


      setStates(component, { systemAlert: "Смена сторон" }, () => {
        setTimeout(() => {
          setStates(component, { systemAlert: "" })
        }, 3000)
      })

      setStates(component, { newSetButton: false })
    }
  }
}