import setStates from '../../mainFunctions/setStates';
import checkIfGameCanBeFinished from '../checks/checkIfGameCanBeFinished';
import checkIfLastSet from './checkIfLastSet';
import editingScores from './editingScores';
import log from "../log"
let dt = new Date();

setInterval(() => { dt = new Date() }, 500)

export default function addScore(component, socket, player, num, name) {

  console.log(name + " button clicked")


  let count = num ? num : 1;
  const prevState = component.state;

  function setScoresInLastSet(state) {
    if ((state.player1 === 5 && state.player1 > state.player2 && prevState.player1 === 4) || (state.player2 === 5 && state.player2 > state.player1 && prevState.player2 === 4)) {
      console.log("doNotSend", state)
    } else {
      console.log("send", state)
      socket.emit('scoreUpdate', state)
    }

  }

  if (!component.state.newGameButton && !component.state.finishGameButton) {
    if (component.state.editing) {
      editingScores(component, player, count)
    } else {
      if (component.state.blockConfig !== true) {
        console.log('blockOn')
        component.setState({ block: true })
      }
      if (component.state.newSetButton === false) {
        if (name.slice(-5) !== "Small") {
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
                }, () => {
                  socket.emit('scoreUpdate', component.state);
                  console.log("scoreUpdate")
                })
              } else {
                socket.emit('scoreUpdate', component.state);
                console.log("scoreUpdate")

              }
            } else {
              if (checkIfLastSet(component)) {
                setScoresInLastSet(component.state)
              } else {
                socket.emit('scoreUpdate', component.state);
                console.log("scoreUpdate")
              }
            }
          })
        }
      }
    }
  }




}