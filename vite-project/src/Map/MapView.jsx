import React from "react";
import MapChart from "./MapChart";
import { Container } from "react-bootstrap";


function MapView() {
  return (
    <>
        <Container>
            <MapChart/>
        </Container>
        
    </>
    
  );
}

export default MapView;

//const rootElement = document.getElementById("root");
//ReactDOM.render(<App />, rootElement);