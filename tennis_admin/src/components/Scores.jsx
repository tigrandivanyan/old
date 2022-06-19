import React from 'react';
import rightPlayer from '../functions/rightPlayer'
import changeScore from '../functions/changeScore';
import setScores from '../functions/setScores';
import styles from './style/scores.module.css';

let bigLeft, bigRight, smallLeft, smallRight;

class Scores extends React.Component {


    render(){

        let comp = this.props.component;

        bigLeft = rightPlayer("big", "left", comp.state);
        bigRight = rightPlayer("big", "right", comp.state);
        smallLeft = rightPlayer("small", "left", comp.state);
        smallRight = rightPlayer("small", "right", comp.state);

        return(

            <div style = {{backgroundColor:comp.state.bodyBack}} className={styles.main}>

                <div className={styles.sets}>
                    <div className={styles.setsLeft}>
                        <h1 className={styles.sets_leftNum}>{comp.state[bigLeft]}</h1>
                        <div className={styles.add} style={comp.showOnEdit()} onClick={() => changeScore(comp, true, bigLeft)}>+</div>
                        <div className={styles.substract} style={comp.showOnEdit()} onClick={() => changeScore(comp, false, bigLeft)}>-</div>
                    </div>
                    <div className={styles.setsRight}>
                        <h1 className={styles.sets_rightNum}>{comp.state[bigRight]}</h1>
                        <div className={styles.add} style={comp.showOnEdit()} onClick={() => changeScore(comp, true, bigRight)}>+</div>
                        <div className={styles.substract} style={comp.showOnEdit()} onClick={() => changeScore(comp, false, bigRight)}>-</div>
                    </div>
                </div>
                
                <div className={styles.matches}>
                    <div className={styles.matchesLeft}>
                        <p className={styles.matches_leftNum}>{comp.state[smallLeft]}</p>
                        <div className={styles.add} style={comp.showOnEdit()} onClick={() => changeScore(comp, true, smallLeft, true)}>+</div>
                        <div className={styles.substract} style={comp.showOnEdit()} onClick={() => changeScore(comp, false, smallLeft, true)}>-</div>
                    </div>
                    <div className={styles.matchesRight}>
                        <p className={styles.matches_rightNum}>{comp.state[smallRight]}</p>
                        <div className={styles.add} style={comp.showOnEdit()} onClick={() => changeScore(comp, true, smallRight, true)}>+</div>
                        <div className={styles.substract} style={comp.showOnEdit()} onClick={() => changeScore(comp, false, smallRight, true)}>-</div>
                    </div>
                </div>

                <div className={styles.names}>
                    <input type="text" disabled={!comp.state.editing} name={"names_" + bigLeft} value={comp.state.names[bigLeft]} onChange={e => setScores(e, comp)}/>
                    <input type="text" disabled={!comp.state.editing} name={"names_" + bigRight} value={comp.state.names[bigRight]} onChange={e => setScores(e, comp)}/>
                </div>

                <div className={styles.internetAlert} style={{display:comp.state.internetAlert.length > 0 ? "flex" : "none", color:comp.state.internetColor, backgroundColor:comp.state.internetBack}}>
                    <p>{comp.state.internetAlert}</p>
                </div>
                
                <div className={styles.buttons}>
                    <div onClick={() => comp.submit()} style={{display: comp.state.editing ? 'flex' : 'none', backgroundColor:"green"}}>Сохранить</div>
                    <div onClick={() => comp.setState({editing:!comp.state.editing, canceled:comp.state.editing})} style={{backgroundColor: comp.state.editing ? 'red' : "black"}}>{comp.state.editing ? "Отмена" : "Редактировать"}</div>
                </div>
            </div>
        );
    }

}

export default Scores;