import React from 'react';
import newSet from '../functions/scores/newSet';
import newGame from '../functions/scores/newGame';
import finishGame from '../functions/scores/finishGame';

class TemporaryObjects extends React.Component{

    render(){

        let component = this.props.component;
        let socket = this.props.socket;
        return(
            <div>
                {/* confirmation buttons */}
                <div className="newButtons">
                    <div style={{display:component.state.newSetButton ? "flex" : "none"}} onClick={()=>newSet(component, socket)}>Новый сет</div>
                    <div style={{display:component.state.finishGameButton ? "flex" : "none"}} onClick={()=>finishGame(component, socket)}>Завершить игру</div>
                    <div style={{display:component.state.newGameButton ? "flex" : "none"}} onClick={()=>newGame(component, socket)}>Новая игра</div>
                </div>       

                {/* warning text */}
                <p className="warningText">{component.state.warningText}</p>

                {/* system alert */}

                <div className="systemAlert" style={component.state.systemAlert.length > 0 ? {display:"flex"} : {display:"none"}}>
                    <p>{component.state.systemAlert}</p>
                </div>

                {/* internet connection status */}

                <div className="internetAlert" style={{display:component.state.internetAlert.length > 0 ? "flex" : "none", color:component.state.internetColor, backgroundColor:component.state.internetBack}}>
                    <p>{component.state.internetAlert}</p>
                </div>

            </div>
        );
    }
}

export default TemporaryObjects;