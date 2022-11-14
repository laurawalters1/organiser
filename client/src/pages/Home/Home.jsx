import React from 'react'
import Button from 'react-bootstrap/Button';
function Home() {
  return (
    <div className='text-light d-flex justify-content-center'>

<Button href='/signup'  variant="primary" className="custom-btn-outline-brand-invert mx-2 my-4">Signup</Button> 
<Button href="/login"  variant="primary" className="custom-btn-outline-brand-invert mx-2 my-4">Login</Button> 

    </div>
  )
}

export default Home