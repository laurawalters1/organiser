import React from 'react'
import Todo from '../Todo/Todo'
import { TodoState } from '../../context/TodoProvider';


function TodoList() {
    console.log('rerender')
    const { todos, setTodos } = TodoState();
console.log("todos from state", todos)
if(todos){
  return (
    <div className='col-11 col-md-6 col-lg-4 bg-light'>
        {todos.map((todo)=><Todo  title={todo.title} description={todo.description} status={todo.status} id={todo._id}></Todo>)}
    </div>
  )
}
}

export default TodoList