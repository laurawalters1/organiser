import React, {useState} from 'react'
import AddTodoForm from '../../components/AddTodoForm/AddTodoForm'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Dashboard() {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
      <div className='d-flex flex-column align-items-center'>
        <Button  variant="primary" onClick={handleShow}>Add Task</Button> 
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
            <h2 className=''>New Task</h2> 
            </Modal.Header>
            <Modal.Body>
            <AddTodoForm></AddTodoForm>
            </Modal.Body>
            <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
        </Modal>
    </div>
  )
}

export default Dashboard