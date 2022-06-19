import log from "../log";

function appDidUpdate(comp, prevProps, prevState) {
    if (!prevState.editing && comp.state.editing) {
        comp.setState({
            beforeEditing: {
                player1: comp.state.player1,
                player2: comp.state.player2,
                wonGames1: comp.state.wonGames1,
                wonGames2: comp.state.wonGames2
            }
        })
    }
    if (prevState.editing && !comp.state.editing && comp.state.canceled) {
        comp.setState({
            ...comp.state.beforeEditing,
            canceled: false
        })
    }
    if (prevState.editing && !comp.state.editing) {
        console.log("finished editing")
    }
    if (!prevState.editing && comp.state.editing) {
        console.log("started editing")
    }
}

export default appDidUpdate;