import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Heading from './components/Heading'
import { v4 as uuidv4 } from "uuid";
import Confirm from './components/Confirm';

function App() {
  const [displayConfirm, setDisplayConfirm] = useState(false)
  const [deleteId, setDeleteId] = useState("")
  const [last, setLast] = useState(false)
  const [show, setShow] = useState(true)

  const [todo, setTodo] = useState({
    task: "",
    id: "",
    isDone: false,
  })

  const [list, setList] = useState([])

  const update = (e) => {
    setTodo({
      task: e.target.value,
      id: uuidv4(),
      isDone: false
    })
  }

  const handleAdd = () => {
    //to avoid blank list to be added:
    if (todo.task) {
      setLast(false)
      setList([...list, todo])
      setTodo({ task: "", id: "", isDone: false })
    }
  }

  // This part is achieved through lots of trial and error ...saral bhasha me Jugad se
  const handleRespond = (res) => {

    setDisplayConfirm(false)
    if (res) {
      let id = deleteId
      let newList = list.filter((elem) => {
        return elem.id !== id;
      })
      setList(newList)
    }
  }
  const handleDelete = (id) => {
    setLast((list.length == 1) ? true : false)
    setDeleteId(id)
    setDisplayConfirm(true)
  }

  const handleIsDone = (id) => {
    let newList = list.filter((elem) => {
      if (elem.id === id) {
        elem.isDone = !elem.isDone
      }
      return elem
    })
    setList(newList)
  }

  const handleEdit = (id) => {
    let element = list.filter(elem => {
      return elem.id === id
    })
    setTodo({ task: `${element[0].task}`, id: '', isDone: false })

    let newList = list.filter(elem => {
      return elem.id !== id
    })
    setList(newList)
  }


  //Ek kaam krte hai jb jb humara list update ho vo local storage me bhi add ho jaye
  useEffect(() => {
    //length isliye kyuki refresh pe list empty ho jayega since application band ho raha hai to use samye ke list change ko bhi store kr lega so once the list is non empty then save and if empty then dont save(kyuki empty se koi functionality humare app me to nahi hai-[renderation])
    //Nahi Nahi ek jarurat hai ...if sare add hone ke baad delete ho jaye tab list khali he chahiye 'last' naam ka flag laga sakte hai
    // if (list.length != 0) {
    //   saveLocally()
    // }else if(last){
    //   saveLocally()
    // }

    if (list.length!=0 || last) saveLocally()
  }, [list])


  useEffect(() => {
    let todos = localStorage.getItem("list")
    if (todos) {
      setList(JSON.parse(todos))
    }

  }, [])//isme koi dikkat nahi ye apna sahi chal rha hai ..pr locally ek step piche hai store krne me.

  const saveLocally = () => {
    localStorage.setItem("list", JSON.stringify(list))
  }
  return (
    <>
      {displayConfirm && <Confirm display={displayConfirm} onRespond={handleRespond} />}
      {!displayConfirm && <div>
        <Navbar />
        <div className="container mx-auto my-2 shadow-lg h-[85vh] bg-white flex flex-col">
          <Heading />

          {/* Add your task */}
          <div className='flex mx-auto pl-3 bg-gray-200 w-3/4 rounded-full'>

            <input
              onChange={(e) => update(e)}
              value={todo.task}
              className='rounded-full w-full outline-none font-semibold bg-gray-200 placeholder:font-semibold placeholder:text-sm placeholder:text-gray-600' placeholder='Add your task' type="text" />

            <button onClick={handleAdd} className='flex font-medium gap-1 bg-green-500 p-1 rounded-lg'>
              <span className='text-slate-900'>Save</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" color="#000000" fill="none">
                <path d="M12 8V16M16 12L8 12" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="#000000" strokeWidth="1.5" />
              </svg>
            </button>

          </div>


          {/* List of Tasks */}
          <div className='mt-8 flex-grow overflow-y-auto pb-20 mb-5'>
            {/* {list.length === 0 && <div className='font-medium text-sm flex w-3/4 mx-auto justify-between px-3 bg-gray-200 rounded-md pt-1 my-2'>Make your toDo NOW !!!!!</div>} */}
            {list.length===0?<div className='font-medium text-sm flex w-3/4 mx-auto justify-between px-3 bg-gray-200 rounded-md pt-1 my-2'>Make your toDo NOW !!!!!</div>:
            <div className='font-medium text-sm flex w-3/4 mx-auto gap-2 px-3 bg-gray-200 rounded-md pt-1 my-5'>
                <input type="checkbox"
                checked={show}
                onChange={()=>setShow(!show)}
                />
                <span>Show  Finished Task</span>
              </div>}
            {
              list.map(elem => {
                return(show || !elem.isDone)&&<div key={elem.id} className='flex w-3/4 mx-auto justify-between gap-5 px-3 bg-gray-200 rounded-md pt-1 my-2'>

                  <div className='space-x-2 flex-1'>
                    <input type="checkbox"
                      defaultChecked={elem.isDone}
                      onChange={() => handleIsDone(elem.id)} />
                    <span className={`${elem.isDone ? 'line-through' : ''} text-slate-950`}>{elem.task}</span>
                  </div>

                  <div className=' space-x-6'>
                    <button onClick={() => handleEdit(elem.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" color="#000000" fill="#22c55e">
                        <path d="M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M11 20H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>

                    <button onClick={() => handleDelete(elem.id)} >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="26" color="#000000" fill="#ef4444">
                        <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>

                </div>
              })
            }

          </div>

        </div>

      </div>}
    </>
  )
}

export default App
