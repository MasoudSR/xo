import XIcon from './XIcon'
import OIcon from './OIcon';

function ChatBubble({ text, playerNumber }) {
    const color = playerNumber === 1 ? "bg-blue-300" : "bg-orange-300"

    return (
        <div className={`flex items-center ${playerNumber === 2 && "flex-row-reverse"}`}>
            <div className=''>
                {playerNumber === 1 ? <XIcon size={39} />
                    : <OIcon size={42} />
                }
            </div>
            <div className={`${color} px-3 py-1 rounded-2xl relative`}>
                {text}
                <div className={`w-2 h-2 absolute rounded-full ${color} ${playerNumber === 1 ? "left-0" : "right-0"}`}></div>
            </div>
        </div>
    )
}

export default ChatBubble