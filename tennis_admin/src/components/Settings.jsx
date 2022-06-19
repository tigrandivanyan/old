import React from 'react';
import styles from './style/settings.module.css';
import log from '../functions/log.js';

class Settings extends React.Component {

    state = {
        date:"",
        tour:"",
        game:"",
        tourID:""
    }

    changeTourID(e){
        this.setState({[e.target.name]:e.target.value})
    }

    saveTourID(){
        if(this.state.date.length > 0 && this.state.tour.length > 0 && this.state.game.length > 0){
            let {date, tour, game} = this.state;
            this.props.socket.emit('setTourID', {date, tour, game});
            console.log('New tour ID set ', [date, tour, game])
            this.props.component.remountSets()
        }else{
            alert("Не все поля заполнены")
        }
    }

    componentDidUpdate(){
        let comp = this.props.component;

        if(this.state.tourID !== comp.state.tourID && typeof comp.state.tourID === "string"){
            this.setState({tourID: comp.state.tourID}, () =>{

                let date = comp.state.tourID.substring(0, 10);
                let tour = parseInt(comp.state.tourID.substring(11, 12), 10).toString();
                let game = parseInt(comp.state.tourID.substring(13, 15), 10).toString();

                this.setState({tour, game, date})
            })

        }
    }



    render(){
        
        let comp = this.props.component;
        // console.log(this.state)

        if(!comp.state.tourID){
            console.log("tourID Error")
        }

        return(


            <div className={styles.settings}>
                <div className={styles.addContent}>
                    <div className={styles.textOnScreen}>
                        <p>Текст на экране судьи</p>
                        <textarea name="warningText" value={comp.state.warningText} onChange={e => comp.setState({[e.target.name]:e.target.value})}className={styles.warningText}></textarea>
                        <div>
                            <button onClick={() => comp.showWarning(true)} style={{backgroundColor:comp.state.shownText ? '#333' : '', color:comp.state.shownText ? '#999' : ''}}>Показать</button>
                            <button onClick={() => comp.showWarning(false)} style={{backgroundColor:!comp.state.shownText ? '#333' : '', color:!comp.state.shownText ? '#999' : ''}}>Скрыть</button>
                        </div>
                    </div>


                </div>
                <div className={styles.idSetting}>
                    <p className={styles.name}>Настройка ID игры</p>
                    <div className={styles.inputPlace}>
                        <p>Дата:</p>
                        <input type="date" name="date" onChange={e => this.changeTourID(e)} value={this.state.date} />
                    </div>
                    <div className={styles.inputPlace}>
                        <p>Турнир:</p>
                        <select name="tour" onChange={e => this.changeTourID(e)} value={this.state.tour}>
                            <option value="">Выбрать...</option>
                            <option value="1">01:00-09:00 (1)</option>
                            <option value="2">09:00-17:00 (2)</option>
                            <option value="3">17:00-01:00 (3)</option>
                        </select>
                    </div>
                    <div className={styles.inputPlace}>
                        <p>Игра:</p>
                        <select name="game" onChange={e => this.changeTourID(e)} value={this.state.game}>
                            <option value="">Выбрать...</option>
                            {
                                [...Array(30)].map((e, i) => {
                                    return <option value={i+1}>{i+1}</option>
                                })
                            }
                        </select>
                    </div>
                    <button onClick={() => this.saveTourID()}>Сохранить</button>
                </div>
                <p className={styles.noGameId} style={{display: comp.state.tourID ? "none" : "inline"}}>ID игры не указан</p>
            </div>
        );
    }
}

export default Settings;