import checkIfGameCanBeFinished from "../checks/checkIfGameCanBeFinished";
import axios from 'axios'
import setStates from "../../mainFunctions/setStates";
import log from '../log'
let dt = new Date();
let firstUndo = true;

setInterval(() => { dt = new Date() }, 500)

function editingFunction(component, socket) {
  return {
    cancel: () => {

      console.log("Clicked exit editing")

      setStates(component, { editing: false }, () => {
        setStates(component, component.state.beforeEdit, () => {
          setStates(component, { beforeEdit: {} })
        })
      })

      if (checkIfGameCanBeFinished(component.state, "set")) {
        setStates(component, { newSetButton: true })
      } else {

        setStates(component, { newSetButton: false })
      }
    },
    start: () => {


      component.setState({
        beforeEdit: { player1: component.state.player1, player2: component.state.player2, wonGames1: component.state.wonGames1, wonGames2: component.state.wonGames2 }
      }, () => {
        component.setState({ editing: true })
      })

    },
    undo: () => {
      console.log("Undo clicked")


      axios('http://' + window.location.hostname + ':9091/prevNums')
        .then(res => {
          let data = res.data.data;
          if (data.length > 0) {
            setStates(component, { newGameButton: false })
            if (checkIfGameCanBeFinished({ ...component.state, ...data[data.length - 1] }, 'game')) {
              setStates(component, { finishGameButton: true })
            } else {
              setStates(component, { finishGameButton: false })
            }
            if (!firstUndo) {
              firstUndo = true;
            } else {
              firstUndo = false;
            }
            if (checkIfGameCanBeFinished({ ...component.state, ...data[data.length - 1] }, 'set') && !checkIfGameCanBeFinished({ ...component.state, ...data[data.length - 1] }, 'game')) {
              if (component.state.changeSet) {
                setStates(component, { newSetButton: true })
              }
            } else {
              setStates(component, { newSetButton: false })
            }
            socket.emit('undoScores', component.state.changeSet)
          } else {
            setStates(component, { warningText: "Нет предыдущих счетов" }, () => {
              setTimeout(() => {
                setStates(component, { warningText: "" })
              }, 5000)
            })
          }
        })
    },

    save: () => {

      console.log("edits saved clicked");

      setStates(component, { editing: false, beforeEdit: {} }, () => {
        socket.emit('scoreUpdate', component.state)
      })
    }


  }
}

export default editingFunction;