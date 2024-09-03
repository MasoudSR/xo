import { useState } from "react"
import XIcon from "./modules/XIcon";
import OIcon from "./modules/OIcon";

function GameResults({ quit, setShowGameResults, winner, playersName, restartGame, scoreBoard }) {

    const [isClosed, setIsClosed] = useState(false)

    const exitGameResults = () => {
        setIsClosed(true)
        setTimeout(() => {
            setShowGameResults(false)
            restartGame()
        }, 300);
    }
    return (
        <div className={`w-80 bg-white drop-shadow-md rounded-3xl flex flex-col items-center ${isClosed && "animate-jump-out"}`}>
            {/* <div className="bg-slate-300 h-10 flex justify-center items-center border rounded-t-xl border-slate-400 drop-shadow-md">Results</div> */}
            <div className="-translate-y-[60%] flex items-center justify-center flex-col">
                <div className={`w-full h-[50%]  blur-2xl rounded-full absolute top-[50%] right-0 ${winner === "draw" ? "bg-slate-500" : winner === "x" ? "bg-blue-500" : "bg-orange-500"}`}></div>
                {winner === "x" && <XIcon size={150} />}
                {winner === "o" && <OIcon size={150} />}
                {winner === "draw" && <div className="text-[80px] font-extrabold">DRAW!</div>}
                {winner !== "draw" &&
                    <p className="-translate-y-[160%] text-xl bg-white px-5 py-1 rounded-lg drop-shadow-lg">
                        {playersName.player1.symbol === winner ? `${playersName.player1.name} Wins` : `${playersName.player2.name} Wins`}
                    </p>
                }
            </div>
            <div className="flex w-full justify-center items-center -translate-y-full">
                <div className="translate-x-5 z-10">

                    <XIcon size={50} />
                </div>
                <div className='bg-white w-[50%] py-3 px-5 flex drop-shadow-md rounded-full justify-center font-bold text-3xl overflow-hidden'>
                    <div className='border-r w-full text-center flex justify-center items-center'>{scoreBoard.x}</div>
                    <div className='w-full text-center'>{scoreBoard.o}</div>
                </div>
                <div className="-translate-x-5">
                    <OIcon size={55} />
                </div>
            </div>
            {/* <div>
                    <div className={`transition-all duration-500 relative w-20 h-24`}>
                        <div className="-translate-x-9 absolute z-0 opacity-60">
                            {winner === "x" && <XIcon size={150} />}
                            {winner === "o" && <OIcon size={150} />}
                        </div>
                        <div className={`w-32 h-32 mt-6 blur-lg rounded-full ${winner === "draw" ? "bg-slate-300" : winner === "x" ? "bg-blue-400" : "bg-orange-200"}`}></div>
                        <p className="absolute z-10 top-3 left-3">
                            {winner === "draw" ? "Draw" : winner}
                        </p>
                    </div>
                </div> */}
            <div className="flex flex-col gap-3 p-3 w-full">
                <button className="drop-shadow-md rounded-full overflow-hidden h-9 w-full transition-all duration-300 flex justify-center items-center bg-sky-500 text-white" onClick={exitGameResults}>Continue Playing</button>
                <button className="drop-shadow-md rounded-full overflow-hidden h-8 w-full transition-all duration-300 flex justify-center items-center bg-gray-300 text-Black" onClick={quit}>Quit to MainMenu</button>
            </div>
        </div>
    )
}

export default GameResults