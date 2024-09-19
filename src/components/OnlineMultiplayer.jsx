import { useState, useEffect } from 'react';
import Peer from 'peerjs';
import { IoCopyOutline } from "react-icons/io5";

const OnlineMultiplayer = ({ setConnection, changeMode, setPlayerNumber, setOnlineMenu }) => {
  const [peerId, setPeerId] = useState('');
  const [peer, setPeer] = useState(null);
  const [hostId, setHostId] = useState('');
  const [showHost, setShowHost] = useState(false)
  const [showClient, setShowClient] = useState(false)
  const [mode, setMode] = useState("normal")
  const [isClosed, setIsClosed] = useState(false)


  useEffect(() => {
    const newPeer = new Peer();
    setPeer(newPeer);

    newPeer.on('open', (id) => {
      console.log("Peer ID:", id);
      setPeerId(id);
    });

    newPeer.on('connection', (conn) => {
      console.log("Connection received:", conn);
      conn.on('data', (data) => {
        console.log("Data received on host:", data);
        if (data === 'join') {
          changeMode('online');
          setConnection(conn)
          conn.send('online');
          setPlayerNumber(1)
        }
      });
    });

  }, [changeMode, setConnection]);




  const backHandler = () => {
    setShowClient(false)
    setShowHost(false)
    setMode("normal")
  }

  const handleJoin = () => {
    const conn = peer.connect(hostId);
    console.log("Connecting to host:", hostId);

    conn.on('open', () => {
      console.log("Connection opened:", conn);
      conn.send('join');
    });

    conn.on('data', (data) => {
      console.log("Data received from host:", data);
      if (data === 'online') {
        changeMode('online');
        setConnection(conn)
        setPlayerNumber(2)
      }
    });
  };

  const cancelHandler = () => {
    setIsClosed(true)
    setTimeout(() => {
      setOnlineMenu(false)
    }, 300);
  }

  return (
    <div className={`bg-white/60 rounded-3xl flex flex-col drop-shadow-lg p-5 transition-all duration-500 ${mode === "normal" ? "gap-4" : "gap-0"} ${isClosed && "animate-jump-out"}`}>

      <div className={`transition-all duration-500 flex flex-col gap-2 overflow-hidden ${mode === "client" ? "max-h-0" : "max-h-72"}`}>
        <div
          className={`transition-all duration-500 bg-blue-600 rounded-xl overflow-hidden ${showHost ? "max-h-56" : "max-h-16"
            }`}>
          <button
            className={` p-5 transition-all duration-500 z-20 w-full shadow-md ${showHost ? "bg-blue-300 text-black" : "bg-blue-500 text-white"
              } `}
            onClick={() => {
              setShowHost(true)
              setMode("host")
            }}>
            Host
          </button>
          <div className='flex flex-col p-4 gap-3'>
            <div className="flex text-white justify-between items-center">
              <div>
                <p className="text-[11px] sm:text-xs">Send your id to your friend</p>
                <p className="text-[15px] sm:text-sm w-72 mr-2">{peerId ? peerId : "Loading your id"}</p>
              </div>
              <button
                className={`transition-all duration-300 flex flex-col border justify-center items-center rounded-lg h-10 w-10 sm:w-12 sm:h-12  border-gray-200 ${peerId ? "scale-100" : "scale-0"}`}
                onClick={() => navigator.clipboard.writeText(peerId)}>
                <IoCopyOutline />
                <span className="text-[8px]">Copy</span>
              </button>
            </div>
            <button className='bg-blue-500 px-5 py-3 rounded-xl text-white' onClick={() => backHandler()}>Back</button>
          </div>
        </div>
      </div>


      <div className={`transition-all duration-500 flex flex-col gap-2 overflow-hidden ${mode === "host" ? "max-h-0" : "max-h-72"}`}>
        <div
          className={`transition-all duration-500 bg-blue-600 rounded-xl overflow-hidden ${showClient ? "max-h-56" : "max-h-16"
            }`}>
          <button
            className={`p-5 transition-all duration-500 z-20 w-full shadow-md ${showClient ? "bg-blue-300 text-black" : "bg-blue-500 text-white"
              } `}
            onClick={() => {
              setShowClient(true)
              setMode("client")
            }}>
            Client
          </button>
          <div className="p-4 flex flex-col gap-2 text-white justify-between items-center">
            <input className='border rounded-lg px-2 py-1 w-full text-black' type="text" placeholder="Enter Host ID" value={hostId} onChange={(e) => setHostId(e.target.value)} />
            <div className='flex gap-2 w-full'>
              <button className='bg-blue-500 px-5 rounded-xl' onClick={() => backHandler()}>Back</button>
              <button className='px-5 py-2 bg-green-600 rounded-xl w-full text-white' onClick={handleJoin}>Join</button>
            </div>
          </div>
        </div>
      </div>
      <div className={`transition-all duration-300 overflow-hidden ${mode === "normal" ? "max-h-28" : "max-h-0"}`}>
        <button className={` p-3 mt-4 bg-slate-200 border border-slate-300 rounded-xl text-black w-full`} onClick={cancelHandler}>Cancel</button>
      </div>
      {/* <p>{message}</p> */}
      {/* <input type="text" value={inputValue} onChange={handleInputChange} /> */}
    </div>
  );
};

export default OnlineMultiplayer;