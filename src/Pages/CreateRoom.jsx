import React, { useState } from 'react';

const generateRandomCode = () => {
    return Math.random().toString(36)?.substr(2, 6).toUpperCase(); // Generates a 6-character alphanumeric code
};

const CreateRoom = ({ onCreate }) => {
    const [roomCode, setRoomCode] = useState(generateRandomCode());
    const [copied, setCopied] = useState(false);

    const handleCreate = () => {
        onCreate(roomCode);
    };

    const handleCopy = () => {
        navigator.clipboard?.writeText(roomCode)
            .then(() => setCopied(true))
            .catch((err) => console.error('Failed to copy: ', err));
    };

    return (
        <div className='w-full h-full flex flex-col items-center justify-center bg-[rgb(22,22,22)]'>
            <h2 className='text-white text-xl xl:text-4xl mb-4'>Create a Room</h2>
            <div className='bg-gray-800 p-4 rounded-lg'>
                <p className='text-white mb-4'>
                    Your Room Code: 
                    <span 
                        className='text-blue-400 cursor-pointer hover:underline ml-2' 
                        onClick={handleCopy}
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </span>
                </p>
                <p className='text-3xl font-bold text-blue-500'>{roomCode}</p>
                <button
                    onClick={handleCreate}
                    className='bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700'
                >
                    Create Room
                </button>
            </div>
        </div>
    );
};

export default CreateRoom;
