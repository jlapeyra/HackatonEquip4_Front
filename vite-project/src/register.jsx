import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Row, Container, Col} from "react-bootstrap";
import GlobalContext from "./GlobalContext";
import List from "./List"

function Register() {
    const {token} = useContext(GlobalContext);
    const [refresh, setRefresh] = useState(0);
    const [country, setCountry] = useState([]);
    const [error, setError] = useState(false);
    
 
        
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          };
      
          fetch(
            "https://fesplai-hackathon-production.up.railway.app/country",
            requestOptions
          )
            .then((resultado) => resultado.json())
            .then((resultado2) => {
              if (resultado2.ok === true) {
                  setCountry(resultado2.data);
                  console.log(country)
              } else {
                setError(resultado2.error);
                
              }
            })
            .catch((error) => setError(error));
 
    
 //Validate para validar que los campos se han rellenado
 const [validated, setValidated] = useState(false);




 //State con array de objetos de usuario para no hacer muchos states
 const [usuario, setUsuario] = useState({
   username: "",
   pswd: "",
    country: ""
 });

 function CrearUsuario(e) {
   e.preventDefault();

   const form = e.currentTarget;
   if (form.checkValidity() === false) {
     e.preventDefault();
     e.stopPropagation();
     setValidated(true);
    //  formularioBad();
     return;
   }
   var raw = JSON.stringify({
    username: usuario.username,
    password: usuario.pswd,
    country: usuario.country
  });
   

   var requestOptions = {
     method: "POST",
     body: raw,
     redirect: "follow",
     headers: { 'Content-Type': 'application/json', authorization: token }
   };

   fetch("https://fesplai-hackathon-production.up.railway.app/api/v1/auth/register", requestOptions)
     .then((response) => response.text())
     .then((result) => console.log(result))
     .then(() => {
       setUsuario({
         username: "",
         pswd: "",
         country: ""
       });
       //cambiamos el valor de clave a 1
    //    setClave(clave + 1);
    //    formularioOk();
       setValidated(false);
     })
     .catch((error) => console.log("error", error));
 }
//  useEffect(() => {
//     CrearUsuario();
    
//   }, [refresh]);

    return (
         <Container className="m-5 ">
     
      <Form
        id="registro-id"
        noValidate
        validated={validated}
        className="text-center fondo"
        onSubmit={CrearUsuario}
      >
       
          <Form.Label>
            <h2>Register</h2>
          </Form.Label>
         
          
          <Form.Group className="mb-3" controlId="formBasicusername">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              value={usuario.username}
              onInput={(e) => setUsuario({ ...usuario, username: e.target.value })}
              type="email"
              placeholder="f3ranz4@gmail.com"
            />
      
            <Form.Control.Feedback type="invalid">
              Introduce un email.
            </Form.Control.Feedback>
          </Form.Group>
         
         <Form.Group className="mb-3"> 
         <Form.Label>Choose a country</Form.Label>
         <Form.Select aria-label="Default select example">
      <option>Open this select menu</option>
      <option value="1">Spain</option>
      <option value="2">Germany</option>
      <option value="3">Irland</option>
    </Form.Select></Form.Group>
        
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              value={usuario.pswd}
              onInput={(e) => setUsuario({ ...usuario, pswd: e.target.value })}
              type="password"
              placeholder="Password"
            />
      
            <Form.Control.Feedback type="invalid">
              Introduce una contraseña.
            </Form.Control.Feedback>
          </Form.Group>
     
          
         
          <Form.Group className="mb-3">
            <Button variant="secondary" type="submit">
              Registrarse
            </Button>
          </Form.Group>
      
      </Form>
   
    </Container>
    
    )
}

export default Register