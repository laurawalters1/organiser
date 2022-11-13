import React, {useState} from 'react'
import { useMutation } from '@apollo/react-hooks';
import { RichTextEditor } from '../../components'
// mutations/queries
import { ADD_TODO } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { TodoState } from '../../context/TodoProvider';

function AddTodoForm({closeForm}) {
    const { todos, setTodos } = TodoState();
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
       
      const { data } = await addTodo({
        variables: { ...todoFormData },
      });

      setTodos(data.addTodo.todos)
      console.log("setTodos", data.addTodo.todos)
      
     
     setTodoFormData({
        title: '',
        description: '',
        status: false,
     })
     closeForm()

    } catch (err) {
      alert(err);
    }
   }
  return (
    <form className='bg-white d-flex flex-column col-12  align-items-stretch p-0 mt-0' onSubmit={onFormSubmit}>
         {/* <h2 className='mb-3'>New Task</h2> */}
         <div className=" mb-3">
            
        <input type="text" value={todoFormData.title} className="form-control col-12" id="floatingInputEmail" name='title' placeholder="Title" onChange={handleUserInput}/>
 
        </div>


       <textarea name="description" value={todoFormData.description} id="desc" cols="30" rows="10" onChange={handleUserInput}></textarea>
       
       {/* <RichTextEditor ></RichTextEditor> */}

       <div className='d-flex justify-content-center'>
        <button className='my-4 custom-btn-outline-brand col-5 '>Add</button>
        </div>
    </form>
  )
}

export default AddTodoForm