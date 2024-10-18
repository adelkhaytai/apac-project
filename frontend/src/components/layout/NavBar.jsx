import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";
import { useLazyLogoutQuery } from "../../toolkit/api/AuthApi";
import { Link, useNavigate } from "react-router-dom";
import "./style/navbar.css"
import Search from "./Search";
const NavBar = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [logout] = useLazyLogoutQuery();
  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      navigate(0);
    } catch (error) {
      localStorage.removeItem("token");
    } finally {
      navigate(0);
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Voyage</Navbar.Brand>
        <Search/>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link className="p-2" style={style} to={"/"}>Home</Link>
            <i class="bi bi-person pt-2"></i>
            <NavDropdown title={user?.name} id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link style={style}  to={"/profile"}>Profile</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link style={style}  to={"/login"}>Login</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link style={style}  to={"/register"}>Register</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4" onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
const style = {
  textDecoration : "none"
}

export default NavBar;
