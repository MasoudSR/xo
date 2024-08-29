import { useState } from "react"
import XIcon from "./modules/XIcon";
import OIcon from "./modules/OIcon";

function GameResults({ quit, setShowGameResults, winner, restartGame }) {

    const [isClosed, setIsClosed] = useState(false)

    const exitGameResults = () => {
        setIsClosed(true)
        setTimeout(() => {
            setShowGameResults(false)
            restartGame()
        }, 300);
    }
    return (
        <div className={`w-80 bg-white drop-shadow-md rounded-xl h-56 overflow-hidden ${isClosed && "animate-jump-out"}`}>
            <div className="bg-slate-300 h-10 flex justify-center items-center border rounded-t-xl border-slate-400 drop-shadow-md">Results</div>
            <div className="">
                <div>
                    <div className={`transition-all duration-500 relative w-20 h-24`}>
                        <div className="-translate-x-9 absolute z-0 opacity-60">
                            {winner === "x" && <XIcon size={150} />}
                            {winner === "o" && <OIcon size={150} />}
                        </div>
                        {/* <div className={`w-32 h-32 mt-6 blur-lg rounded-full ${winner === "draw" ? "bg-slate-300" : winner === "x" ? "bg-blue-400" : "bg-orange-200"}`}></div> */}
                        <p className="absolute z-10 top-3 left-3">
                            {winner === "draw" ? "Draw" : winner}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-3 absolute right-3 bottom-3">
                    <button className="drop-shadow-md rounded-full overflow-hidden h-8 w-36 transition-all duration-300 flex justify-center items-center bg-blue-500 text-white" onClick={exitGameResults}>Continue Playing</button>
                    <button className="drop-shadow-md rounded-full overflow-hidden h-8 w-36 transition-all duration-300 flex justify-center items-center bg-blue-500 text-white" onClick={quit}>Quit to MainMenu</button>
                </div>
            </div>
        </div>
    )
}

export default GameResults