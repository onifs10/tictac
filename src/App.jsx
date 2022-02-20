import { useState } from "react";
import './App.css'

function App() {

  return (
    <div className="App">
        <div className='title'>Tic-Tac-To</div>
        <TickTack/>
    </div>
  )
}

const TickTack = () => {
  const [player, setPlayer] = useState(1);

  const played = () => {
    if (player === 1) {
      setPlayer(2)
    } else {
      setPlayer(1)
    }
  }
  return <>
    <div className='tic_tac'
      style={{"--placeholder" : player === 1 ? `"X"` : `"O"`}}
    >
        <Square player={player} played={played} id={1}/>
        <Square player={player} played={played} id={2}/>
        <Square player={player} played={played} id={3}/>
        <Square player={player} played={played} id={4}/>
        <Square player={player} played={played} id={5}/>
        <Square player={player} played={played} id={6}/>
        <Square player={player} played={played} id={7}/>
        <Square player={player} played={played} id={8}/>
        <Square player={player} played={played} id={9}/>
    </div>
    <div className="player">
      Player : {player}
    </div>
  </> 
}

const Square = ({id, player, played}) => {
  const [tick, setTick] = useState('')
  const [ticked, setTicked] = useState(false);

  return (
    <button
      className={`square ${tick} ${!ticked ? "un_ticked" : "" }`}
      onClick={() => {
        if (ticked) {
          return
        }
        if (player == 1) {
          setTick("X")     
        } else {
          setTick("O")
        }
        setTicked(v => !v);
        played?.()
      }}
    >
      {ticked && tick}
    </button>
  )
}

export default App


