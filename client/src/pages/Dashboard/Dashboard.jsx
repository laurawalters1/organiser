import React from 'react'
import AddTodoForm from '../../components/AddTodoForm/AddTodoForm'

function Dashboard() {
  return (
      <div className='d-flex flex-column align-items-center'>
    <AddTodoForm></AddTodoForm>
    </div>
  )
}

export default Dashboard