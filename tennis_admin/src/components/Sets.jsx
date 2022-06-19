import axios from 'axios';
import React from 'react';
import styles from './style/sets.module.css';
import log from '../functions/log.js';

class Sets extends React.Component {

    state = {
        sets:[],
        games:[],
        editing:false,
        setToEdit:[],
        comment:""
    }


    componentDidMount = () => {
        let socket = this.props.socket;

        socket.emit('getSets');

        socket.on('setSets', sets => {

            function areSame(set, newSet){
                return  (set.player1 === newSet.player1 && 
                        set.player2 === newSet.player2 && 
                        set.wonGames1 === newSet.wonGames1 && 
                        set.wonGames2 === newSet.wonGames2 &&
                        set.tourID === newSet.tourID)
            }

            let newSets = this.state.sets;


            sets.forEach(newSet => {
                let found = false;

                this.state.sets.forEach(set => {
                    if(areSame(set, newSet)) {
                        found = true
                    }

                })
                if(!found){
                    newSets.push(newSet);
                }
            })

            newSets.forEach((set, i) => {
                let found = false;
                
                sets.forEach(newSet => {
                    if(areSame(set, newSet)) {
                        found = true
                    }
                })


                if(!found){
                    newSets.splice(i, 1);
                }
            })

            newSets.sort(function(a,b){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(a.time) - new Date(b.time);
              });


            
            this.setState({newSets}, () => {
                let games = [];
    
                sets.forEach((e,i) => {
                    let found = false;
                    games.forEach(t => {
                        if(t.tourID === e.tourID){
                            found = true;
                        }
                    })
    
                    if(!found){
                        games.push({tourID:e.tourID, sets:[]})
                    }
    
                })
    
                this.state.sets.forEach(e => {
                    games.forEach(g => {
                        if(g.tourID === e.tourID){
                            g.sets.push(e)
                        }
                    })
                })
                
                this.setState({games})
            }, () => {
                this.props.component.remountsets();
            })
        })



    }

    submitSet(i, j){
        console.log("set submitted"+i+j)
        let set = this.state.games[i].sets[j];

        if(set.tourID){
            if(set.names.player1 === "Игрок 1"){
                alert("Проверьте имя Игрока 1");
            }else if(set.names.player1 === "Игрок 2"){
                alert("Проверьте имя Игрока 2");
            }else if(set.names.judge === "Судья"){
                alert("Проверьте имя Судьи");
            }else{

                let newGames = this.state.games;
        
                newGames[i].sets[j].checked = true;
        
                this.setState({games:newGames});
            }
        }else{
            alert("Укажите ID для этой игры")
        }
    }
    
    submitGame(game){
        console.log("game submitted", [game])
        let operator = window.prompt("Имя скаута");

        if(operator){
            axios.post('http://'+window.location.hostname+':9092/addLine', {...game, operator})
            .then(res => {
                if(res.data.status === 200){
                    axios.post('http://'+window.location.hostname+':9091/checkGame', {tourID:game.tourID})
                    .then(() => {
                        this.props.socket.emit('gameChecked', {tourID:game.tourID, source:'03'})
                        this.setState({loading:true}, () =>{
                            setTimeout(() => {
                                this.setState({loading:false}, () =>{
                                    this.props.socket.emit('getSets')
                                    this.props.component.remountSets()
                                })
                                axios('http://' + window.location.hostname +':9092/checkSheet')
                                .then(res => {
                                    console.log(res)
                                    if(res.data){
                                        if(res.data.length > 0){
                                            axios('http://' + window.location.hostname +':9092/get-sheet-GID')
                                            .then(gid_res => {
                                                const gid = gid_res.data;
                                                axios.post('http://' + window.location.hostname +':9092/deleteRows', {
                                                    rowsNums:res.data,
                                                    gid
                                                })
                                                .then(deletion_res => {
                                                    console.log(deletion_res)
                                                })
                                                .catch(err => console.log(err))
                                            })
                                            .catch(err => console.log(err))
                                        }
                                    }
                                })
                                .catch(err => console.log(err))
                            }, 3000)
                        })
                    })
                    
                }
            })
            .catch(err => console.log(err))
        }
        
    }

