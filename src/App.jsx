import { useEffect, useState } from "react";
import { evaluate, PLAYER, OPPONENT, fireWorks, isMovesLeft, findBestMove } from "./gameLogic";
import './App.css'


function App() {
    const [computer, setComputer] = useState(false);
    const [start, setStart]  = useState(false);
    const startGame = (v) => {
        setComputer(v)
        setStart(v => !v);
    }
    const endGame = () => {
        setComputer(false);
        setStart(false);
    }
    return (
        <div className="App">
            <GameInitScreen gameState={start} startGame={startGame}/>
            <div className='title'>Tic-Tac-Toe</div>
            <TickTack endGame={endGame} started={start} computer={computer}/>
        </div>
    )
}


const GameInitScreen = ({gameState, startGame}) => {
    return (
        <section id="gstart" className={`${!gameState && "show"}`}>
            <div className="modal">
                <div className="prompt">
                    Select game mode
                </div>
                <div className="actions">
                    <button onClick={() => {
                        startGame(true);
                    }}>
                        Single Player 
                    </button>
                    <button onClick={() => {
                        startGame(false);
                    }}>
                        Multi-Player 
                    </button>
                </div>     
            </div>
       </section>
    )
}

const TickTack = ({started, endGame, computer}) => {
    const [player, setPlayer] = useState(1);
    const [done, setDone] = useState(false);
    const [fireworks, setFireWorks] = useState({});
    const [gameResult, setResult] = useState("");
    const [gameState, setGameState] = useState([
    ["","",""],
    ["","",""],
    ["","",""]
    ]);
    const [loading, setLoading] = useState(false);
  
    const played = (id, string) => {
        if(loading){
            return;
        } 
        const [row, col] = id.split('-').map(v => Number(v))    
        
        setGameState(v => {
          v[row][col] = string
          return v
        })
        const winState = evaluate(gameState);
        if (winState > 0) {
          setResult('player one won')
          setDone(v => !v)
          setFireWorks(fireWorks())
          return
        } else if (winState < 0) {
          setResult('player two won')
          setDone(v => !v)
          setFireWorks(fireWorks())
          return
        } else {
          if (!isMovesLeft(gameState)) {
            setResult('Draw')
            setDone(v => !v)
            return
          }
        }
        
        if (player === 1) {
            if(computer){
                // initial computer logic
                setLoading(true);
                console.table([...gameState])
                computerTurn([...gameState])
            }else{
                setPlayer(2)
            }
        } else {
          setPlayer(1)
        }
    }
    const computerTurn = (gameState) => {
        setTimeout( () => { 
            const bestMove = findBestMove([...gameState.map(v => [...v])]);
            setGameState(state => {
                state[bestMove.row][bestMove.col] = OPPONENT;
                console.table([...state])
                return state
            })
        const winState = evaluate(gameState);
        if (winState > 0) {
          setResult('player one won')
          setDone(v => !v)
          setFireWorks(fireWorks())
          setLoading(false)
          return
        } else if (winState < 0) {
          setResult('Computer won')
          setDone(v => !v)
          setFireWorks(fireWorks())
          setLoading(false)
          return
        } else {
          if (!isMovesLeft(gameState)) {
            setResult('Draw')
            setDone(v => !v)
            setLoading(false)
            return
          }
        }
        setLoading(false)
        }, 200)
        
    } 
  return <>
    <div className='tic_tac'
      style={{"--placeholder" : player === 1 ? `"${PLAYER}"` : `"${OPPONENT}"`}}
    >
      {
        gameState.map( (row, rowIndex )=> (
          row.map((v,colIndex)=> (
            <Square
              player={player}
            
              tick={v}
              played={played}
              id={`${rowIndex}-${colIndex}`}
              key={`${rowIndex}-${colIndex}`} />)) 
        ))
      }
        </div>
        {(started && !computer) && (
            <div className="player">
                Player : {player}
            </div>)
        }
        {(started && computer) && (
            <div className="player">
                {loading ? "Computer" : "Player" }
            </div>)
        }
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
        endGame();
        setPlayer(1)
        fireworks.stop?.()
        setFireWorks({})
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


