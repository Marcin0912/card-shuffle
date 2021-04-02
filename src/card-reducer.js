const cardReducer = (state, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'ADD_PLAYER':
      return {...state, players: [...state.players,  payload]}
    case 'REMOVE_PLAYER':
       return {...state, players: payload}
    case 'RESET_PLAYERS':
      return {...state, players: payload}
    case 'SHUFFLE_CARDS':
      return {...state, players: payload}
    case 'HIDE_TABS':
      return {...state, showRemove: payload}
    case 'PRESENTER_MODE':
      return {...state, presenter: payload}
    case 'MENU_OPEN':
      return {...state, settingsMenu: payload}
    case 'ANIMATE':
      return {...state, animate: payload}
    case 'SHOULD_ANIMATE':
       return {...state, shouldRunAnimation: payload}
    case 'SHOW_MODAL':
       return {...state, modal: payload}
    default:
      throw new Error(`Incorrect action ${action.type}`);
  }
}

export default cardReducer;
