export default function changeOnEdit(component, hide, color){
    let shown = hide ? component.state.editing ? "none" : "block" : component.state.editing ? "block" : "none";

    return {display:shown, borderLeftColor:color, borderRightColor:color}
  }