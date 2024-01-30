import React from 'react';
import Stack from 'react-bootstrap/Stack';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink } from 'react-router-dom';

import logo from "../icons/Juotava_Draft_Icon.png";

import { Link } from 'react-router-dom';

function Navibar(props) {
    return (
        <Navbar key={false} bg="dark" variant="dark" expand={false} className="mb-3">
        <Stack direction="horizontal" gap={3}>
          <Navbar.Brand>
            <Link to='/' style={{textDecoration: 'none', color: 'white'}}>
              <img src={logo} alt="Logo" style={{height: '30px', width: '30px'}} className="d-inline-block align-top"/>
              {' '}
              Juotava
            </Link> 
          </Navbar.Brand>
        </Stack>
        <Nav>
          <Nav.Link as={NavLink} to="/about">
            About
          </Nav.Link>
        </Nav>
      </Navbar>
    );
}
export default Navibar;