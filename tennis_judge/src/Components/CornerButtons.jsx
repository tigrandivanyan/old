import React from 'react';
import editingFunction from '../functions/scores/editing';
import changeOnEdit from '../functions/gui_functions/changeOnEdit';
import undo from '../style/undo.png'
import edit from '../style/edit.png'

class CorenerButtons extends React.Component{


    help(){
        this.props.socket.emit('help')
    }

    render(){
        let component = this.props.component;
        let editing = editingFunction(component, this.props.socket);
        return (
            <div>
                <div className="leftTop"  onClick={() => editing.undo()}   style={changeOnEdit(component, true, "rgba(255, 153, 0, 0.5)")}>
                    <img src={undo} className="undo" alt="UNDO" style={changeOnEdit(component, true)}/>
                </div>
                <div className="rightTop" onClick={() => editing.start()}  style={changeOnEdit(component, true, "rgba(255, 153, 0, 0.5)")}>
                    <img src={edit} className="edit" alt="EDIT" style={changeOnEdit(component, true)}/>
                </div>
                <div className="leftTop"  onClick={() => editing.save()}   style={changeOnEdit(component, false, "rgba(0, 255, 25, 0.5)")}>
                    <p className="save" style={changeOnEdit(component, false)}>Сохранить</p>
                </div>
                <div className="rightTop" onClick={() => editing.cancel()} style={changeOnEdit(component, false, "rgba(255, 0, 0, 0.5)")}>
                    <p className="cancel" style={changeOnEdit(component, false)}>Отмена</p>  
                </div> 
                <div className="centerTop" onClick={() => this.help()} style={changeOnEdit(component, false)}>
                    <p>Помощь</p>
                </div>
            </div>
        );
    }

}

export default CorenerButtons;