    allChecked(e){
        let allChecked = true;
        e.sets.forEach((set) => {
            
            if(set.checked !== true) {
                allChecked = false;
            }
            

        })
        
        return (e.sets[e.sets.length - 1].wonGames1 === 5 || e.sets[e.sets.length - 1].wonGames2 === 5) ? allChecked : false;
    }

    saveTourID(i, defaultTourID){
        let tourID = this.state.newTourID;
        if(!this.state.newTourID){
            tourID = defaultTourID;
        }
        console.log("saveTourID " + tourID);

        if(tourID[4] !== '-' || tourID[7] !== '-' || tourID[10] !== '-' || tourID[12] !== '-'){
            alert("Сохраняйте формат YYYY-MM-DD-T-GG")
        }else{
            axios.post('http://'+window.location.hostname+":9091/newTourID", {oldTourID:this.state.games[i].tourID, newTourID:tourID})
            .then(res => {
                this.props.socket.emit('getSets');
                this.props.component.remountSets()
            })
        }
    }

    editSet(i, j, name, value){
        console.log("edit set " + i + j + " ::: " + name + value)
        let newGames = this.state.games;

        newGames[i].sets[j][name] = value;
        newGames[i].sets[j].checked = false;

        this.setState({games:newGames})
    }

    saveSet(i, j){
        console.log("save set " + i + j)
        if(this.state.games[i].sets[j].comment){
            if(this.state.games[i].sets[j].comment.length > 0){
                this.props.socket.emit('saveSet', {set:this.state.games[i].sets[j]})
                this.setState({editing:false, setToEdit:[]})
            }
        }else{
            alert("Нету комментария")
        }
    }

    findRightColor(s){

        if(s.comment && !s.checked){
            return "rgba(0,255,255,0.5)";
        }else if(s.checked && !s.comment){
            return "rgba(0,255,0,0.5)" 
        }else if(!s.checked && !s.comment){
            return "rgba(255,0,0,0.5)"
        }else{
            return "linear-gradient(106.86deg, rgba(0, 255, 255, 0.5) 0%, rgba(0, 196, 0, 0.5) 100%)";
        }

    }

    makeRightWeight(set, sets, j, reverse){
        let weight = "normal";
        if(j > 0){
            if(reverse){
                if(sets[j-1].wonGames2 < set.wonGames2){
                    weight = "bold"
                }
                
            }else{
                if(sets[j-1].wonGames1 < set.wonGames1){
                    weight = "bold"
                }

            }

        }else{
            if(!reverse){
                if(set.wonGames1 > set.wonGames2){
                    weight = "bold"
                }
            }else{
                if(set.wonGames2 > set.wonGames1){
                    weight = "bold"
                }     

            }
        }

        return {fontWeight:weight}
    }

