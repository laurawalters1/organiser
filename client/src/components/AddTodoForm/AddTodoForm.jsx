import React from 'react'
import { RichTextEditor } from '../../components'


function AddTodoForm() {
   



  return (
    <form className='bg-light d-flex flex-column col-lg-4 col-8  align-items-stretch p-5 mt-5'>
         <h2 className='mb-3'>New Task</h2>
         <div class=" mb-3">
            
        <input type="text" className="form-control col-12" id="floatingInputEmail" name='title' placeholder="Title"/>
 
        </div>
        {/* <input type="password" placeholder='password' name='password' onChange={handleUserInput} className='my-2'/> */}

       {/* <textarea name="" id="desc" cols="30" rows="10"></textarea> */}
       <RichTextEditor></RichTextEditor>
       <div className='d-flex justify-content-center'>
        <button className='my-4 custom-btn-outline-brand col-5 '>Add</button>
        </div>
    </form>
  )
}

export default AddTodoForm