import React from 'react';
import './style/App.css';
import componentDidUpdate from './functions/componentDidUpdate';
import filterState from './functions/filterState';
import Scores from './Components/Scores';
import CorenerButtons from './Components/CornerButtons';
import TemporaryObjects from './Components/TemporaryObjects';
import Names from './Components/Names';
import defineState from './defineState';
import setStates from './mainFunctions/setStates';
import axios from 'axios';

import io from 'socket.io-client';
const socket = io('http://' + window.location.hostname + ':9090');

let internetBlinder;

class App extends React.Component{

  state = defineState();


  componentDidMount(){


    socket.emit('writeMyIP')
    //Socket score setting
    socket.on('setScores', scores => {
      console.log('Got new scores', [scores, this.state])
      setStates(this, filterState(scores, this.state), () => console.log('seted'))
    })

    socket.on('disconnect', () => {
      clearInterval(internetBlinder)
      setStates(this, {internetAlert:"Подключение потеряно", internetColor:"black", block:true, internetBack:"white"}, ()=>{
        setTimeout(()=>{
          if(this.state.internetColor === "black"){
            setStates(this, {internetColor:"red", internetBack:"white"})
          }
        }, 5000)
        
      })
    })

    socket.on('connect', () => {
      setStates(this, {internetAlert:"Подключение установлено", internetColor:"green", internetBack:"white", block:false},() => {
        internetBlinder = setInterval(()=>{
          setStates(this, {internetBack:"green", internetColor:"white"}, () => {
            setTimeout(() => {
              if(this.state.internetColor === "white" && this.state.internetBack === "green"){
                this.setState({internetBack:"white", internetColor:"green"})
              }
            }, 1000)
          })
        }, 5000)
      })
    })

    socket.on('refresh', () => {
      window.location.reload();
    })

    socket.on('warn', (msg) => {
      this.setState({warningText: msg.warningText})
    })

    if(window.location.pathname !== "/Desktop"){
      axios('http://'+window.location.hostname+':9091/deleteGameNames')
    }

  }



  clickedAfterConnect(){
    if(this.state.internetColor === "green" || this.state.internetColor === "white"){
      setStates(this, {internetAlert:""}, () => clearInterval(internetBlinder))
    }
  }


  componentDidUpdate = (prevProps, prevState) => componentDidUpdate(prevState, this, socket);

  render(){

    console.log(this.state)
    return(
      <div className="main" style={{cursor:window.location.pathname === "/Desktop" ? "" : "none"}} onClick={() => this.clickedAfterConnect()}>
        <div className="blockAll" style={{display: this.state.block ? "block" : "none"}}></div>
        <Scores component = {this} socket = {socket}/>
        <CorenerButtons component = {this} socket = {socket}/>
        <TemporaryObjects component = {this} socket = {socket}/>
        <Names component = {this}/>
      </div>
    );
  }

}

export default App;