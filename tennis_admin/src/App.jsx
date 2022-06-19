import React from 'react';
import './App.css';
import filterState from './filterState'
import appOnMount from './functions/appFunctions/appOnMount';
import appDidUpdate from './functions/appFunctions/appDidUpdate';
import Scores from './components/Scores';
import log from './functions/log.js';

import io from 'socket.io-client';
import Sets from './components/Sets';
import Settings from './components/Settings';
import Root from './components/Root';
const socket = io('http://'+window.location.hostname+':9090');

let alertor;
let internetBlinder;

class App extends React.Component{

    state = {
        names:{
            player1:"Игрок 1",
            player2:"Игрок 2",
            judge:"Судья"
        },
        editing:false,
        additional:false,
        internetAlert:"",
        gamesToCheck:{},
        alertor:undefined,
        setKey:1
    }

    componentDidMount = () => appOnMount(this, socket, alertor, internetBlinder)

    submit(){
        console.log("New scores saved")
        this.setState({editing:false}, () => {
            socket.emit('scoreUpdate', {...filterState(this.state), id:'02'})
        })
    }

    showWarning(show){
        console.log("Texted to judge " + this.state.warningText)
        this.setState({shownText:show})
        if(show){
            socket.emit('warn', {warningText:this.state.warningText});
        }else{
            socket.emit('warn', {warningText:""});
        }
    }

    showOnEdit(){
        return {display:this.state.editing ? "flex" : "none"}
    }

    componentDidUpdate = (a,b) => appDidUpdate(this, a, b,)

    clickedAfterConnect(){
        if(this.state.internetAlert.length > 0 && (this.state.internetColor === "green" || this.state.internetColor === "white")){
          this.setState( {internetAlert:""}, () => clearInterval(internetBlinder));
          clearInterval(internetBlinder);
        }

        clearInterval(this.state.alertor)

    }

    remountSets(){
        this.setState({setKey:this.state.setKey+1})
    }

    render(){

        console.log(this.state)
        if(window.location.pathname === "/root"){
            return <Root component={this} socket={socket}/>
        }else{
            return(
                <div  onClick={() => this.clickedAfterConnect()} >
                    <Scores className="scores" component={this}/>
                    <Sets key={this.state.setKey} component={this} socket={socket}/>
                    <Settings component={this} socket={socket} />
                </div>
            );
        }
    }
}

export default App;