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
    <div className='bg-light d-flex flex-column col-lg-4 col-8 align-items-center'>
    <h1 className='my-4'>Signup</h1>
    <form action="" onSubmit={handleFormSubmit} className="d-flex flex-column w-75 justify-content-center align-items-center">
        {/* <input type="text" placeholder='username' onChange={handleUserInput} name='username' className='my-2'/> */}
        <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInputUsername" name='username' onChange={handleUserInput} placeholder="example1"/>
        <label for="floatingInputUsername">Username</label>
        </div>
        {/* <input type="email" placeholder='email' onChange={handleUserInput} name='email' className='my-2'/> */}
        <div class="form-floating mb-3">
        <input type="email" class="form-control" id="floatingInputEmail" name='email' onChange={handleUserInput} placeholder="name@example.com"/>
        <label for="floatingInputEmail">Email</label>
        </div>
        {/* <input type="password" placeholder='password' name='password' onChange={handleUserInput} className='my-2'/> */}
        <div class="form-floating mb-3">
        <input type="password" class="form-control" id="floatingInputPassword" name='password' onChange={handleUserInput} placeholder="password"/>
        <label for="floatingInputPassword">Password</label>
        </div>
        <button className='my-4 btn btn-outline-secondary '>Submit</button>
    </form>
    </div>
  )
}

export default SignupForm