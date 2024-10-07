import { useState, useEffect } from 'react';
import Peer from 'peerjs';
import { IoCopyOutline } from "react-icons/io5";
import toast from 'react-hot-toast';

const OnlineMultiplayer = ({ setConnection, changeMode, setPlayerNumber, setOnlineMenu }) => {
  const [peerId, setPeerId] = useState('');
  const [peer, setPeer] = useState(null);
  const [hostId, setHostId] = useState('');
  const [showHost, setShowHost] = useState(false)
  const [showClient, setShowClient] = useState(false)
  const [mode, setMode] = useState("normal")
  const [isClosed, setIsClosed] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  const customPeerIdGenerator = () => (Math.random().toString(36) + "0000000000000000000").substr(2, 8);


  useEffect(() => {
    const newPeerId = customPeerIdGenerator()
    const newPeer = new Peer(newPeerId,{
      config: {
        'iceServers': [
          {
            urls: "stun:stun.relay.metered.ca:80",
          },
          {
            urls: "turn:global.relay.metered.ca:80",
            username: import.meta.env.VITE_USER_NAME,
            credential: import.meta.env.VITE_CREDENTIAL,
          },
          {
            urls: "turn:global.relay.metered.ca:80?transport=tcp",
            username: import.meta.env.VITE_USER_NAME,
            credential: import.meta.env.VITE_CREDENTIAL,
          },
          {
            urls: "turn:global.relay.metered.ca:443",
            username: import.meta.env.VITE_USER_NAME,
            credential: import.meta.env.VITE_CREDENTIAL,
          },
          {
            urls: "turns:global.relay.metered.ca:443?transport=tcp",
            username: import.meta.env.VITE_USER_NAME,
            credential: import.meta.env.VITE_CREDENTIAL,
          },
        ]
      }
    });
    setPeer(newPeer);

    newPeer.on('open', (id) => {
      setPeerId(id);
    });

    newPeer.on('connection', (conn) => {
      conn.on('data', (data) => {
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
    setIsConnecting(true)
    const conn = peer.connect(hostId);

    const connTimeoutTimer = setTimeout(() => {
      setIsConnecting(false);
      toast.error("Connection timeout: host not found or unavailable")
    }, 10000);

    conn.on('open', () => {
      clearTimeout(connTimeoutTimer)
      conn.send('join');
    });

    conn.on('data', (data) => {
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
    <div className={`bg-white/60 rounded-3xl flex flex-col w-screen max-w-sm drop-shadow-lg transition-all duration-500 ${mode === "normal" ? "gap-4 p-4" : "gap-0 p-0"} ${isClosed && "animate-jump-out"}`}>

      <div className={`transition-all duration-300 flex flex-col gap-2 overflow-hidden ${mode === "client" ? "max-h-0 scale-0" : "max-h-96 scale-100"}`}>
        <div
          className={`transition-all duration-500 bg-blue-600 rounded-xl overflow-hidden ${showHost ? "max-h-96" : "max-h-16"
            }`}>
          <button
            className={`p-5 transition-all duration-500 z-20 w-full shadow-md ${showHost ? "bg-blue-300 text-black" : "bg-blue-500 text-white"
              } `}
            onClick={() => {
              setShowHost(true)
              setMode("host")
            }}
            disabled={showHost}>
            Host
          </button>
          <div className='flex flex-col p-4 gap-3'>
            {peerId ?
              <div className="flex text-white justify-between items-center">
                <div>
                  <p className="text-xs">Send your id to your friend</p>
                  <p className="text-xl w-full mr-2">{peerId ? peerId : "Loading your id"}</p>
                </div>
                <button
                  className={`transition-all duration-300 flex flex-col border justify-center items-center rounded-lg w-12 h-12  border-gray-200 ${peerId ? "scale-100" : "scale-0"}`}
                  onClick={() => {
                    navigator.clipboard.writeText(peerId); toast("ID copied to clipboard")
                  }}>
                  <IoCopyOutline />
                  <span className="text-[8px]">Copy</span>
                </button>
              </div>
              :
              <div className='flex flex-col justify-center items-center p-4'>
                <div className='rounded-full border-4 w-3 border-slate-300 border-t-lime-500 p-4 animate-spin'></div>
                <p className='text-white'>
                  Preparing...
                </p>
              </div>}
            <button className='bg-blue-500 px-5 py-3 rounded-xl text-white' onClick={() => backHandler()}>Back</button>
          </div>
        </div>
      </div>


      <div className={`transition-all duration-300 flex flex-col gap-2 overflow-hidden ${mode === "host" ? "max-h-0 scale-0" : "max-h-72 scale-100"}`}>
        <div
          className={`transition-all duration-500 bg-blue-600 rounded-xl overflow-hidden ${showClient ? "max-h-80" : "max-h-16"
            }`}>
          <button
            className={`p-5 transition-all duration-500 z-20 w-full shadow-md ${showClient ? "bg-blue-300 text-black" : "bg-blue-500 text-white"
              } `}
            onClick={() => {
              setShowClient(true)
              setMode("client")
            }}
            disabled={showClient}>
            Client
          </button>
          {peerId ?
            <div className="p-4 flex flex-col gap-2 text-white justify-between items-center">
              <input className='border rounded-lg px-2 py-1 w-full text-black' type="text" placeholder="Enter Host ID" value={hostId} onChange={(e) => setHostId(e.target.value)} />
              <div className='flex gap-2 w-full'>
                <button className='bg-blue-500 px-5 rounded-xl' onClick={() => backHandler()}>Back</button>
                <button className='px-5 py-2 bg-green-600 rounded-xl flex justify-center w-full text-white' onClick={handleJoin} disabled={isConnecting}>
                  {isConnecting ? <div className='rounded-full border-4 w-3 border-slate-300 border-t-lime-500 p-2 animate-spin'></div> : "Join"}
                </button>
              </div>
            </div>
            : <div className='flex flex-col justify-center items-center p-4'>
              <div className='rounded-full border-4 w-3 border-slate-300 border-t-lime-500 p-4 animate-spin'></div>
              <p className='text-white'>Preparing...</p>
              <button className='bg-blue-500 text-white w-full px-5 mt-2 py-3 rounded-xl' onClick={() => backHandler()}>Back</button>
            </div>}

        </div>
      </div>
      <div className={`transition-all duration-300 overflow-hidden ${mode === "normal" ? "max-h-28 scale-100" : "max-h-0 scale-0"}`}>
        <button className={` p-3 mt-4 bg-slate-200 border border-slate-300 rounded-xl text-black w-full`} onClick={cancelHandler}>Cancel</button>
      </div>
    </div>
  );
};

export default OnlineMultiplayer;