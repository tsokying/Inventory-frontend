import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import { withRouter } from "react-router";

function Header() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">Inventory System (v1.5)</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/stock">Stock</Nav.Link>
            <Nav.Link as={Link} to="/product">Product</Nav.Link>
            <Nav.Link as={Link} to="/location">Location</Nav.Link>
            <Nav.Link as={Link} to="/package">Transfering</Nav.Link>
            <Nav.Link as={Link} to="/user">User</Nav.Link>
            <Nav.Link as={Link} to="/account">Account</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
}

export default withRouter(Header);
