import { IoMdSettings } from 'react-icons/io'
import Tile from './modules/Tile'
import { useEffect, useState } from 'react'
import { winnerCalc } from '../helpers/winnerCalc'
import XIcon from './modules/XIcon';
import OIcon from './modules/OIcon';
import Modal from './Modal';
import Settings from './Settings';
import GameResults from './GameResults';
import { bestMove } from '../helpers/ai';

function GameBoard({ gameMode, setGameMode, sides }) {

    const [tilesValue, setTilesValue] = useState(Array(9).fill(""))
    const [xIsNext, setXIsNext] = useState(true)
    const [scoreBoard, setScoreBoard] = useState({ x: 0, o: 0 })
    const [gameStarted, setGameStarted] = useState(true)
    const [isQuit, setIsQuit] = useState(false)
    const [settingsMenu, setSettingsMenu] = useState(false)
    const [showGameResults, setShowGameResults] = useState(false)
    const [aiTurn, setAiTurn] = useState(false)

    useEffect(() => {
        sides.player === "o" && setAiTurn(true)
    }, [])


    const quit = () => {
        setSettingsMenu(false)
        setShowGameResults(false)
        setIsQuit(true)
        setTimeout(() => {
            setGameMode("")
        }, 300);
    }

    const clickHandler = (i) => {
        if (tilesValue[i] || winnerCalc(tilesValue)) {
            return
        }
        const newTilesValue = tilesValue.slice()
        if (gameMode === "ai") {
            newTilesValue[i] = sides.player
        } else {
            xIsNext ? newTilesValue[i] = "x" : newTilesValue[i] = "o"
        }
        setTilesValue(newTilesValue)
        setXIsNext(!xIsNext)
        setAiTurn(true)

    }

    const winner = winnerCalc(tilesValue)
    if (gameMode === "ai" && !winner && aiTurn) {
        const newTilesValue = tilesValue.slice()
        if (!winnerCalc(newTilesValue) && newTilesValue.some(tile => tile === "")) {
            const aiMove = bestMove(tilesValue, sides);
            newTilesValue[aiMove] = sides.ai;
            setTilesValue(newTilesValue);
            setXIsNext(!xIsNext)
        }
        setAiTurn(false)
    }


    if (winner && gameStarted) {
        const newScoreBoard = { ...scoreBoard, [winner]: scoreBoard[winner] + 1 }
        setScoreBoard(newScoreBoard)
        setGameStarted(false)
        setShowGameResults(true)
    }

    const restartGame = () => {
        setTilesValue(Array(9).fill(""))
        setGameStarted(true)
    }

    return (
        <div className={`transition-all duration-300 ${isQuit && "scale-0"}`}>
            <div className='grid grid-cols-3 items-center justify-items-center animate-fade-down animate-duration-500'>
                <div className={`transition-all duration-500 relative w-20 h-24 ${xIsNext ? "scale-110 opacity-100" : "scale-90 opacity-40"}`}>
                    <XIcon size={50} />
                    <div className='w-20 h-7 bg-blue-500 blur-lg rounded-full absolute bottom-0 left-0 z-0'></div>
                    <p>Player1</p>
                </div>
                <div className='bg-white drop-shadow-md py-1 px-3 rounded-full'>
                    {scoreBoard.x} - {scoreBoard.o}
                </div>
                <div className={`transition-all duration-500 relative w-20 h-24 ${!xIsNext ? "scale-110 opacity-100" : "scale-90 opacity-40"}`}>
                    <OIcon size={50} />
                    <div className='w-20 h-7 bg-orange-500 blur-lg rounded-full absolute bottom-0 left-0 z-0'></div>
                    <p>Player2</p>
                </div>
            </div>
            <div className='bg-white drop-shadow-md p-4 mt-3 rounded-xl animate-fade'>
                <div className='bg-slate-200 grid grid-rows-3 grid-cols-3 gap-[1px]'>
                    <Tile value={tilesValue[0]} onTileClick={() => clickHandler(0)} />
                    <Tile value={tilesValue[1]} onTileClick={() => clickHandler(1)} />
                    <Tile value={tilesValue[2]} onTileClick={() => clickHandler(2)} />
                    <Tile value={tilesValue[3]} onTileClick={() => clickHandler(3)} />
                    <Tile value={tilesValue[4]} onTileClick={() => clickHandler(4)} />
                    <Tile value={tilesValue[5]} onTileClick={() => clickHandler(5)} />
                    <Tile value={tilesValue[6]} onTileClick={() => clickHandler(6)} />
                    <Tile value={tilesValue[7]} onTileClick={() => clickHandler(7)} />
                    <Tile value={tilesValue[8]} onTileClick={() => clickHandler(8)} />
                </div>
            </div>
            <div className='animate-fade-up animate-duration-500'>
                <button className="m-auto mt-14 drop-shadow-md rounded-full overflow-hidden h-8 transition-all duration-300 flex justify-center items-center bg-white w-8" onClick={() => setSettingsMenu(true)}><IoMdSettings size={20} color='#4281f8' /></button>
            </div>
            {settingsMenu && <Modal ModalContent={<Settings quit={quit} setSettingsMenu={setSettingsMenu} />} />}
            {showGameResults && <Modal ModalContent={<GameResults quit={quit} setShowGameResults={setShowGameResults} winner={winner} restartGame={restartGame} />} />}
        </div>
    )
}

export default GameBoard