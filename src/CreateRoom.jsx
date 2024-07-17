// import React, { useState } from 'react';
// import { useSocket } from './SocketContext';

// const CreateRoom = ({ setRoomCode }) => {
//     const [roomCode, setRoomCodeState] = useState('');
//     const socket = useSocket();

//     const handleCreateRoom = () => {
//         socket.emit('createRoom', roomCode);
//         setRoomCode(roomCode);
//     };

//     socket.on('roomCreated', (roomCode) => {
//         console.log('Room created:', roomCode);
//     });

//     socket.on('roomFull', () => {
//         alert('Room is full');
//     });

//     return (
//         <div className="flex flex-col items-center">
//             <input 
//                 type="text" 
//                 value={roomCode} 
//                 onChange={(e) => setRoomCodeState(e.target.value)} 
//                 placeholder="Enter room code" 
//                 className="mb-2 px-4 py-2 border rounded-md"
//             />
//             <button 
//                 onClick={handleCreateRoom} 
//                 className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
//             >
//                 Create Room
//             </button>
//         </div>
//     );
// };

// export default CreateRoom;
