import { Col, Container, Nav, Row, Tab } from 'react-bootstrap';

import User from './user/User';
import About from './about/About';
import Imprint from './imprint/Imprint';
import Privacy from './privacy/Privacy';
import Lists from './lists/ListsOverview';
import MyRecipes from './myrecipes/MyRecipes';
import MyDrafts from './mydrafts/MyDrafts';

function Settings() {

    return(
        <>
        <Tab.Container defaultActiveKey="user">
            <Row>
                <Col sm={'auto'}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="user">Benutzer</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="lists">Meine Listen</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="myrecipes">Meine Rezepte</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="mydrafts">Meine Entwürfe</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="privacy">Privatsphäre und Datenschutz</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="about">Über</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="imprint">Impressum</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="user"><User /></Tab.Pane>
                        <Tab.Pane eventKey="lists"><Lists /></Tab.Pane>
                        <Tab.Pane eventKey="myrecipes"><MyRecipes /></Tab.Pane>
                        <Tab.Pane eventKey="mydrafts"><MyDrafts /></Tab.Pane>
                        <Tab.Pane eventKey="privacy"><Privacy /></Tab.Pane>
                        <Tab.Pane eventKey="about"><About /></Tab.Pane>
                        <Tab.Pane eventKey="imprint"><Imprint /></Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
        </>
    )
}

export default Settings;