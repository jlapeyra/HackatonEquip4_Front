import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import { useNavigate  } from "react-router-dom";

function Login ({handleLogin}) {
  
  const navigateTo = useNavigate();
  const goRegister = () => {
    navigateTo("/register");
  };
    return (
      
 <div className='fondo'>

 <Card className='foto' style={{ width: '18rem' }}>
      
      <Card.Body>
        <Card.Title style={{ textAlign: 'center' }}><h3>Login</h3></Card.Title>
        <Card.Text>
        <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
      
      </Form.Group>
      <Button variant="secondary" type="submit">
        Go
      </Button>
      <hr />
      <Form.Group>
        <Form.Label>Don't have an account? </Form.Label>
        
      </Form.Group>
      <Form.Group><Button variant="secondary" onClick={()=>goRegister()}>Submit</Button></Form.Group>
    </Form>
        </Card.Text>
      </Card.Body>
    </Card>
 </div>
   
    )
}

export default Login