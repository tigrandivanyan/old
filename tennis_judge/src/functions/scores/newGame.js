export default function newGame(component, socket) {
  if (!component.state.editing) {
    socket.emit('newGame')
    component.setState({newGameButton:false});
  }
}