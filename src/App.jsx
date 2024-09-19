import { useState } from 'react';
import GameBoard from './components/GameBoard';
import MainMenu from './components/MainMenu';

function App() {

  const [gameMode, setGameMode] = useState("")
  const [sides, setSides] = useState({ player: "x", ai: "o" })
  const [connection, setConnection] = useState(null)
  const [playerNumber, setPlayerNumber] = useState(1)


  if (!gameMode) {
    return <MainMenu setGameMode={setGameMode} sides={sides} setSides={setSides} setConnection={setConnection} setPlayerNumber={setPlayerNumber} />
  } else {
    return <GameBoard gameMode={gameMode} setGameMode={setGameMode} sides={sides} connection={connection} playerNumber={playerNumber} />
  }
}

export default App
