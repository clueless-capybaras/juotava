import { useState } from 'react';

import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import ImageUploader from './ImageUploader';
import IngredientList from './IngredientList';
import PrepList from './PrepList';
import TagField from './TagField';

function Composer() {

    return(
        <>
        <h1 className="text-center mb-5">Composer</h1>
        <Container className="mb-5">
            <Row className="justify-content-center mb-3">
                <ImageUploader />
            </Row>

            <Row className="justify-content-center mb-3">
                <Col xs="6" sm="6" md="6">
                    <FloatingLabel controlId="floatingTitle" label="Titel">
                        <Form.Control placeholder="Titel" />
                    </FloatingLabel>
                </Col>
                <Col xs="2" sm="2" md="2">
                </Col>
            </Row>

            <Row className="justify-content-center mb-3">
                <Col xs="6" sm="6" md="6">
                    <FloatingLabel controlId="floatingCategory" label="Kategorie wählen...">
                        <Form.Select placeholder="Kategorie wählen...">
                            <option>Cocktail</option>
                            <option>Kaffee</option>
                            <option>Limonade</option>
                            <option>Saft</option>
                            <option>Smoothie</option>
                            <option>Tee</option>
                        </Form.Select>
                    </FloatingLabel>
                </Col>
                <Col xs="2" sm="2" md="2">
                    <Form.Check type="checkbox" label="alkoholfrei" />
                </Col>
            </Row>

            <Row className="justify-content-center mb-3">
                <Col xs="8" sm="8" md="8">
                    <FloatingLabel label="Beschreibung" className="mb-3">
                        <Form.Control as="textarea" placeholder="Beschreibung" style={{height: "5rem"}} />
                    </FloatingLabel>
                </Col>
            </Row>
        </Container>

        <Container className="mb-5">
            <h3 className="text-center">Zutatenliste</h3>
            <Row className="justify-content-center mb-3">
                <Col>
                    <IngredientList />
                </Col>
            </Row>
        </Container>

        <Container className="mb-5">
            <h3 className="text-center">Zubereitung</h3>
            <Row className="justify-content-center mb-3">
                <Col>
                 <PrepList />
                </Col>
            </Row>
        </Container>

        <Container className="text-center mb-5">
            <Row className="justify-content-center mb-3">
                <Col>
                    <TagField />
                </Col>
            </Row>
        </Container>

        <Container className="text-center mb-5">
            <Row className="justify-content-center mb-3">
                <Col xs="8" sm="8" md="8">
                    <Button variant="primary" className="me-1">Veröffentlichen</Button>
                    <Button variant="secondary">Entwurf speichern</Button>
                </Col>
            </Row>
        </Container>
        </>
    );
}

export default Composer;