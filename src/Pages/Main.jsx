import React from 'react'
import { Link } from 'react-router-dom'
const Main = () => {
  return (
    <div className='w-screen h-screen bg-[rgb(22,22,22)] flex items-center justify-center'>
    <div className='w-4/5 md:w-auto h-3/5  lg:h3/4 aspect-square border-2 rounded-lg border-[rgb(222,222,222)] '>
    <div className='w-full h-1/5 flex items-center flex-col py-4  border-[rgb(222,222,222)] border-b-2'>
     <img src="https://th.bing.com/th/id/OIP.k6MpkytKn5OigQ3SlJ7jegAAAA?rs=1&pid=ImgDetMain" alt="" className='h-3/5'/>
    <h1 className=' text-3xl text-white font-bold'>TIC TAC TOE</h1>
    </div>
    <div className='h-4/5 w-full  text-white flex items-center justify-between flex-col py-[20%]'>
       <Link to={"/create"} className='w-3/5 md:w-2/5 h-10 rounded-full md:h-14  border-2 border-[rgb(222,222,222)] p-2 flex items-center justify-center font-bold text-sm md:text-lg lg:text-xl hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-900 cursor-pointer' title='Create Room'>Create Room</Link>
       <Link to={"/join"} className='w-3/5 md:w-2/5 h-10 rounded-full md:h-14  border-2 border-[rgb(222,222,222)] p-2 flex items-center justify-center font-bold text-sm md:text-lg lg:text-xl hover:bg-red-600 hover:shadow-2xl hover:shadow-red-900  cursor-pointer' title='Join Room'>Join Room</Link>
    </div>
    </div>
     </div>
  )
}

export default Main