import React, {useState} from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks';
import AddTodoForm from '../../components/AddTodoForm/AddTodoForm'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {GET_ME} from '../../utils/queries'
import { TodoList } from '../../components';

function Dashboard() {
    const [show, setShow] = useState(false);
    // Execute the query on component load
  const { loading, data, error } = useQuery(GET_ME);
  const me = data?.me || [];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  if(!loading){
  return (
      <div className='d-flex flex-column align-items-center'>
        <Button  variant="primary" onClick={handleShow} className="custom-btn-outline-brand-invert mt-5">Add Task</Button> 
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
            <h2 className=''>New Task</h2> 
            </Modal.Header>
            <Modal.Body>
            <AddTodoForm closeForm={handleClose}></AddTodoForm>
            </Modal.Body>
            <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} className="custom-btn-outline-brand">
            Close
          </Button>
        </Modal.Footer>
        </Modal>

        <TodoList ></TodoList>
    </div>
  )
  }
}

export default Dashboard