import React, { useState } from 'react';
import { useSocket } from './SocketContext';

const Game = ({ me='dfbdshn275217fcn',p2="47vuy524721" }) => {
    const [board, setBoard] = useState(Array(9).fill(null));
    // const socket = useSocket();

    const handleMove = (index) => {
        if (!board[index]) {
            setBoard((prev) => {
                const newBoard = [...prev];
                newBoard[index] = 'X'; // or 'O' based on player
                socket.emit('move', { roomCode, index });
                return newBoard;
            });
        }
    };

    socket.on('move', (index) => {
        setBoard((prev) => {
            const newBoard = [...prev];
            newBoard[index] = 'O'; // or 'X' based on opponent
            return newBoard;
        });
    });

    return (
        <div className='w-full h-full'>
              <div className='w-full h-10 bg-red-600'>222</div>
        <div className="grid grid-cols-3 gap-2 w-1/2 mx-auto mt-10">4
          
            {board.map((cell, index) => (
                <button 
                    key={index} 
                    onClick={() => handleMove(index)} 
                    className="w-16 h-16 flex items-center justify-center bg-gray-200 border border-gray-400 text-2xl font-bold cursor-pointer"
                >
                    {cell}
                </button>
            ))}
            </div>
        </div>
    );
};

export default Game;
