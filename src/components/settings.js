import React from "react";
import Button from "./button.js";
import SettingsCheckIcon from "../assets/settings-check.svg";
import PlayIcon from "../assets/icons-ph-monitor-play.svg";
import OffsetCheckboxIcon from "../assets/icons-ph-check-square-offset.svg"
import Switch from 'react-input-switch';

const Settings = ({closeMenu, settingsState, updateState}) => {

  const [mod, setMod] = React.useState(0);

  const {settingsMenu, shouldRunAnimation} = settingsState;
  const transform = settingsMenu ? 'open': '';

  const handleAnim = (value) => {

    updateState({type: 'SHOULD_ANIMATE', payload: value});
  }

  return (
    <div style={{background: "#616062"}}  className={`SettingsMenu p-10 h-full w-1/4 absolute right-0 z-10 ${transform}`}>
      <div className="flex justify-between">
      <div className="py-2.5 text-white text-4xl">Settings</div>
      <Button onClick={closeMenu} className="pointer-events font-extrabold text-white left-5 top-2 uppercase rounded">
        <img src={SettingsCheckIcon} alt="Settings close button" className="inline-block"/>
      </Button>
      </div>
      <div className="flex justify-start pt-16 pb-8">
        <div style={{color: '#212121'}} className="font-bold text-xl">FEATURES</div>
      </div>
      <div className="flex justify-between">
        <div>
          <img src={PlayIcon} alt="Offset checkbox icon" className="inline-block pr-2"/>
          <span className="text-white font-bold">Animate Cards</span>
        </div>
        <div className="pl-16"><Switch
          styles={{
            container: {
              width: '46px',
            },
            track: {
              backgroundColor: '#f0f0f0',
              width: '30px',
              height: '15px'
            },
            trackChecked: {
              backgroundColor: '#80bb41',
            },
            button: {
              backgroundColor: '#f0f0f0',
              top: '-2px',
              left: '-5px',
              height: '20px',
              width: '20px',
              boxShadow: '0px 0px 6px rgba(68, 68, 68, 0.3)',
            },
            buttonChecked: {
              backgroundColor: '#c5ff85',
              left: '20px'
            }
          }}
          on={true} off={false} value={shouldRunAnimation} onChange={handleAnim}/></div>
      </div>
      <div className="flex justify-between pt-6">
        <div>
          <img src={OffsetCheckboxIcon} alt="Offset checkbox icon" className="inline-block pr-2"/>
          <span className="text-white font-bold">Moderate Cards</span>
        </div>
        <div className="pl-16"><Switch
          styles={{
            container: {
              width: '46px',
            },
            track: {
              backgroundColor: '#f0f0f0',
              width: '30px',
              height: '15px'
            },
            trackChecked: {
              backgroundColor: '#80bb41',
            },
            button: {
              backgroundColor: '#f0f0f0',
              top: '-2px',
              left: '-5px',
              height: '20px',
              width: '20px',
              boxShadow: '0px 0px 6px rgba(68, 68, 68, 0.3)',
            },
            buttonChecked: {
              backgroundColor: '#c5ff85',
              left: '20px'
            }
          }}
          on="yes" off="no" value={mod} onChange={setMod}/></div>
      </div>
    </div>
  )
}

export default Settings;
