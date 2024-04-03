import { useState } from "react";

import { Alert, Col, Container, Row } from "react-bootstrap";

function ErrorModal(props) {
    const [show, setShow] = useState(true);
    const urlParms = new URLSearchParams(window.location.search);
    const error = urlParms.get('error');
    const errorDescription = urlParms.get('error_description');
    return (
        (error && show)?
        <Container fluid>
            <Row>
                <Col>
                <Alert variant='danger' onClose={() => setShow(false)} dismissible>
                        {errorDescription}
                </Alert>
                </Col>
            </Row>
        </Container>
        :null
    );
}
export default ErrorModal;