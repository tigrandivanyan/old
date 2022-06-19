import checkIfSetCanBeCorrect from '../checks/checkIfSetCanBeCorrect';
import checkIfGameCanBeFinished from '../checks/checkIfGameCanBeFinished';
import setStates from '../../mainFunctions/setStates';

export default function editingScores(component, player, count) {

  if (component.state[player] + count >= 0) {
    if (player === 'wonGames1' && (component.state.wonGames2 - count) >= 0 && (component.state.wonGames2 - count) < component.state.neededGamesToWin && component.state[player] + count < component.state.neededGamesToWin) {
      if (checkIfSetCanBeCorrect({ ...component.state, [player]: component.state[player] + count, wonGames2: component.state.wonGames2 - count })) {
        setStates(component, { [player]: component.state[player] + count, wonGames2: component.state.wonGames2 - count }, () => {

          if (checkIfGameCanBeFinished(component.state, "set")) {
            setStates(component, { newSetButton: true });
          } else {
            setStates(component, { newSetButton: false });
          }

        })
      }
    } else if (player === 'wonGames2' && (component.state.wonGames1 - count) >= 0 && (component.state.wonGames1 - count) < component.state.neededGamesToWin && component.state[player] + count < component.state.neededGamesToWin) {
      if (checkIfSetCanBeCorrect({ ...component.state, [player]: component.state[player] + count, wonGames1: component.state.wonGames1 - count })) {
        setStates(component, { [player]: component.state[player] + count, wonGames1: component.state.wonGames1 - count }, () => {

          if (checkIfGameCanBeFinished(component.state, "set")) {
            setStates(component, { newSetButton: true });
          } else {
            setStates(component, { newSetButton: false });
          }

        })
      }
    } else if (player !== "wonGames1" && player !== "wonGames2") {
      if (checkIfSetCanBeCorrect({ ...component.state, [player]: component.state[player] + count })) {
        setStates(component, { [player]: component.state[player] + count }, () => {

          if (checkIfGameCanBeFinished(component.state, "set")) {
            setStates(component, { newSetButton: true });

            let wonGames1 = component.state.wonGames1;
            let wonGames2 = component.state.wonGames2;

            if (component.state.player1 > component.state.player2) {
              wonGames1 += 1
            } else {
              wonGames2 += 1
            }
            
            if (wonGames1 >= component.state.neededGamesToWin || wonGames2 >= component.state.neededGamesToWin) {
              setStates(component, {
                wonGames1: wonGames1,
                wonGames2: wonGames2,
                doNotReverse: true,
                newSetButton: false,
                finishGameButton: true
              })
            }
            
          } else {
            setStates(component, { newSetButton: false });
          }

        })
      }
    }
  }
}