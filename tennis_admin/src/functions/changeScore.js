function changeScore(comp, count, name, match){
    count = count ? 1 : -1;
    if(comp.state[name] + count >= 0){
        if(match){
            comp.setState({[name]:comp.state[name] + count}, () => {
                comp.setState({
                    player1:comp.state.player2,
                    player2:comp.state.player1,
                    wonGames1:comp.state.wonGames2,
                    wonGames2:comp.state.wonGames1,
                    names:{
                        player1:comp.state.names.player2,
                        player2:comp.state.names.player1,
                        judge:comp.state.names.judge
                    }
                })
            })
        }else{
            comp.setState({[name]:comp.state[name] + count})
        }
    }
}

export default changeScore;