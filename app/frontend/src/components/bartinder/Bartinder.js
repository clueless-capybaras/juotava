import {React, useContext, useEffect, useState} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {baseUrlRecipes } from '../../config/config';
import { AuthenticatedRequestWrapperContext } from '../../App';

import { Badge, Col, Image, Row, Container } from 'react-bootstrap';

import placeholderImage from '../../image-placeholder.jpeg'

function Bartinder(props) {
    const arw = useContext(AuthenticatedRequestWrapperContext);
    const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();

    const [tags, setTags] = useState(['SampleTag', 'Sweet', 'Tasty']);
    
    useEffect(() => {
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'recipe/all', 'GET', undefined, undefined, true);
    }, []);

    return (
        <Container>
            <Row>
                <Col className='text-end'>
                    <Container className='justify-content-end mb-5'>
                        <Row className='justify-content-end'>
                            <h4>Zutaten</h4>
                        </Row>
                        <Row className='justify-content-end'>
                            Das sind mehrere Zeilen mit Zutaten, so wie Milch, Wasser Zucker oder auch Kagge
                        </Row>
                    </Container>
                    <Container className='justify-content-end mb-5'>
                        <Row>
                            <h4>Tags</h4>
                        </Row>
                    {tags.map((tag, index) => {
                        return (
                            <Badge key={index} as="lg" variant="primary" className="me-2">{tag}</Badge>
                        );
                    })}
                    </Container>
                </Col>
                <Col>
                    <Row className='justify-content-center mb-3'>
                        <Col className='text-center'>
                            <span className="material-icons">
                                favorite_border
                            </span>
                            4,7k
                        </Col>
                        <Col className='justify-content-center'>
                            <h1>Drink Name</h1>
                        </Col>
                        <Col className='text-center'>
                            <span className="material-icons">
                                star_border
                            </span>
                            5,0
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Image src={placeholderImage} rounded />
                    </Row>
                    <Row>
                        <Col className='text-center'>
                            <span class="material-icons-outlined md-48">
                                cancel
                            </span>
                        </Col>
                        <Col className='text-center'>
                            <span className="material-icons md-48">
                                favorite_border
                            </span>
                        </Col>
                    </Row>
                </Col>
                <Col className='text-end'>
                    Präferenzen
                    <span class="material-icons-outlined">
                        tune
                    </span>
                </Col>
            </Row>
        </Container>
    );
}
export default Bartinder;