    render(){

        // console.log(this.state);

        return (

            <div className={styles.main}>
                <div className={styles.resultsText}>
                    <p>Результаты сетов</p>
                </div>
                {
                    this.state.loading ? "Загрузка..." :
                    this.state.games.map((e, i) => {

                        return(
                            <div>
                                <div style={{display:"flex", alignItems:"center"}}>
                                    <p style={{color:"red", fontSize:"25px"}}>{"ID игры: "}</p>
                                    <input style={{color:"red", fontSize:"25px", margin:"5px"}} type="text" placeholder="yyyy-mm-dd-t-gg" defaultValue={e.tourID} onChange={e => this.setState({newTourID:e.target.value})}/>
                                    <button className={styles.tourSave} onClick={() => this.saveTourID(i, e.tourID)}>Обновить</button>
                                </div>
                                {
                                    e.sets.map((s, j) => {
                                        console.log(this.state.games[i].sets[j])
                                        console.log(this.state.games[i].sets[j].checked, this.state.games[i].sets[j].comment !== "?")
                                        if(this.state.setToEdit[0] === i && this.state.setToEdit[1] === j && this.state.editing === true){
                                            return (
                                                <div className={styles.set}  style={{background: this.findRightColor(s)}}>
                                                    <div className={styles.info}>
                                                        <div>
                                                            <p>{j+1}</p>
                                                            <p>Выигрыши:</p>
                                                            <p>Очки:</p>
                                                        </div>
                                                        <div>
                                                            <p>{s.names ? s.names.player1 : "Игрок 1"}</p>
                                                            <input type="text" defaultValue={s.wonGames1} onChange={e => this.editSet(i, j, "wonGames1", e.target.value)} />
                                                            <input type="text" defaultValue={s.player1} onChange={e => this.editSet(i, j, "player1", e.target.value)} />
                                                        </div>
                                                        <div>
                                                            <p>{s.names ? s.names.player2 : "Игрок 1"}</p>
                                                            <input type="text" defaultValue={s.wonGames2} onChange={e => this.editSet(i, j, "wonGames2", e.target.value)} />
                                                            <input type="text" defaultValue={s.player2} onChange={e => this.editSet(i, j, "player2", e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <p style={{marginLeft:"10px"}}>{s.names ? s.names.judge: "Судья"}</p>

                                                    <p className={styles.commText}>Комментарий:</p>
                                                    <input className={styles.comm} type="text" value={this.state.games[i].sets[j].comment} onChange={e => this.editSet(i, j, "comment", e.target.value)}/>
                                                    <button className={styles.save} onClick={() => this.saveSet(i, j)}>Сохранить</button>
                                                    <button className={styles.cancel} onClick={() => this.setState({editing:false, setToEdit:[]})}>Отменить</button>
                                                    
                                                </div>
                                            );
                                        }else{
                                            return (
                                                <div className={styles.set}  style={{background:this.findRightColor(s) }}>
                                                    <div className={styles.info}>
                                                        <div>
                                                            <p>{j+1}</p>
                                                            <p>Выигрыши:</p>
                                                            <p>Очки:</p>
                                                        </div>
                                                        <div>
                                                            <p style={this.makeRightWeight(s, e.sets, j, false)}>{s.names ? s.names.player1 : "Игрок 1"}</p>
                                                            <p style={this.makeRightWeight(s, e.sets, j, false)}>{s.wonGames1}</p>
                                                            <p style={this.makeRightWeight(s, e.sets, j, false)}>{s.player1}</p>
                                                        </div>
                                                        <div>
                                                            <p style={this.makeRightWeight(s, e.sets, j, true)}>{s.names ? s.names.player2 : "Игрок 2"}</p>
                                                            <p style={this.makeRightWeight(s, e.sets, j, true)}>{s.wonGames2}</p>
                                                            <p style={this.makeRightWeight(s, e.sets, j, true)}>{s.player2}</p>
                                                        </div>
                                                    </div>
                                                    <p style={{marginLeft:"10px"}}>{s.names ? s.names.judge: "Судья"}</p>
    
                                                    <button style={{display: this.state.games[i].sets[j].checked ? 'none' : 'inline-block'}} className={styles.save} onClick={() => this.submitSet(i, j)}>Все правильно</button>
                                                    <button style={{display: this.state.games[i].sets[j].checked ? 'none' : 'inline-block'}} className={styles.change} disabled={this.state.editing} onClick={() => this.setState({editing:true, setToEdit:[i, j]})}>Исправить</button>
                                                    <button style={{opacity: this.state.games[i].sets[j].checked && this.state.games[i].sets[j].comment !== "?" ? '0'  : '1', backgroundColor:s.comment ? "#3ea1a0" : ""}} disabled={s.comment} className={styles.question}  onClick={() => this.editSet(i, j, "comment", "?")}>?</button>
                                                    
                                                </div>
                                            );
                                        }
                                    })

                                }
                                <div style={{display:(e.sets[e.sets.length -1].wonGames1 === 5 || e.sets[e.sets.length -1].wonGames2 === 5) ? 'block' : 'none'}}>
                                    <p className={styles.gameResult}>Результат: <b>{[e.sets[e.sets.length -1].wonGames1, e.sets[e.sets.length -1].wonGames2].join("-")}</b></p>
                                </div>
                                {this.allChecked(e) ? <button onClick={() => this.submitGame(e)} className={styles.submitGame}>Я проверил все</button> : ""}
                            </div>
                        );
                    })
                }

            </div>
        )
    }
}

export default Sets;