import React from "react"

function Confirm({display,onRespond}) {

    const yes=()=>{
        onRespond(true)
    }
    const no=()=>{
        onRespond(false)
    }

  return (
    <div className={`${display===true?'flex justify-center items-center h-screen bg-slate-900 bg-opacity-15 ':'hidden'} `}>
        <div className='w-fit bg-white shadow-lg rounded-lg text-lg p-6 space-y-4 '>
            <div className="text-slate-950 font-medium">
                Confirm to Dump the Task...
            </div>
            <div className='flex justify-around'>
                <button className='bg-red-600 rounded-full px-5 hover:outline hover:outline-1 hover:outline-slate-800 text-white font-medium ' onClick={yes}>YES</button>
                <button className='bg-green-500 rounded-full px-5 hover:outline hover:outline-1 hover:outline-slate-800 text-white font-medium' onClick={no}>NO</button>
            </div>
        </div>
    </div>
  )
}

export default Confirm