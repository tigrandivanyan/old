import React from 'react';
import axios from 'axios';
import sha1 from 'sha1';

class Root extends React.Component {

    state = {
        ips:[],
        tourIDtoUncheck:"",
        registered:false
    }


    componentDidMount(){

        

        this.props.socket.on("setIps", ips => {
            console.log(ips)
            this.setState({ips})
        })
    }

    submit(){
        if(sha1(this.state.password) === "3357229dddc9963302283f4d4863a74f310c9e80"){
        this.setState({
            registered:true
        })
        }else{
            alert("Неа");
            this.setState({password:""})
        }
    }

    refreshTennis(){
        let sure = window.confirm("​Нажимая на кнопку подтверждения вы подтверждаете что вы знаете о последствиях");

        if(sure){
            this.props.socket.emit('refresh');
        }
    }

    unCheckSets(){
        axios.post('http://' + window.location.hostname +':9091/unCheckSets', {tourID:this.state.tourIDtoUncheck})
        .then(res => {
            this.props.socket.emit('getSets')
            console.log(res)
        })
    }

    deleteSets(){
        axios.post('http://' + window.location.hostname +':9091/deleteSets', {tourID:this.state.tourIDtoUncheck})
        .then(res => {
            this.props.socket.emit('getSets');
            console.log(res)
        })
    }

    render(){

        return(

            <div>
                <div className="password" style={{display: this.state.registered ? 'none' : 'flex'}}>
                    <p>Пароль:</p>
                    <input type="password" onChange={e => this.setState({password: e.target.value})} value={this.state.password}/>
                    <button onClick={() => this.submit()}>Войти</button>
                </div>
                <div style={{display: this.state.registered ? 'block' : 'none'}}>
                    <input style={{width:"300px", fontSize:"25px", margin:"5px"}} type="text" placeholder="tourID для взаимодействия" onChange={e => this.setState({tourIDtoUncheck:e.target.value})} />
                    <button style={{fontSize:"25px", margin:"5px"}} onClick={() => this.unCheckSets()}>Вернуть в админку</button>
                    <button style={{fontSize:"25px", margin:"5px"}} onClick={() => this.deleteSets()}>Удалить из базы</button>
                    <button style={{backgroundColor:"red", cursor:"pointer", fontSize:"25px", margin:"15px"}} onClick={() => this.refreshTennis()}>Обновить</button>
                    <p>IP подключенных устройств</p>
                    {
                        this.state.ips.length > 0 ?

                            this.state.ips.map(ip => {
                                return <p>{ip.ip}</p>
                            })
                        :

                            "-"
                    }
                    {/* <div className={styles.configs}>
                        <div className={styles.block}>
                            <p>Блокировка</p>
                            <input type="checkbox" name="block" checked={comp.state.block} onChange={e => comp.changeConfig(e)}/>
                        </div>
                    </div> */}
                    <br />
                </div>
            </div>
        );
    }
}

export default Root;