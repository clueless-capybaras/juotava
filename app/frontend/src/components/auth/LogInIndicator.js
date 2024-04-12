import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';

function LogInIndicator(){
    const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();
    return (
        (isAuthenticated) ? (<>
            <Nav.Link as={NavLink} to="/settings" className="d-flex align-items-center">
                <span className="material-icons">
                manage_accounts
                </span>
            </Nav.Link>
        </>):(<>
            <Nav.Link onClick={() => loginWithRedirect()} className="d-flex align-items-center">
                <span className="material-icons">
                person
                </span>
            </Nav.Link>
        </>)
    );

}
export default LogInIndicator;