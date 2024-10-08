import { IoMdSettings } from 'react-icons/io'
import Tile from './modules/Tile'
import { useEffect, useState } from 'react'
import { winnerCalc, winnerDirection } from '../helpers/winnerCalc'
import XIcon from './modules/XIcon';
import OIcon from './modules/OIcon';
import Modal from './Modal';
import Settings from './Settings';
import GameResults from './GameResults';
import { bestMove } from '../helpers/ai';
import toast from 'react-hot-toast';
import Chat from './Chat';

function GameBoard({ gameMode, setGameMode, sides, connection, playerNumber }) {

    const [tilesValue, setTilesValue] = useState(Array(9).fill(""))
    const [xIsNext, setXIsNext] = useState(true)
    const [scoreBoard, setScoreBoard] = useState({ x: 0, o: 0 })
    const [gameStarted, setGameStarted] = useState(true)
    const [isQuit, setIsQuit] = useState(false)
    const [settingsMenu, setSettingsMenu] = useState(false)
    const [showGameResults, setShowGameResults] = useState(false)
    const [playerTurn, setPlayerTurn] = useState(true)
    const [lineDirection, setLineDirection] = useState("");
    const [playersName, setPlayersName] = useState({ player1: { name: "Player1", symbol: "x" }, player2: { name: "Player2", symbol: "o" } })
    const [showChats, setShowChats] = useState(false)
    const [chats, setChats] = useState([])
    const [chatInputText, setChatInputText] = useState("")
    const [isNewChat, setIsNewChat] = useState(false)


    useEffect(() => {
        sides.player === "o" && setPlayerTurn(false)
        if (gameMode === "ai") {
            if (sides.player === "x") { setPlayersName({ player1: { name: "Player", symbol: "x" }, player2: { name: "AI", symbol: "o" } }) } else {
                setPlayersName({ player1: { name: "AI", symbol: "x" }, player2: { name: "Player", symbol: "o" } })
            }
        }
        if (playerNumber === 2) {
            setPlayerTurn(false)
        }

        if (gameMode === "online") {
            window.addEventListener("beforeunload", () => {
                if (connection && connection.open) {
                    connection.send("quit");
                    connection.close();
                }
            });
        }
    }, [])


    useEffect(() => {
        if (connection) {
            connection.on('data', (data) => {
                if (data === "quit") {
                    connection.close();
                    setGameMode("")
                    setTimeout(() => {
                        toast("Your friend left the game!", { icon: "😢", duration: 5000 })
                    }, 1000);
                } else if (data.dataType === "chatData") {
                    setChats(prev => [...prev, data.chatData])
                    setIsNewChat(true)
                } else if (data.dataType === "tilesData") {
                    setTilesValue(data.tilesData);
                    setPlayerTurn(true)
                    setXIsNext((prevXIsNext) => !prevXIsNext);
                }
            })
        }
    }, [connection]);

    useEffect(() => {
        if (showChats) {
            setIsNewChat(false)
        }
    }, [isNewChat])


    const quit = () => {
        setSettingsMenu(false)
        setShowGameResults(false)
        setIsQuit(true)
        if (gameMode === "online") {
            if (connection && connection.open) {
                connection.send("quit");
                connection.close();
            }
        }
        setTimeout(() => {
            setGameMode("")
        }, 300);
    }

    const clickHandler = (i) => {
        if (playerTurn) {

            if (tilesValue[i] || winnerCalc(tilesValue)) {
                return
            }
            const newTilesValue = tilesValue.slice()
            if (gameMode === "ai") {
                newTilesValue[i] = sides.player
            } else if (gameMode === "online") {
                playerNumber === 1 ? newTilesValue[i] = "x" : newTilesValue[i] = "o"
            } else {
                xIsNext ? newTilesValue[i] = "x" : newTilesValue[i] = "o"
            }
            setTilesValue(newTilesValue)
            setXIsNext(!xIsNext)

            gameMode !== "local" && setPlayerTurn(false)

            if (gameMode === "online") {
                if (connection) {
                    const data = { dataType: "tilesData", tilesData: newTilesValue }
                    connection.send(data);
                }

            }
        }
    }

    const sendChat = () => {
        if (connection) {
            const data = { dataType: "chatData", chatData: { playerNumber: playerNumber, text: chatInputText } }
            setChats(prev => [...prev, data.chatData])
            connection.send(data)
            setChatInputText("")
        }
    }

    const winner = winnerCalc(tilesValue)
    if (gameMode === "ai" && !winner && !playerTurn) {
        const newTilesValue = tilesValue.slice()
        if (!winnerCalc(newTilesValue) && newTilesValue.some(tile => tile === "")) {
            const aiMove = bestMove(tilesValue, sides);
            newTilesValue[aiMove] = sides.ai;
            setTilesValue(newTilesValue);
            setXIsNext(!xIsNext)
        }
        setPlayerTurn(true)
    }


    if (winner && gameStarted) {
        const newScoreBoard = { ...scoreBoard, [winner]: scoreBoard[winner] + 1 }
        setScoreBoard(newScoreBoard)
        setGameStarted(false)
        if (winner === "draw") {
            setTimeout(() => {
                setShowGameResults(true)
            }, 400);
        } else {
            const winnerLine = winnerDirection(tilesValue)
            setLineDirection(winnerLine)
            setTimeout(() => {
                setShowGameResults(true)
            }, 1500);
        }
    }

    const restartGame = () => {
        setTilesValue(Array(9).fill(""))
        setGameStarted(true)
        setLineDirection()
    }

    return (
        <div className={`transition-all duration-300 ${isQuit && "scale-0"}`}>
            <div className='grid grid-cols-3 items-center justify-items-center animate-fade-down animate-duration-500'>
                <div className={`transition-all duration-500 relative w-20 h-24 flex flex-col justify-center items-center ${xIsNext ? "scale-110 opacity-100" : "scale-90 opacity-40"}`}>
                    <XIcon size={50} />
                    <p className='text-blue-900'>
                        {playersName.player1.name}
                    </p>
                    <div className='w-20 h-7 bg-blue-500 blur-lg rounded-full absolute bottom-0 left-0 z-0'></div>
                </div>
                <div className='bg-white py-1 px-1 flex drop-shadow-md rounded-full overflow-hidden'>
                    <div className='border-r px-3'>{scoreBoard.x}</div>
                    <div className='px-3'>{scoreBoard.o}</div>
                </div>
                <div className={`transition-all duration-500 relative w-20 h-24 flex flex-col justify-center items-center ${!xIsNext ? "scale-110 opacity-100" : "scale-90 opacity-40"}`}>
                    <OIcon size={50} />
                    <div className='w-20 h-7 bg-orange-500 blur-lg rounded-full absolute bottom-0 left-0 z-0'></div>
                    <p className='text-orange-900'>
                        {playersName.player2.name}
                    </p>
                </div>
            </div>
            <div className='bg-white relative drop-shadow-md p-4 mt-3 rounded-xl animate-fade'>
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
                    <div
                        className={`absolute h-0 w-0 ${lineDirection === 'vertical' ? 'transition-height-width duration-500 h-[calc(100%-32px)] w-[2px] left-1/2' : ''} ${lineDirection === 'horizontal' ? 'transition-height-width duration-500 w-[calc(100%-32px)] h-[2px] top-1/2' : ''} ${lineDirection === 'diagonal1' ? 'transition-height-width duration-500 w-[calc(125%)] h-[2px] top-4 left-4 rotate-45 origin-top-left' : ''} ${lineDirection === 'diagonal2' ? 'transition-height-width duration-500 w-[calc(125%)] h-[2px] bottom-4 left-4 -rotate-45 origin-top-left' : ''} ${lineDirection === 'top' ? 'transition-height-width duration-500 w-[calc(100%-32px)] h-[2px] top-14' : ''} ${lineDirection === 'bottom' ? 'transition-height-width duration-500 w-[calc(100%-32px)] h-[2px] bottom-14' : ''} ${lineDirection === 'left' ? 'transition-height-width duration-500 h-[calc(100%-32px)] w-[2px] left-14' : ''} ${lineDirection === 'right' ? 'transition-height-width duration-500 h-[calc(100%-32px)] w-[2px] right-14' : ''} bg-black`}
                    ></div>
                </div>
            </div>
            <div className={`flex mt-14 justify-center`}>
                <button className="drop-shadow-md rounded-full overflow-hidden h-10 transition-all duration-300 flex justify-center items-center bg-white w-10" onClick={() => setSettingsMenu(true)}><IoMdSettings size={20} color='#4281f8' /></button>
            </div>
            {gameMode === "online" &&
                <div className=''>
                    <Chat showChats={showChats} setShowChats={setShowChats} sendChat={sendChat} chats={chats} chatInputText={chatInputText} setChatInputText={setChatInputText} setIsNewChat={setIsNewChat} />
                    {isNewChat &&
                        <div>
                            <div className="bg-orange-500 w-3 h-3 fixed bottom-20 left-10 rounded-full"></div>
                            <div className="bg-orange-500 w-3 h-3 fixed bottom-20 left-10 rounded-full animate-ping"></div>
                        </div>
                    }
                </div>
            }
            {settingsMenu && <Modal ModalContent={<Settings quit={quit} setSettingsMenu={setSettingsMenu} />} />}
            {showGameResults && <Modal ModalContent={<GameResults quit={quit} setShowGameResults={setShowGameResults} winner={winner} playersName={playersName} restartGame={restartGame} scoreBoard={scoreBoard} />} />}
        </div>
    )
}

export default GameBoard