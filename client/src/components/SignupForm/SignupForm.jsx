import React, {useState} from 'react'
import { useMutation } from '@apollo/react-hooks';
import Auth from '../../utils/auth';
// mutations/queries
import { ADD_USER } from '../../utils/mutations';

const SignupForm = () => {
    const [addUser, { error }] = useMutation(ADD_USER);
    // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

    const handleUserInput = (e) =>{
        const { name, value } = e.target;
        setUserFormData({ ...userFormData, [name]: value });
        
    }

    const handleFormSubmit = async (e) =>{
        e.preventDefault();

        // check if form has everything (as per react-bootstrap docs)
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
        }
    
        try {
            console.log(userFormData)
          const { data } = await addUser({
            variables: { ...userFormData },
          });
          Auth.login(data.addUser.token);
        } catch (err) {
          alert(err);
        }
    
        setUserFormData({
          username: '',
          email: '',
          password: '',
        });
    }

  return (
    <>
    <h1>Signup</h1>
    <form action="" onSubmit={handleFormSubmit} >
        <input type="text" placeholder='username' onChange={handleUserInput} name='username' />
        <input type="email" placeholder='email' onChange={handleUserInput} name='email' />
        <input type="password" placeholder='password' name='password' onChange={handleUserInput}/>
        <button>Submit</button>
    </form>
    </>
  )
}

export default SignupForm