import React from 'react';
import addScore from '../functions/scores/addScore';
import changeOnEdit from '../functions/gui_functions/changeOnEdit';
import rightPlayer from '../functions/gui_functions/rightPlayer';

class Scores extends React.Component{

    
    render(){

        let component = this.props.component;
        let socket = this.props.socket;

        let bigLeft = rightPlayer("big", "left", component.state);
        let bigRight = rightPlayer("big", "right", component.state);
        let smallLeft = rightPlayer("small", "left", component.state);
        let smallRight = rightPlayer("small", "right", component.state);

        return(
            <div>
                {/* scores buttons */}
                <div className="sets">
                    <div className="setsMini">
                        <h1 className="sets_leftNum" onClick={() => addScore(component, socket, bigLeft, 1, "addLeftBig")}>{component.state[bigLeft]}</h1>
                        <div className="red"  onClick={() => addScore(component, socket, bigLeft, -1, "substractLeftBig")} style={changeOnEdit(component, false)}></div>
                    </div>

                    <div className="setsMini">
                        <h1 className="sets_rightNum" onClick={() => addScore(component, socket, bigRight, 1, "addRightBig")}>{component.state[bigRight]}</h1>
                        <div className="red"  onClick={() => addScore(component, socket, bigRight, -1, "substractRightBig")} style={changeOnEdit(component, false)}></div>
                    </div>
                </div>

                <div className="matches">
                    <div className="matchesMini">
                        <h6 className="matches_leftNum" onClick={() => addScore(component, socket, smallLeft, 1, "addLeftSmall")}>{component.state[smallLeft]}</h6>
                        <div className="red"  onClick={() => addScore(component, socket, smallLeft, -1, "substractLeftSmall")} style={changeOnEdit(component, false)}></div>
                    </div>

                    <div className="matchesMini">
                        <h6 className="matches_rightNum" onClick={() => addScore(component, socket, smallRight, 1, "addRightSmall")}>{component.state[smallRight]}</h6>
                        <div className="red"  onClick={() => addScore(component, socket, smallRight, -1, "substractRightSmall")} style={changeOnEdit(component, false)}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Scores;