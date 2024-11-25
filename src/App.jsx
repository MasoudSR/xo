import { useState } from 'react';
import GameBoard from './components/GameBoard';
import MainMenu from './components/MainMenu';

function App() {

  const [gameMode, setGameMode] = useState("")
  const [sides, setSides] = useState({ player: "x", ai: "o" })
  const [connection, setConnection] = useState(null)
  const [playerNumber, setPlayerNumber] = useState(1)
  const [difficulty, setDifficulty] = useState("easy")


  if (!gameMode) {
    return <MainMenu setGameMode={setGameMode} sides={sides} setSides={setSides} connection={connection} setConnection={setConnection} setPlayerNumber={setPlayerNumber} difficulty={difficulty} setDifficulty={setDifficulty} />
  } else {
    return <GameBoard gameMode={gameMode} setGameMode={setGameMode} sides={sides} connection={connection} playerNumber={playerNumber} difficulty={difficulty} />
  }
}

export default App
