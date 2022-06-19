import axios from "axios";
import setStates from "../mainFunctions/setStates";
import checkIfGameCanBeFinished from "./checks/checkIfGameCanBeFinished";
import checkIfLastSet from "./scores/checkIfLastSet";
import log from "./log.js"

let firstUpdate = true;
let timerSet = false;

export default function componentDidUpdate(prevState, component, socket) {

    // console.log('State');
    // console.log(component.state);

    if (component.state.neededGamesToWin) {
        if (component.state.wonGames1 !== component.state.neededGamesToWin || component.state.wonGames2 !== component.state.neededGamesToWin) {
            if (component.state.finsihedGame) {
                component.setState({ finishedGame: false });
            }
        }

    }

    if (firstUpdate) {
        if (typeof component.state.player1 === "number") {
            if (checkIfGameCanBeFinished(component.state, "game")) {
                if (component.state.finishedGame) {
                    setStates(component, { newGameButton: true })
                    setStates(component, { finishedGame: false })
                } else {
                    setStates(component, { finishGameButton: true })
                }
            } else if (checkIfGameCanBeFinished(component.state, "set")) {
                setStates(component, { newSetButton: true })
            }
            if (component.state.started !== true && component.state.player1 === 0 && component.state.player2 === 0 && component.state.wonGames1 === 0 && component.state.wonGames2 === 0) {
                setStates(component, { newGameButton: true })
            }
            firstUpdate = false;


        }
    }


    if (component.state.block === true && component.state.internetColor !== "red" && component.state.internetColor !== "black") {
        if (!timerSet) {
            console.log("block on")
            timerSet = true;
            setTimeout(() => {
                timerSet = false;
                setStates(component, { block: false });
            }, window.location.pathname === '/' ? 1000 : 0)
        }
    }

    function reverseSidesInLastSet(side) {
        let displaySideChange = true;

        if (side === false) {
            displaySideChange = false;
        }

        if (prevState.editing === true && component.state.editing === false) {
            displaySideChange = true
        }

        console.log(displaySideChange)
        if (displaySideChange) {
            setStates(component, { systemAlert: "Смена сторон" }, () => {
                setTimeout(() => {
                    setStates(component, { systemAlert: "" })
                }, 3000)
                setTimeout(() => {
                    setStates(component, { reverseInLastSet: side }, () => {
                        socket.emit('scoreUpdate', component.state)
                        console.log("scoreUpdate")
                    })
                }, 1000)
            })
        }

    }


    if (checkIfLastSet(component)) {
        if (!component.state.editing) {
            if (component.state.player1 === 5 && !component.state.reverseInLastSet) {
                if (component.state.player1 >= component.state.player2) {
                    reverseSidesInLastSet(true);
                } else if (prevState.editing && !component.state.editing) {
                    reverseSidesInLastSet(true);
                }
            } else if (component.state.player2 === 5 && !component.state.reverseInLastSet) {
                if (component.state.player1 <= component.state.player2) {
                    reverseSidesInLastSet(true);
                } else if (prevState.editing && !component.state.editing) {
                    reverseSidesInLastSet(true);
                }
            } else if (component.state.player1 < 5 && component.state.player2 < 5) {
                reverseSidesInLastSet(false)
            } else if ((component.state.player1 > 5 || component.state.player2 > 5) && component.state.reverseInLastSet === false) {
                reverseSidesInLastSet(false)
            }
        }
    }

    if (component.state.changeSet) {
        setStates(component, { warningText: "Нажмите еще раз чтобы вернуть предыдущий сет" });
    } else {
        if (component.state.warningText === "Нажмите еще раз чтобы вернуть предыдущий сет") {
            setStates(component, { warningText: "" });
        }
    }

    // if(component.state.blockConfig === true){
    //     setStates(component, {block:true});
    // }else if(component.state.blockConfig === false){
    //     setStates(component, {block:false});
    // }


}