import XIcon from './modules/XIcon';
import OIcon from './modules/OIcon';
import { IoMdSettings } from "react-icons/io";
import { useState } from 'react';

function MainMenu() {

    const [playMode, setPlayMode] = useState("")
    const [playerSide, setPlayerSide] = useState("x")

    return (
        <div className={`flex flex-col items-center transition-all`}>
            <p className={`transition-all duration-300 ${playMode === "ai" ? "scale-100 h-16" : "scale-0 h-0"}`}>Pick your side</p>
            <div className={`flex justify-center transition-all ${playMode === "ai" ? "gap-16" : "gap-0"}`}>
                <div className={`transition-all duration-500 relative w-20 h-24 ${playMode === "ai" ? playerSide === "x" ? "scale-110 opacity-100" : "scale-90 opacity-40" : "scale-100 opacity-100"}`}>
                    <button onClick={() => setPlayerSide("x")} disabled={playMode !== "ai"} className='z-10 absolute drop-shadow-md'>
                        <XIcon size={80} />
                    </button>
                    <div className='w-20 h-7 bg-blue-500 blur-lg rounded-full absolute bottom-0 left-0 z-0'></div>
                </div>
                <div className={`transition-all duration-500 relative w-20 h-24 ${playMode === "ai" ? playerSide === "o" ? "scale-110 opacity-100" : "scale-90 opacity-40" : "scale-100 opacity-100"}`}>
                    <button onClick={() => setPlayerSide("o")} disabled={playMode !== "ai"} className='z-10 absolute drop-shadow-md'>
                        <OIcon size={84} />
                    </button>
                    <div className='w-20 h-7 bg-orange-500 blur-lg rounded-full absolute left-1 bottom-0 z-0'></div>
                </div>
            </div>
            <div>
                <p className={`transition-all mt-10 mb-3 ${playMode !== "ai" ? "scale-100" : "scale-0"}`}>
                    Choose your play mode
                </p>
            </div>
            <div className={`flex items-center flex-col gap-2 transition-all duration-300 ${playMode !== "ai" ? "scale-100 h-44" : "scale-0 h-1"}`}>
                <button className={`bg-blue-500 rounded-full shadow-md shadow-blue-300 text-white h-8 w-32 ${playMode === "friend" && "h-0 w-0"}`} onClick={() => setPlayMode("ai")}>With AI</button>
                <div className={`transition-all duration-500 flex flex-col items-center bg-white drop-shadow-md overflow-hidden  ${playMode === "friend" ? "rounded-xl" : "w-32 h-8 rounded-full"}`}>
                    <button className='h-10 w-32' onClick={() => setPlayMode("friend")}>With a friend</button>
                    <div className={`flex border-t transition-all duration-300 overflow-hidden origin-top`}>
                        <button className='h-8 w-32 border-r' onClick={() => setPlayMode("online")}>Online</button>
                        <button className='h-8 w-32' onClick={() => setPlayMode("local")}>Local</button>
                    </div>
                </div>
            </div>
            <button className='drop-shadow-md rounded-full flex bg-slate-200 overflow-hidden'>
                <button className={`h-8 transition-all duration-300 border-r bg-white ${playMode === "ai" ? "w-20" : "w-0 border-none"}`} onClick={() => setPlayMode("")}>Back</button>
                <button className={`h-8 transition-all duration-300 flex justify-center items-center bg-white ${playMode === "" ? "w-8" : "w-0"}`} onClick={() => setPlayMode("")}><IoMdSettings size={20} color='#4281f8' /></button>
                <button className={`h-8 transition-all duration-300  bg-white ${playMode === "ai" ? "w-32" : "w-0"}`} onClick={() => setPlayMode("")}>Continue</button>
            </button>
        </div>)
}

export default MainMenu