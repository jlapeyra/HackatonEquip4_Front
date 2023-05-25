import Login from './login'
import Register from './register'
import Country from './Countries/Country'
import { Container } from "react-bootstrap";
import { Routes, Route, useNavigate  } from "react-router-dom";
import './App.css'
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import GlobalContext from "./GlobalContext";

function App() {
  
 //useStates

 const [error, setError] = useState([]);
 const [token, setToken] = useState("");
 const [username, setUsername] = useState("");



 const [foto, setFoto] = useState("");

 //Navegación
 const navigateTo = useNavigate();

 const goHome = () => {
   navigateTo("/");
 };

 const goEventos = () => {
   navigateTo("/country");
 };

 //token
 useEffect(() => {
   if (token) {
     const decoded = jwt_decode(token);
     setUsername(decoded.username);
     goEventos();
   } else {
     setUsername("");
     goHome();
   }
 }, [token]);
//email, pswd
  function handleLogin () {
    goEventos()
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: token },
      body: JSON.stringify({ email, password }),
    };

    fetch("https://fesplai-hackathon-production.up.railway.app/api/v1/auth/login", requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        JSON.stringify(resp);
        if (resp.ok === true) {
          setToken(resp.token);
        
        } else {
          console.log("resp", resp);
          setError(resp.msg);
        }
   
      })
      .catch((e) => setError(e));
     
  }

  //Funcion para cerrar sesion
  function logout() {
    setToken("");
    goHome();
  }

  return (
    <>
      <GlobalContext.Provider
        value={{
          token,
          logout,
          goHome,
        }}
      >
        <Container>
          <Routes>
            <Route path="/" element={<Login handleLogin={handleLogin}/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/country" element={<Country />} />
          </Routes>
        </Container>
      </GlobalContext.Provider>
    </>
  )
}

export default App
