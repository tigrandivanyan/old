import log from "../log"

function appOnMount(comp, socket, alertor, internetBlinder) {
    socket.on('disconnect', () => {
        clearInterval(internetBlinder)
        comp.setState({ internetAlert: "Подключение потеряно", internetColor: "black", block: true, internetBack: "white" }, () => {
            setTimeout(() => {
                if (comp.state.internetColor === "black") {
                    comp.setState({ internetColor: "red", internetBack: "white" })
                }
            }, 5000)

        })
    })

    socket.on('connect', () => {
        comp.setState({ internetAlert: "Подключение установлено", internetColor: "green", internetBack: "white", block: false }, () => {
            internetBlinder = setInterval(() => {
                if (comp.state.internetAlert.length > 0) {
                    comp.setState({ internetBack: "green", internetColor: "white" }, () => {
                        setTimeout(() => {
                            if (comp.state.internetColor === "white" && comp.state.internetBack === "green") {
                                comp.setState({ internetBack: "white", internetColor: "green" })
                            }
                        }, 1000)
                    })
                }
            }, 5000)
        })
    })

    //Socket score setting
    socket.on('setScores', scores => {
        console.log("Got new scores", [scores]);
        comp.setState({
            player1: scores.player1 !== undefined ? scores.player1 : comp.state.player1,
            player2: scores.player2 !== undefined ? scores.player2 : comp.state.player2,
            wonGames1: scores.wonGames1 !== undefined ? scores.wonGames1 : comp.state.wonGames1,
            wonGames2: scores.wonGames2 !== undefined ? scores.wonGames2 : comp.state.wonGames2,
            lastSet: scores.lastSet !== undefined ? scores.lastSet : comp.state.lastSet,
            doNotReverse: scores.doNotReverse !== undefined ? scores.doNotReverse : comp.state.doNotReverse,
            neededSetsToWin: scores.neededSetsToWin !== undefined ? scores.neededSetsToWin : comp.state.neededSetsToWin,
            neededGamesToWin: scores.neededGamesToWin !== undefined ? scores.neededGamesToWin : comp.state.neededGamesToWin,
            reverseInLastSet: scores.reverseInLastSet !== undefined ? scores.reverseInLastSet : comp.state.reverseInLastSet,
            names: scores.names !== undefined && scores.names !== null ? scores.names : comp.state.names,
            tourID: scores.tourID
        })
    })

    socket.on('help', () => {
        let alertor1 = setInterval(() => {
            comp.setState({ bodyBack: "red" }, () => {
                setTimeout(() => {
                    comp.setState({ bodyBack: "black" })
                }, 500)
            })
        }, 1000);

        comp.setState({
            alertor: alertor1
        })

    })


}

export default appOnMount