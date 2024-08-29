import { useState } from 'react';
import GameBoard from './components/GameBoard';
import MainMenu from './components/MainMenu';

function App() {

  const [gameMode, setGameMode] = useState("")

  if (!gameMode) {
    return <MainMenu setGameMode={setGameMode} />
  }else{
    return <GameBoard gameMode={gameMode} setGameMode={setGameMode} />
  }
}

export default App
