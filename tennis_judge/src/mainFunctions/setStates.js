function deepEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }

  return true;
}

function isObject(object) {
  return object != null && typeof object === 'object';
}


export default function setStates(comp, newState, callback) {

  
  let oldState = comp.state;
  let anyChange = false;
  Object.entries(oldState).forEach((eOld, iOld) => {
    Object.entries(newState).forEach((eNew, iNew) => {
      if(eNew[0] === eOld[0]){
            // console.log(eOld,  eNew)
          }
            if(eOld[0] === eNew[0] && eOld[1] !== eNew[1]){
                if(typeof eNew[1] === 'object' && eNew[1] !== null){
                    if(typeof eOld[1] === 'object' && eOld[1] !== null){
                      // console.log(eOld[1], eNew[1], deepEqual(eOld[1], eNew[1]))
                        if(!deepEqual(eOld[1], eNew[1])){
                            anyChange = true;  
                        }
                    }else{
                        anyChange = true;

                    }
                }else{
                    anyChange = true;

                }
            }
        })
    })

    // console.log(comp.state, newState)
    if(anyChange){
        comp.setState(newState, ()=>{
            if(callback){
              callback(comp.state);
            }
        })
    }
}