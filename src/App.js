import React from "react";
import './App.css';
import ReactTooltip from 'react-tooltip';
import Button from "./components/button";
import PlayerInputForm from "./components/playerinputform";
import Player from "./components/player";
import { v4 as uuid} from "uuid";
import Settings from './components/settings.js';
import settingsIcon from "./assets/assets-btn-icon.svg";
import presenterIcon from "./assets/assets-btn-icon-presenter.svg";
import shuffleDeck from "./assets/icons-ph-stack.svg";
import cardReducer from "./card-reducer";
import throttle from "lodash/throttle";
import shuffle from "lodash/shuffle";
import {random, lightOrDark} from "./utils";
import CardList from "./components/card-list";
import Modal from "./components/modal";


function App() {
  const [state, updateState] = React.useReducer(cardReducer, {
    players: [],
    settingsMenu: false,
    showRemove: false,
    presenter: false,
    animate: false,
    shouldRunAnimation: true,
    modal: { show:false, message: ''}
  })
  const {animate, players, settingsMenu, showRemove, presenter, shouldRunAnimation, modal} = state;

  const handleAddPlayer = (event) => {
    event.preventDefault();
    if(event.target.elements.player.value === '') {
      return;
    }
    if (players.length && findDuplicateName(event.target.elements.player.value)) {
      updateState({
        type: 'SHOW_MODAL',
        payload: {
          message: `"${event.target.elements.player.value}" already exists.`,
          show: true}
      })
      // alert(`${event.target.elements.player.value} already exists`);
      return;
    }
    const color = randomRgba();
    let textColor = '#212121';
    if(lightOrDark(color) === 'dark') {
      textColor = '#f8f8ff';
    }
    const newPlayer = {
      id: uuid(),
      name: event.target.elements.player.value.trim(),
      color: color,
      textColor: textColor,
    }
    updateState({type: 'ANIMATE', payload: false});
    updateState({type: 'ADD_PLAYER', payload: newPlayer});
    event.target.elements.player.value = '';
  }

  const findDuplicateName = (name) => {
     return players.reduce((match, p) => {
       return  p.name.toLowerCase().includes(name.trim().toLowerCase());
    },0);
  }
  const handleRemovePlayer = (id) => {
    updateState({
      type: 'REMOVE_PLAYER',
      payload: players.filter(player =>  player.id !== id)
    });
    updateState({
        type: 'HIDE_TABS',
        payload: true
    });
    updateState({type: 'ANIMATE', payload: false});

  }
  const handleContinue = () => {
    updateState({
      type: 'HIDE_TABS',
      payload: true
    })
    updateState({type: 'ANIMATE', payload: false});
  }
  const reset = () => {
    updateState({type: 'RESET_PLAYERS', payload: []})
    updateState({
      type: 'HIDE_TABS',
      payload: true
    })
  }
  const handlePresenterMode = () => {
    updateState({type: 'PRESENTER_MODE', payload: !presenter});
    updateState({type: 'ANIMATE', payload: false});
  }
  const shuffleCards  = () => {
    if(!state.players.length) {
      return;
    }
    updateState({type: 'ANIMATE', payload: true});
    const playersCopy = [...players];
    updateState({
      type: 'SHUFFLE_CARDS',
      payload: shuffle(playersCopy)
    })
    updateState({
      type: 'HIDE_TABS',
      payload: false});
  }
  const toggleMenu = () => {
    updateState({type: 'ANIMATE', payload: false});
    updateState({type: 'MENU_OPEN', payload: !settingsMenu});
  }
  const randomRgba = () => {
    const o = Math.round, r = random;
    return 'rgb(' + o(r(0,255)) + ',' + o(r(0,255)) + ',' + o(r(0,255)) + ')';
  }


  const playersList = players.map(player => (
         <Player
         onRemove={() => handleRemovePlayer(player.id)}
         key={player.id}
         name={player.name}/>
         ));

  return (
    <div style={{backgroundColor: "#2e2d2e", height: "100vh"}} className="App">
      <Modal modal={modal} updateState={updateState}/>
      <Settings closeMenu={toggleMenu} updateState={updateState} settingsState={state}/>
      <div className="grid gap-4 grid-cols-3 h-full px-10 py-7">
        <div className="EditView relative z-10" style={{width: "56%", minWidth: '300px', opacity: !presenter ? 0.9 : 0}}>
          <PlayerInputForm onAddPlayer={handleAddPlayer}/>
          <div className="mt-2">
            <div className="grid grid-cols-2 gap-x-16 text-white font-bold text-left py-2 w-full">
              <div className="py-1 mt-3">
                NAME LIST
              </div>
              <Button onClick={reset} style={{backgroundColor: "#0b0a0c"}} className="inline-block font-bold text-sm px-2 text-white rounded-full mt-4 ml-auto w-24 shadow-laura" type="submit">Clear</Button>
            </div>
            <div className="py-5 rounded max-4 scroll max-h-96 overflow-auto scrollbar scrollbar-thin shadow-laura"  style={{backgroundColor:"#616062"}}>
              {playersList}
            </div>
            </div>
          </div>

        <div className="text-white font-extrabold relative w-3/4 h-full pt-80 mx-auto translate-x-11">
          <CardList
            players={players}
            showRemove={showRemove}
            handleContinue={handleContinue}
            handleRemovePlayer={handleRemovePlayer}
            animate={animate}
            shouldRunAnimation={shouldRunAnimation}
          />
        </div>
        <div className="ml-auto">
          <Button className="ShuffleButton text-white font-bold  bg-white rounded uppercase shadow-laura" onClick={throttle(() => shuffleCards(), 4000)}>
            <img className="inline-block mr-3" src={shuffleDeck} alt="Shuffle Deck"/>
            <div className="inline-block">Shuffle Cards</div>
          </Button>
          <Button data-tip={!presenter ? `Switch to Presenter Mode`: `Switch to Edit Mode`} className="inline-block SettingsIcon text-white rounded uppercase font-bold px-2" onClick={handlePresenterMode}>
            <ReactTooltip />
            <div >
            <img style={{height: "65px", width: "65px"}} className="inline-block" src={presenterIcon} alt="Open Settings"/>
            </div>
          </Button>
          <Button className="inline-block SettingsIcon text-white rounded uppercase font-bold px-2 pl-0" onClick={toggleMenu}>
              <img style={{height: "65px", width: "65px"}} className="inline-block" src={settingsIcon} alt="Open Settings"/>
          </Button>
        </div>
      </div>
    </div>
  );
}


export default App;
