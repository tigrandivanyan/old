function setScores(e, comp){
    if(e.target.name.slice(0, -8) === 'names'){
        let names = comp.state.names;
        let player = e.target.name.slice(6);

        names[player] = e.target.value;

        comp.setState({names:names});
    }else{
        if(isNaN(parseInt(e.target.value))){
            alert("Нужно ввести число")
        }else{
            comp.setState({[e.target.name]:parseInt(e.target.value)});
        }
    }
}

export default setScores;