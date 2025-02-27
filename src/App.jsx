import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import CreateRoom from './Pages/CreateRoom';
import JoinRoom from './Pages/JoinRoom';
import Game from './Pages/Game';
import Main from './Pages/Main';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const socket = useRef(null);
    const navigte=useNavigate();
    const [loading,setLoading]=useState(false)
    const [roomCode,setRoomCode]=useState("")
    const [p2, setP2] = useState(undefined);
    const [playe,setPlaye]=useState("")
    const [myId,setMyId]=useState(undefined)
    useEffect(() => {
        // Initialize socket connection
        if(!socket?.current){
        socket.current = io("https://tic-back.onrender.com/",{
        });
        socket.current.on("connect", () => {
            console.log("My id is: " + socket.current.id);
            setMyId(socket.current.id)
        });}
     
    }, []);

    useEffect(() => {
        if (socket.current) {
            socket.current.on('user-join', ({ users,opp }) => {
                const opps=users.find((e)=>e!=socket.current.id)
                setLoading(false)
                setP2(opps)
                navigte("/game")
                
            });
           
    
            socket.current.on('you-join', ({player}) => {
                console.log("You joined the room.",player);
                setPlaye(player)
            });
            socket.current.on('roomNotFound', () => {
                setLoading(false)
                setTimeout(()=>{
                    toast.error("Room is Already Full or Doesn't Exist.!",{
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "light",
                        bodyClassName: "blue",
                        transition: Bounce,
                    })
                },[1000])
                
            
            });


            return () => {
                if (socket.current) {
                    socket.current.off('move-made');
                    socket.current.off("roomNotFound")
                }
            };
        }
    }, [socket.current]);

    
    const handleCreateRoom = (roomCode) => {
        if (socket.current) {
            socket.current.emit("create-room",{ roomCode, userId:socket.current.id});
            setRoomCode(roomCode)
            toast.success("Room is Created.!",{
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
                bodyClassName: "blue",
                transition: Bounce,
            })
        }else{
            alert("no")
        }
    };

    const handleJoinRoom = (roomCode) => {
        if (socket.current) {
            console.log(socket.current.id)
            setLoading(true)
          console.log("process start join")
            socket.current.emit("join-room", {roomCode, userId:socket.current.id});
            setRoomCode(roomCode)
        }
        else{
            useNavigate("/")
        }
    };
    const changePlayer=({player})=>{
     
   setPlaye((prev)=>{
  
   return prev=="X"?"O":"X"
   })
    }

 if(loading){
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
        <div className="loader">
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__bar"></div>
        <div className="loader__ball"></div>
      </div>
        </div>
    )
 }

    return (
        <div className='w-screen h-screen font-[h]'>
        
                <Routes>
                    <Route exact path='/' element={<Main />} />
                    <Route exact path='/create' element={<CreateRoom onCreate={handleCreateRoom} />} />
                    <Route exact path='/join' element={<JoinRoom onJoin={handleJoinRoom} />} />
                 
                    <Route path='/game' element={<Game myId={myId} p2={p2} player={playe} socket={socket.current}  roomCode={roomCode}changePlayer={changePlayer}/>}/> 
                </Routes>
                <ToastContainer toastClassName={"bg-[rgb(70,70,70)] text-white"} />
               
        </div>
    );
};

export default App;
