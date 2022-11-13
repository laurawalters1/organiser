import React, {useState} from 'react'
import { useMutation } from '@apollo/react-hooks';
import { RichTextEditor } from '../../components'
// mutations/queries
import { ADD_TODO } from '../../utils/mutations';
import Auth from '../../utils/auth';

function AddTodoForm() {
   const [addTodo, {error}] = useMutation(ADD_TODO)
   const [todoFormData, setTodoFormData] = useState({
    title: '',
    description: '',
    status: false,
  });

  const handleUserInput = (e) =>{
    const { name, value } = e.target;
    setTodoFormData({ ...todoFormData, [name]: value });
    
}


   const onFormSubmit = async (e) =>{
    e.preventDefault()
    try {
        console.log(todoFormData)
      const { data } = await addTodo({
        variables: { ...todoFormData },
      });
     console.log(data)
    } catch (err) {
      alert(err);
    }
   }
  return (
    <form className='bg-light d-flex flex-column col-lg-4 col-8  align-items-stretch p-5 mt-5' onSubmit={onFormSubmit}>
         <h2 className='mb-3'>New Task</h2>
         <div class=" mb-3">
            
        <input type="text" className="form-control col-12" id="floatingInputEmail" name='title' placeholder="Title" onChange={handleUserInput}/>
 
        </div>


       <textarea name="description" id="desc" cols="30" rows="10" onChange={handleUserInput}></textarea>
       
       {/* <RichTextEditor ></RichTextEditor> */}

       <div className='d-flex justify-content-center'>
        <button className='my-4 custom-btn-outline-brand col-5 '>Add</button>
        </div>
    </form>
  )
}

export default AddTodoForm