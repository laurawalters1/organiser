import React from 'react'
import { useMutation } from '@apollo/react-hooks';
import { FaRegEye, FaTrash } from 'react-icons/fa';
import { BsTrash } from "react-icons/bs";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
// mutations/queries
import { COMPLETE_TODO, DELETE_TODO } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { TodoState } from '../../context/TodoProvider';
import './Todo.css'


function Todo({title, description, id, status}) {
    const { todos, setTodos } = TodoState();
    const [completeTodo, {error}] = useMutation(COMPLETE_TODO)
    const [deleteTodo, {err}] = useMutation(DELETE_TODO)

    const completeTask = async (e) =>{
        const { data, loading } = await completeTodo({
            variables: { taskId: e.target.getAttribute('task-id') },
          })
          
          if(!loading){
              setTodos(data.completeTodo.todos)
          }
          
          
          
    }

    const toggleTask = (e) =>{
        console.log(e.target)
        const thisId = e.target.getAttribute('data-id') || e.target.parentNode.parentNode.getAttribute('data-id')
        console.log(thisId)
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

    const handleDelete = async (e)=>{
        console.log(e.target.getAttribute('task-id'))
        const { data, loading } = await deleteTodo({
            variables: { taskId: e.target.getAttribute('task-id') },
          })
          if(!loading){
              setTodos(data.deleteTodo.todos)
          }
    }
  return (
    <div>
    <div className='col-12  p-3 mt-4 '>
     <div className='d-flex justify-content-between align-items-center px-3'>
   {status? <h5 className='text-muted'><s>{title} </s></h5> :<h5>{title}</h5> } 
    
     <div className='d-flex align-items-center'>
     {/* {!status && <input type='checkbox' className='btn btn-success m-2' task-id={id} onClick={completeTask}></input> } */}
     <div className='container mx-3'>
     {!status ? <div class="round">
    <input type="checkbox" id="checkbox" task-id={id} onClick={completeTask} />
    <label for="checkbox"></label>
  </div> :
  <div class="round">
  <input type="checkbox" checked disabled id="checkbox" task-id={id} onClick={completeTask} />
  <label for="checkbox"></label>
</div>
  }
  </div>
         {/* <button className='btn btn-secondary' data-id={`${id}`} onClick={toggleTask}><FaRegEye className='' id={`view${id}`}></FaRegEye><AiOutlineClose id={`close${id}`}  className='d-none'></AiOutlineClose></button> */}
         {/* <div>
    <a  data-id={id} >
      <span className="bottom" data-id={id} id={`view${id}`} onClick={toggleTask} ></span>
    </a>
    <a   >
      <span className="top d-none" data-id={id} id={`close${id}`} onClick={toggleTask} ></span>
    </a>
  </div> */}
  <div class="icon icon-3"  data-id={id} id={`view${id}`} onClick={toggleTask}>
  <div class="arrow">
    <div class="top-arrow"></div>
  </div>
</div>

<div class="icon icon-4" data-id={id} id={`close${id}`} onClick={toggleTask}>
  <div class="arrow">
    <div class="bottom-arrow"></div>
  </div>
</div>
        {/* <button className='btn btn-danger m-2'><BsTrash></BsTrash></button> */}
        
    </div>
    </div>
    <div className='px-5'>
        <p id={`todo${id}`} className='d-none mt-3 '><div className='d-flex justify-content-between text-dark'><small className=''>{description}</small> <button onClick={handleDelete} task-id={id} className='btn btn-danger'><FaTrash></FaTrash></button></div></p>
    </div>
    
    </div>
    <hr className='mx-4' />
    </div>
  )
}

export default Todo