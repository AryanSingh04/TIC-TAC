import React, { useState } from 'react';

const JoinRoom = ({ onJoin,socket}) => {
    const [roomCode, setRoomCode] = useState('');

    const handleJoin = () => {
        if (roomCode.trim()) {
            onJoin(roomCode);
        }
    };

    return (
        <div className='w-full h-full flex flex-col items-center justify-center bg-[rgb(22,22,22)] '>
            <h2 className='text-white text-2xl mb-4'>Join a Room</h2>
            <div className='bg-gray-800 p-4 rounded-lg'>
                <input
                    type='text'
                    value={roomCode}
                    onChange={(e) => setRoomCode(e.target.value)}
                    className='border p-2 rounded mb-4 w-64'
                    placeholder='Enter Room Code'
                />
                <button
                    onClick={handleJoin}
                    className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700'
                >
                    Join Room
                </button>
            </div>
        </div>
    );
};

export default JoinRoom;
