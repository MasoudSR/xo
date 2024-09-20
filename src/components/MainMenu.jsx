import XIcon from './modules/XIcon';
import OIcon from './modules/OIcon';
// import { IoMdSettings } from "react-icons/io";
import { useState } from 'react';
import Modal from './Modal';
import OnlineMultiplayer from './OnlineMultiplayer';
import { Toaster } from 'react-hot-toast';

function MainMenu({ setGameMode, sides, setSides, connection, setConnection, setPlayerNumber }) {

    const [playMode, setPlayMode] = useState("")
    const [isQuit, setIsQuit] = useState(false)
    const [onlineMenu, setOnlineMenu] = useState(false)

    const changeMode = (gameMode) => {
        setIsQuit(true)
        setTimeout(() => {
            setGameMode(gameMode)
        }, 300);
    }

    return (
        <>
            <div className={`flex flex-col items-center transition-all animate-fade-up ${isQuit && "animate-jump-out animate-duration-[400ms]"}`}>
                <p className={`transition-all duration-300 ${playMode === "ai" ? "scale-100 h-16" : "scale-0 h-0"}`}>Pick your side</p>
                <div className={`flex justify-center transition-all ${playMode === "ai" ? "gap-16" : "gap-0"}`}>
                    <div className={`transition-all duration-500 relative w-20 h-24 ${playMode === "ai" ? sides.player === "x" ? "scale-110 opacity-100" : "scale-90 opacity-40" : "scale-100 opacity-100"}`}>
                        <button onClick={() => setSides({ player: "x", ai: "o" })} disabled={playMode !== "ai"} className='z-10 absolute'>
                            <XIcon size={80} />
                        </button>
                        <div className='w-20 h-7 bg-blue-500 blur-lg rounded-full absolute bottom-0 left-0 z-0'></div>
                    </div>
                    <div className={`transition-all duration-500 relative w-20 h-24 ${playMode === "ai" ? sides.player === "o" ? "scale-110 opacity-100" : "scale-90 opacity-40" : "scale-100 opacity-100"}`}>
                        <button onClick={() => setSides({ player: "o", ai: "x" })} disabled={playMode !== "ai"} className='z-10 absolute'>
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
                    <button className={`bg-blue-500 rounded-full shadow-md shadow-blue-300 transition-all duration-300 text-white ${playMode === "friend" ? "h-0 w-0" : " h-12 w-40"}`} onClick={() => setPlayMode("ai")}>With AI</button>
                    <div className={`transition-all duration-500 flex flex-col items-center bg-white drop-shadow-md overflow-hidden  ${playMode === "friend" ? "w-64 rounded-xl" : "w-40 rounded-[26px]"}`}>
                        <button className={`w-full h-12 ${playMode === "friend" && "cursor-default"}`} onClick={() => setPlayMode("friend")}>With a friend</button>
                        <div className={`flex transition-all duration-300 overflow-hidden origin-top ${playMode === "friend" ? "h-10" : "h-0"}`}>
                            <button className='h-10 w-32 border-r border-t' onClick={() => setOnlineMenu(true)}>Online</button>
                            <button className='h-10 w-32 border-t' onClick={() => changeMode("local")}>Local</button>
                        </div>
                    </div>
                </div>
                <button className='drop-shadow-md rounded-full flex bg-slate-200 overflow-hidden'>
                    <button className={`h-10 transition-all duration-300 bg-white ${playMode !== "" ? "w-20 border-r" : "w-0 border-none"}`} onClick={() => setPlayMode("")}>Back</button>
                    {/* <button className={`h-8 transition-all duration-300 flex justify-center items-center bg-white ${playMode === "" ? "w-8" : "w-0"}`} onClick={() => setPlayMode("")}><IoMdSettings size={20} color='#4281f8' /></button> */}
                    <button className={`h-10 transition-all duration-300  bg-white ${playMode === "ai" ? "w-32" : "w-0"}`} onClick={() => setGameMode("ai")}>Continue</button>
                </button>
            </div>
            {onlineMenu && <Modal ModalContent={<OnlineMultiplayer connection={connection} setConnection={setConnection} changeMode={changeMode} setPlayerNumber={setPlayerNumber} setOnlineMenu={setOnlineMenu} />} />
            }
            <div><Toaster /></div>
        </>
    )
}

export default MainMenu