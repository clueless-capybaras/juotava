import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';

import logo from "../../icons/Juotava_Draft_Icon.png";
import LogInIndicator from '../auth/LogInIndicator';

function Navibar(props) {
    return (
      <Navbar sticky="top" key={false} bg="dark" variant="dark" className="mb-3 justify-content-between">
        <Nav>
          <Nav.Link as={NavLink} to='/' style={{textDecoration: 'none', color: 'white'}}>
            <img src={logo} alt="Logo" style={{height: '30px', width: '30px'}} className="d-inline-block align-top"/>
          </Nav.Link> 
        </Nav>
        <Nav>
          <Nav.Link as={NavLink} to="/browser">
            <span className="material-icons">
              search
            </span>
          </Nav.Link>
          <Nav.Link as={NavLink} to="/composer">
            <span className="material-icons">
              add_circle_outline
            </span>
          </Nav.Link>
          <Nav.Link as={NavLink} to="/bartinder">
            <span className="material-icons">
              local_fire_department
            </span>
          </Nav.Link>
        </Nav>
        <Nav>
          <LogInIndicator />
        </Nav>
      </Navbar>
    );
}
export default Navibar;