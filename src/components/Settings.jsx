import { useState } from "react"

function Settings({ quit, setSettingsMenu }) {

    const [isClosed, setIsClosed] = useState(false)
    const exitSettings = () => {
        setIsClosed(true)
        setTimeout(() => {
            setSettingsMenu(false)
        }, 300);
    }
    return (
        <div className={`w-72 bg-white/80 drop-shadow-md rounded-xl backdrop-blur-lg  border-slate-50 ${isClosed && "animate-jump-out"}`}>
            <div className="bg-white/90 h-16 flex justify-center items-center rounded-t-xl border backdrop-blur-lg text-xl drop-shadow-sm">Settings</div>
            <div className="flex flex-col justify-center items-center h-full gap-5 px-4 py-10">
                <button className="drop-shadow-md rounded-full h-10 w-full transition-all duration-300 flex justify-center items-center bg-blue-500 text-white" onClick={exitSettings}>Resume</button>
                <button className="drop-shadow-md rounded-full h-10 w-full transition-all duration-300 flex justify-center items-center bg-red-200 border border-red-300 text-black" onClick={quit}>Main Menu</button>
            </div>
        </div>
    )
}

export default Settings