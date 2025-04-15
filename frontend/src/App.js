import React, { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import GamesList from "./components/gamesList";
import Game from "./components/game";
import Login from "./components/login";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import AddComment from "./components/addComment";

function App() {
  const [user, setUser] = useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Game Reviews</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to={"/games"}>
              Games
            </Nav.Link>
            <Nav.Link as={NavLink} to={user ? "" : "/login"}>
              {user ? "Logout User" : "Login"}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route path="/" element={<GamesList />}></Route>
        <Route path="/games" element={<GamesList />}></Route>

        <Route path="/games/:id/" element={<Game user={user} />}></Route>
        <Route
          path="/games/:id/comment"
          element={<AddComment user={user} />}
        ></Route>

        <Route path="/login" element={<Login login={login} />}></Route>
      </Routes>
    </div>
  );
}


export default App;
