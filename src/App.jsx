import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import CreateRoom from './Pages/CreateRoom';
import JoinRoom from './Pages/JoinRoom';
import Game from './Pages/Game';
import Main from './Pages/Main';
import { toast } from 'react-toastify';

const App = () => {
    const socket = useRef(null);
    const navigte=useNavigate()
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
            // console.log("My id is: " + socket.current.id);
            setMyId(socket.current.id)
        });}
        // Cleanup function to disconnect socket on unmount
        // return () => {
        //     socket.current.disconnect();
        // };
    }, []);

    useEffect(() => {
        if (socket.current) {
            socket.current.on('user-join', ({ users,opp }) => {
                const opps=users.find((e)=>e!=socket.current.id)
                setP2(opps)
                navigte("/game")
                
            });
           
    
            socket.current.on('you-join', ({player}) => {
                console.log("You joined the room.",player);
                setPlaye(player)
            });

            return () => {
                if (socket.current) {
                    socket.current.off('move-made');
                }
            };
        }
    }, [socket.current]);

    
    const handleCreateRoom = (roomCode) => {
        if (socket.current) {
            socket.current.emit("create-room",{ roomCode, userId:socket.current.id});
            setRoomCode(roomCode)
        }else{
            alert("no")
        }
    };

    const handleJoinRoom = (roomCode) => {
        if (socket.current) {
            console.log(socket.current.id)
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

    return (
        <div className='w-screen h-screen font-[h]'>
           
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/create' element={<CreateRoom onCreate={handleCreateRoom} />} />
                    <Route path='/join' element={<JoinRoom onJoin={handleJoinRoom} />} />
                 
                    <Route path='/game' element={<Game myId={myId} p2={p2} player={playe} socket={socket.current}  roomCode={roomCode}changePlayer={changePlayer}/>}/> 
                </Routes>
          
        </div>
    );
};

export default App;
