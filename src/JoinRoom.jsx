import React, { useState } from 'react';
import { useSocket } from './SocketContext';

const JoinRoom = ({ setRoomCode }) => {
    const [roomCode, setRoomCodeState] = useState('');
    const socket = useSocket();

    const handleJoinRoom = () => {
        socket.emit('joinRoom', roomCode);
        setRoomCode(roomCode);
    };

    socket.on('roomJoined', (roomCode) => {
        console.log('Joined room:', roomCode);
    });

    socket.on('roomNotFound', () => {
        alert('Room not found');
    });

    return (
        <div className="flex flex-col items-center">
            <input 
                type="text" 
                value={roomCode} 
                onChange={(e) => setRoomCodeState(e.target.value)} 
                placeholder="Enter room code" 
                className="mb-2 px-4 py-2 border rounded-md"
            />
            <button 
                onClick={handleJoinRoom} 
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
            >
                Join Room
            </button>
        </div>
    );
};

export default JoinRoom;
