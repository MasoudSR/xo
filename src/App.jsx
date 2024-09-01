import { useState } from 'react';
import GameBoard from './components/GameBoard';
import MainMenu from './components/MainMenu';

function App() {

  const [gameMode, setGameMode] = useState("")
  const [sides, setSides] = useState({ player: "x", ai: "o" })

  if (!gameMode) {
    return <MainMenu setGameMode={setGameMode} sides={sides} setSides={setSides} />
  } else {
    return <GameBoard gameMode={gameMode} setGameMode={setGameMode} sides={sides} />
  }
}

export default App
