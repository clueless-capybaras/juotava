import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import imgplaceholder from '../../image-placeholder.jpeg';

function ImageUploader() {

    return(
        <Container className='text-center'>
            <Row>
                <Col>
                <Image src={imgplaceholder} style={{maxWidth: "15rem"}} className="mb-3" rounded />
                </Col>
            </Row>
            <Row>
                <Col>
                <Button variant="primary" className="me-1">Hochladen</Button>
                <Button variant="secondary">Generieren</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default ImageUploader;