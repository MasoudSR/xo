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
        <div className={`w-72 bg-white drop-shadow-md rounded-xl h-56 overflow-hidden ${isClosed && "animate-jump-out"}`}>
            <div className="bg-slate-300 h-10 flex justify-center items-center border rounded-t-xl border-slate-400 drop-shadow-md">Settings</div>
            <div className="flex flex-col justify-center items-center h-full gap-3">
                <button className="drop-shadow-md rounded-full overflow-hidden h-8 w-32 transition-all duration-300 flex justify-center items-center bg-blue-500 text-white" onClick={exitSettings}>Resume</button>
                <button className="drop-shadow-md rounded-full overflow-hidden h-8 w-32 transition-all duration-300 flex justify-center items-center bg-blue-500 text-white" onClick={quit}>Main Menu</button>
            </div>
        </div>
    )
}

export default Settings