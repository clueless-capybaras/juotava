import { Col, Nav, Row, Tab } from 'react-bootstrap';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

import User from './user/User';
import About from './about/About';
import Imprint from './imprint/Imprint';
import Privacy from './privacy/Privacy';
import Lists from './lists/ListsOverview';
import MyRecipes from './myrecipes/MyRecipes';
import MyDrafts from './mydrafts/MyDrafts';

function SettingsNav() {

    return(
        <>
            <Row className="mx-0">
                <Col>
                    <Nav variant="pills" defaultActiveKey="user" className="justify-content-center" fill>
                        <Nav.Item>
                            <Nav.Link as={NavLink} to="/settings/user" eventKey="user">Benutzer</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={NavLink} to="/settings/lists" eventKey="lists">Meine Listen</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={NavLink} to="/settings/myrecipes" eventKey="myrecipes">Meine Rezepte</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={NavLink} to="/settings/mydrafts" eventKey="mydrafts">Meine Entwürfe</Nav.Link>
                        </Nav.Item>
                        {/*<Nav.Item>
                            <Nav.Link eventKey="privacy">Privatsphäre und Datenschutz</Nav.Link>
                        </Nav.Item>*/}
                        <Nav.Item>
                            <Nav.Link as={NavLink} to="/settings/about" eventKey="about">Über Uns</Nav.Link>
                        </Nav.Item>
                        {/*<Nav.Item>
                            <Nav.Link eventKey="imprint">Impressum</Nav.Link>
                        </Nav.Item>*/}
                    </Nav>
                    <hr />
                </Col>
                </Row>
                <Row>
                <Col>
                </Col>
            </Row>
        </>
    )
}

export default SettingsNav;