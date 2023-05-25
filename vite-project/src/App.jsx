import Login from './login'
import Register from './register'
import Country from './Countries/Country'
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import './App.css'

function App() {
  
  return (
    <>
      
        <Container>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/country" element={<Country />} />
          </Routes>
        </Container>
       
    </>
  )
}

export default App
