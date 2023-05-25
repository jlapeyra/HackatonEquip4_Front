import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Row, Container, Col} from "react-bootstrap";
import GlobalContext from "./GlobalContext";

function List() {
    const {token} = useContext(GlobalContext);
    const [refresh, setRefresh] = useState(0);
    const [country, setCountry] = useState([]);
    const [error, setError] = useState(false);
    
 
        
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          };
      
          fetch(
            "http://fesplai-hackathon-production.up.railway.app/country",
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



 const conList = count.map((number) =>
   <option>{number}</option>
 );



//  useEffect(() => {
//     CrearUsuario();
    
//   }, [refresh]);

    return (
        
       
       <div>   
       
     <Form.Label>Selecciona país</Form.Label>
     <Form.Select aria-label="Default select example" required
         value={usuario.country}
         onInput={(e) => setUsuario({ ...usuario, country: e.target.value })}>
 {conList}
</Form.Select>
</div>
    
    )
}

export default List