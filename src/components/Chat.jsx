import { IoMdChatbubbles } from "react-icons/io";
import ChatBubble from "./modules/ChatBubble";
import { TbWindowMinimize } from "react-icons/tb";

function Chat({ showChats, setShowChats, sendChat, chats, chatInputText, setChatInputText, setIsNewChat }) {

    const handleSubmit = (e) => {
        e.preventDefault();
        sendChat()
    };

    return (
        <div className={`transition-all duration-500 flex justify-between flex-col drop-shadow-lg backdrop-blur-sm fixed rounded-[25px] overflow-hidden max-w-lg ${showChats ? "w-screen h-screen bottom-0 left-0 p-7 bg-white/70" : `w-12 h-12 p-0 bottom-10 left-10 bg-white/100 `}`}>
            <div className="flex gap-16">

                <button className='flex justify-center' onClick={() => {
                    setShowChats(!showChats)
                    setIsNewChat(false)
                }}>
                    <span className="w-12 h-12 flex justify-center items-center">
                        <span className={`transition-all absolute duration-700 ${showChats ? "scale-0" : "scale-100"}`}>
                            <IoMdChatbubbles size={27} color='#4281f8' />
                        </span>
                        <span className={`transition-all absolute duration-700 ${showChats ? "scale-100" : "scale-0"}`}>
                            <TbWindowMinimize size={27} color='#4281f8' />
                        </span>
                    </span>
                </button>
                <h3 className="text-3xl">Chat</h3>
            </div>
            <div className="flex flex-col gap-3 mt-4 overflow-scroll h-full no-scrollbar">
                {chats.map((chat, index) =>
                    <div key={index} className={`flex ${chat.playerNumber === 1 ? 'justify-start' : 'justify-end'}`} >
                        <ChatBubble text={chat.text} playerNumber={chat.playerNumber} /> </div>)}
            </div>
            <form onSubmit={handleSubmit} >
                <div className="p-2 bg-blue-300/70 rounded-2xl flex gap-3 mt-4">
                    <input className="rounded-xl p-3 w-full" type="text" value={chatInputText} onChange={(e) => setChatInputText(e.target.value)} />
                    <button className="px-5 bg-green-700 rounded-xl text-white" type="submit">Send</button>
                </div>
            </form>
        </div>
    )
}

export default Chat