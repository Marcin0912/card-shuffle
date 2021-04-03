import React from "react";
// import ReactTooltip from "react-tooltip";
import Modal from "./components/modal";
import Player from "./components/player";
import Button from "./components/button";
import CardList from "./components/card-list";
import Settings from "./components/settings.js";
import PlayerInputForm from "./components/playerinputform";

import cardReducer from "./store/card-reducer";

import { v4 as uuid } from "uuid";
import shuffle from "lodash/shuffle";
import throttle from "lodash/throttle";
import { random, lightOrDark } from "./utils";

import "./App.css";

import shuffleDeck from "./assets/icons-ph-stack.svg";
import settingsIcon from "./assets/assets-btn-icon.svg";
import presenterIcon from "./assets/assets-btn-icon-presenter.svg";

function App() {
  const [state, dispatch] = React.useReducer(cardReducer, {
    players: [],
    isOpenClass: false,
    showRemove: false,
    presenter: false,
    animate: false,
    shouldRunAnimation: true,
    modal: { show: false, message: "" },
  });
  const {
    animate,
    players,
    isOpenClass,
    showRemove,
    presenter,
    shouldRunAnimation,
    modal,
  } = state;

  const handleAddPlayer = (event) => {
    event.preventDefault();
    if (event.target.elements.player.value === "") {
      return;
    }
    if (
      players.length &&
      findDuplicateName(event.target.elements.player.value)
    ) {
      dispatch({
        type: "SHOW_MODAL",
        payload: {
          message: `"${event.target.elements.player.value}" already exists.`,
          show: true,
        },
      });
      return;
    }
    const color = randomRgba();
    const textColor = lightOrDark(color) === "dark" ? "#f8f8ff" : "#212121";

    const newPlayer = {
      id: uuid(),
      name: event.target.elements.player.value.trim(),
      color: color,
      textColor: textColor,
    };
    dispatch({ type: "ANIMATE", payload: false });
    dispatch({ type: "ADD_PLAYER", payload: newPlayer });
    event.target.elements.player.value = "";
  };

  const findDuplicateName = (name) => {
    players.reduce((match, p) => {
      return p.name.toLowerCase().includes(name.trim().toLowerCase());
    }, 0);
  };

  const handleRemovePlayer = (id) => {
    dispatch({
      type: "REMOVE_PLAYER",
      payload: players.filter((player) => player.id !== id),
    });
    dispatch({
      type: "HIDE_TABS",
      payload: true,
    });
    dispatch({ type: "ANIMATE", payload: false });
  };
  const handleContinue = () => {
    dispatch({
      type: "HIDE_TABS",
      payload: true,
    });
    dispatch({ type: "ANIMATE", payload: false });
  };
  const reset = () => {
    dispatch({ type: "RESET_PLAYERS", payload: [] });
    dispatch({
      type: "HIDE_TABS",
      payload: true,
    });
  };
  const handlePresenterMode = () => {
    dispatch({ type: "PRESENTER_MODE", payload: !presenter });
    dispatch({ type: "ANIMATE", payload: false });
  };
  const shuffleCards = () => {
    if (!state.players.length) {
      return;
    }
    dispatch({ type: "ANIMATE", payload: true });
    const playersCopy = [...players];
    dispatch({
      type: "SHUFFLE_CARDS",
      payload: shuffle(playersCopy),
    });
    dispatch({
      type: "HIDE_TABS",
      payload: false,
    });
  };
  const toggleMenu = () => {
    dispatch({ type: "ANIMATE", payload: false });
    dispatch({ type: "MENU_OPEN", payload: !isOpenClass });
  };
  const randomRgba = () => {
    const o = Math.round;
    const r = random;
    return (
      "rgb(" + o(r(0, 255)) + "," + o(r(0, 255)) + "," + o(r(0, 255)) + ")"
    );
  };

  const playersList = players.map((player) => (
    <Player
      onRemove={handleRemovePlayer}
      id={player.id}
      key={player.id}
      name={player.name}
    />
  ));

  return (
    <div className="App">
      <Modal modal={modal} dispatch={dispatch} />
      <Settings
        closeMenu={toggleMenu}
        dispatch={dispatch}
        settingsState={state}
      />
      <div className="grid gap-4 grid-cols-3 h-full px-10 py-7">
        <div
          className={`
        EditView 
        relative 
        z-10 
        ${presenter && "presenter"}
        `}
        >
          <PlayerInputForm onAddPlayer={handleAddPlayer} />
          <div className="mt-2">
            <div className="grid grid-cols-2 gap-x-16 text-white font-bold text-left py-2 w-full">
              <div className="py-1 mt-3">NAME LIST</div>
              <Button
                onClick={reset}
                style={{ backgroundColor: "#0b0a0c" }}
                className="inline-block font-bold text-sm px-2 text-white rounded-full mt-4 ml-auto w-24 shadow-laura"
                type="submit"
              >
                Clear
              </Button>
            </div>
            <div
              className="py-5 rounded max-4 scroll max-h-96 overflow-auto scrollbar scrollbar-thin shadow-laura"
              style={{ backgroundColor: "#616062" }}
            >
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
          <Button
            className="ShuffleButton text-white font-bold  bg-white rounded uppercase shadow-laura"
            onClick={throttle(() => shuffleCards(), 4000)}
          >
            <img
              className="inline-block mr-3"
              src={shuffleDeck}
              alt="Shuffle Deck"
            />
            <div className="inline-block">Shuffle Cards</div>
          </Button>
          <Button
            data-tip={
              !presenter ? `Switch to Presenter Mode` : `Switch to Edit Mode`
            }
            className="inline-block SettingsIcon text-white rounded uppercase font-bold px-2"
            onClick={handlePresenterMode}
          >
            {/*<ReactTooltip />*/}
            <div>
              <img
                style={{ height: "65px", width: "65px" }}
                className="inline-block"
                src={presenterIcon}
                alt="Open Settings"
              />
            </div>
          </Button>
          <Button
            className="inline-block SettingsIcon text-white rounded uppercase font-bold px-2 pl-0"
            onClick={toggleMenu}
          >
            <img
              style={{ height: "65px", width: "65px" }}
              className="inline-block"
              src={settingsIcon}
              alt="Open Settings"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
