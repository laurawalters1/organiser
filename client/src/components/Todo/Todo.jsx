import React from 'react'
import { FaRegEye } from 'react-icons/fa';
import { BsTrash } from "react-icons/bs";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";


function Todo({title, description, id}) {
    console.log(description)

    const toggleTask = (e) =>{
        const thisId = e.target.getAttribute('data-id') || e.target.parentNode.parentNode.getAttribute('data-id')
        const p = document.getElementById(`todo${thisId}`)
        const close = document.getElementById(`close${thisId}`)
        const view = document.getElementById(`view${thisId}`)
        if(p.classList.contains('d-none')){
        p.classList.remove('d-none')
        close.classList.remove('d-none')
        view.classList.add('d-none')
        } else {
            p.classList.add('d-none')
        close.classList.add('d-none')
        view.classList.remove('d-none')
        }
    }
  return (
    <div className='bg-light  col-12 m-3 p-4'>
     <div className='d-flex justify-content-between align-items-center'>
    <h4>{title}</h4>
     <div>
     <button className='btn btn-success m-2' ><AiOutlineCheck></AiOutlineCheck></button>
         <button className='btn btn-secondary' data-id={`${id}`} onClick={toggleTask}><FaRegEye className='' id={`view${id}`}></FaRegEye><AiOutlineClose id={`close${id}`}  className='d-none'></AiOutlineClose></button>
        {/* <button className='btn btn-danger m-2'><BsTrash></BsTrash></button> */}
        
    </div>
    </div>
    <div>
        <p id={`todo${id}`} className='d-none'>{description}</p>
    </div>
    </div>
  )
}

export default Todo