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

    const [loadRecipeSuccess, setLoadRecipeSuccess] = useState("");
    
    useEffect(() => {
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'recipe/all', 'GET', undefined, undefined, setLoadRecipeSuccess, true);
    }, []);

    return (
        <Container>
            <Row>
                <Col></Col>
                <Col>
                    <Row className='justify-content-center mb-3'>
                        <Col className='text-center mt-auto'>
                            <Row>
                                <span className="material-icons">
                                    favorite_border
                                </span>
                            </Row>
                            <Row>
                                <span>4,7k</span>
                            </Row>
                        </Col>
                        <Col className='justify-content-center'>
                            <h2>Drink Name</h2>
                        </Col>
                        <Col className='text-center mt-auto'>
                            <Row>
                                <span className="material-icons">
                                    star_border
                                </span>
                            </Row>
                            <Row>
                                <span>5</span>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col className='text-end'>
                    Präferenzen
                    <span className="material-icons-outlined inline-icon">
                        tune
                    </span>
                </Col>
            </Row>
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
                            <Badge key={index} variant="primary" className="me-2">{tag}</Badge>
                        );
                    })}
                    </Container>
                </Col>
                <Col>
                    <Row className='mb-3'>
                        <Image src={placeholderImage} rounded />
                    </Row>
                    <Row>
                        <Col className='text-center'>
                            <span className="material-icons-outlined md-48">
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
                <Col></Col>
            </Row>
        </Container>
    );
}
export default Bartinder;