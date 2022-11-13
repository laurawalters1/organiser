import React from 'react'

function Todo({title, description}) {
  return (
    <div className='bg-light d-flex col-12'>{title}</div>
  )
}

export default Todo