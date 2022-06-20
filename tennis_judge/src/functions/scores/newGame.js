export default function newGame(component, socket) {
  if (!component.state.editing) {
    socket.emit('newGame', component.state.source)
    component.setState({newGameButton:false});
  }
}