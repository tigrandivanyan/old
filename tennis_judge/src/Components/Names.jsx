import React from 'react';
import rightPlayer from '../functions/gui_functions/rightPlayer';

class Names extends React.Component{

    render(){
        let component = this.props.component;

        let bigLeft = rightPlayer("big", "left", component.state);
        let bigRight = rightPlayer("big", "right", component.state);

        return(
            <div className="names">
                <p>{component.state.names[bigLeft]}</p>
                <p>{component.state.names[bigRight]}</p>
            </div>
        );
    }
}

export default Names;