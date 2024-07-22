import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import clickSound from "../assets/click.mp3";
import { AnimatedCross, AnimatedCircle } from '../AnimatedIcons';
import { MdOutlineRestartAlt } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Game = ({ p2, myId, player, socket, roomCode, changePlayer }) => {
    const navigate = useNavigate();

    if (!p2) {
        navigate("/");
    }

    const [dian, setDian] = useState("cross");
    const [board, setBoard] = useState(Array(9).fill(null));
    const [points, setPoints] = useState({
        myPoints: 0,
        oppPoints: 0
    });
    const [finish, setFinish] = useState(false);
    const [winnerBox, setWinnerBox] = useState([]);
    const [colour, setColour] = useState("");
    const clickSoundRef = useRef(new Audio(clickSound));

    useEffect(() => {
        if (socket) {
            socket.on('move-made', (data) => {
                const { move } = data;
                if (move.value !== player && !finish) {
                    clickSoundRef.current.play();
                    setBoard((prevBoard) => {
                        const newBoard = [...prevBoard];
                        newBoard[move.index] = move.value === "X" ? "cross" : "circle";
                        return newBoard;
                    });
                    setDian(move.curDian === "cross" ? "circle" : "cross");
                }
            });

           

            socket.on("user-exit", (id) => {
                toast(id + " has disconnected", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    bodyClassName: "blue",
                    transition: Bounce,
                });
                setFinish(true);
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            });

            socket.on("reset-game", ({ nextPlayer }) => {
                resetGame(nextPlayer);
            });

            return () => {
                socket.off('move-made');
                socket.off("game-finish");
                socket.off("user-exit");
                socket.off("reset-game");
            };
        }
    }, [socket, player, finish, navigate]);

    const resetGame = (nextPlayer) => {
        changePlayer(nextPlayer);
        setBoard(Array(9).fill(null));
        setDian("cross");
        setFinish(false);
        setWinnerBox([]);
        setColour("");
    };

    const handleMove = (index) => {
        if (board[index] === null && dian === (player === "X" ? "cross" : "circle") && !finish) {
            clickSoundRef.current.play();
            setBoard((prev) => {
                const tempBoard = [...prev];
                tempBoard[index] = player === "X" ? "cross" : "circle";
                return tempBoard;
            });
            socket.emit('make-move', { roomCode: roomCode, move: { index, value: player, curDian: dian } });
            setDian(prev => prev === "cross" ? "circle" : "cross");
        } else {
            if (board[index] === null && !finish) {
                toast("Not Your Chance", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    bodyClassName: "blue",
                    transition: Bounce,
                });
            }
        }
    };

    const handleToast = (name) => {
        toast(name ? `${name}` : "Match is Draw.!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            bodyClassName: "blue",
            transition: Bounce,
        });
    };

    const setWinner = (name) => {
        setFinish(true);
        handleToast(name);
    };

    useEffect(() => {
        const checkWinner = () => {
            const lines = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ];

            for (let i = 0; i < lines.length; i++) {
                const [a, b, c] = lines[i];
                if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                    setWinnerBox(lines[i]);
                    setColour(board[a] === "cross" ? "bg-red-600 hover:bg-red-900" : "bg-blue-600 hover:bg-blue-900");
                    setWinner((board[a] === "cross" ? "X" : "O")+" has won the Match");
                   
                    return;
                }
            }

            if (board.every(cell => cell !== null)) {
                setWinner();
            }
        };

        checkWinner();
    }, [board, socket, player, roomCode]);

    useEffect(() => {
        if (winnerBox.length > 0 && finish) {
            setPoints((prev) => {
                const isIWon = board[winnerBox[0]] === (player === "X" ? "cross" : "circle");
                return isIWon
                    ? { ...prev, myPoints: prev.myPoints + 1 }
                    : { ...prev, oppPoints: prev.oppPoints + 1 };
            });
        }
    }, [finish, winnerBox, board, player]);

    return (
        <>
            <div className='w-full bg-[rgb(22,22,22)] h-full flex flex-col items-center justify-center gap-6'>
                <div className='w-[80%] md:w-1/2 h-14 flex items-center justify-between font-bold text-xl'>
                    <div className='flex text-white items-center gap-2 w-2/5'>
                        <div className='h-4/5 w-3/3 md:w-[150px] lg:w-[200px] bg-white text-black rounded-tl-3xl rounded-br-3xl flex items-center p-2 text-ellipsis whitespace-nowrap line-clamp-1'>
                            <h1 className='w-[95%] overflow-hidden'>{myId}</h1>
                            <div>....</div>
                        </div>
                        <h1 className='text-xl'>{points.myPoints}</h1>
                    </div>
                    {finish && (
                        <MdOutlineRestartAlt
                            className='w-10 h-10 bg-white text-3xl rounded-full text-center'
                            onClick={() => socket?.emit("reset", { roomCode, currentPlayer: player })}
                        />
                    )}
                    <div className='flex items-center gap-2 text-white w-2/5 justify-end'>
                        <h1 className='text-xl'>{points.oppPoints}</h1>
                        <div className='h-4/5 w-3/3 lg:w-[200px] bg-white text-black md:w-[150px] rounded-tr-3xl rounded-bl-3xl flex items-center p-2 overflow-hidden text-ellipsis whitespace-nowrap'>
                            {p2 && (
                                <>
                                    <h1 className='w-[95%] overflow-hidden'>{p2}</h1>
                                    <div>....</div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className='w-4/5 sm:w-[60%] md:w-2/5 aspect-square grid grid-cols-3 gap-1 md:gap-2 lg:gap-4'>
                    {board.map((val, index) => (
                        <div
                            className={`w-full aspect-square flex items-center font-bold justify-center sm:text-sm lg:text-4xl hover:text-white rounded-lg ${!finish ? "cursor-pointer" : 'cursor-not-allowed'} ${winnerBox.includes(index) ? colour : "bg-[rgb(70,70,70)] hover:bg-black"}`}
                            onClick={() => handleMove(index)}
                            key={index}
                        >
                            {board[index] === "cross" && <AnimatedCross />}
                            {board[index] === "circle" && <AnimatedCircle />}
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer toastClassName={"bg-[rgb(70,70,70)] text-white"} />
        </>
    );
}

export default Game;
