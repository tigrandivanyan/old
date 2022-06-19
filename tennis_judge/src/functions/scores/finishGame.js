import setStates from '../../mainFunctions/setStates';
import checkIfGameCanBeFinished from '../checks/checkIfGameCanBeFinished';

function finishGame(component, socket){

    if (!component.state.editing) {
        if (checkIfGameCanBeFinished(component.state, 'game')) {

            socket.emit('finishGame')

            setStates(component, {finishGameButton: false, newGameButton: true });
        }

    }
}

export default finishGame;