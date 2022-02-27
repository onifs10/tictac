import { useEffect, useState } from "react";
import { evaluate, PLAYER, OPPONENT, fireWorks, isMovesLeft } from "./gameLogic";
import './App.css'


function App() {

  return (
    <div className="App">
        <div className='title'>Tic-Tac-Toe</div>
        <TickTack/>
    </div>
  )
}

const TickTack = () => {
  const [player, setPlayer] = useState(1);
  const [done, setDone] = useState(false);
  const [gameResult, setResult] = useState("")
  const [gameState, setGameState] = useState([
    ["","",""],
    ["","",""],
    ["","",""]
  ]
  );
  
  const played = (id, string) => {
    const [row, col] = id.split('-').map(v => Number(v))    
    
    setGameState(v => {
      v[row][col] = string
      return v
    })

    const winState = evaluate(gameState);
    if (winState > 0) {
      setResult('player one won')
      setDone(v => !v)
      fireWorks()
    } else if (winState < 0) {
      setResult('player two won')
      setDone(v => !v)
      fireWorks()
    } else {
      if (!isMovesLeft(gameState)) {
        setResult('Draw')
        setDone(v => !v)
      }
    }
    
    if (player === 1) {
      setPlayer(2)
    } else {
      setPlayer(1)
    }
  }

  return <>
    <div className='tic_tac'
      style={{"--placeholder" : player === 1 ? `"${PLAYER}"` : `"${OPPONENT}"`}}
    >
      {
        gameState.map( (row, rowIndex )=> (
          row.map((col ,colIndex)=> (
            <Square
              player={player}
              tick={gameState[rowIndex][colIndex]}
              played={played}
              id={`${rowIndex}-${colIndex}`}
              key={`${rowIndex}-${colIndex}`} />)) 
        ))
      }
    </div>
    <div className="player">
      Player : {player}
    </div>
    <div className={`board ${done && 'show'}`}>
      <div className={`winner`}>
        {gameResult}
      </div>
      <button className="rst_btn" onClick={() => {
        setGameState([
              ["","",""],
              ["","",""],
              ["","",""]
        ])
        setDone(v => !v)
        setResult("")
        setPlayer(1)
          }}>  
            Restart
          </button>
    </div>
  </> 
}

const Square = ({id, player, played,tick}) => {
  const [ticked, setTicked] = useState(false);
  useEffect(() => {
    if (tick) {
        setTicked(v => !v);
    } else {
        setTicked(false);
    }
  },[tick])
  return (
    <button
      className={`square ${tick} ${!ticked ? "un_ticked" : "" }`}
      onClick={() => {
        if (ticked) {
          return
        }
        if (player == 1) {
          played?.(id, PLAYER)
        } else {
          played?.(id, OPPONENT)
        }
      }}
    >
      {ticked && tick}
    </button>
  )
}

export default App


