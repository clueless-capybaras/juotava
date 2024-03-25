import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { AuthenticatedRequestWrapperContext } from '../../App';
import {baseUrlRecipes } from '../../config/config';
import { Badge, Button, Col, Container, FloatingLabel, Form, Image, ListGroup, Row, Table } from 'react-bootstrap';
import { unitToString } from '../../helperFunctions/unitToString';
import { generatePlaceholders } from '../../helperFunctions/generatePlaceholders';
import CreatorCard from './CreatorCard';

import placeholderimage from '../../image-placeholder.jpeg';

function Recipe(props) {
    const navigate = useNavigate();
    const arw = useContext(AuthenticatedRequestWrapperContext);
    const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();

    const [recipe, setRecipe] = useState();
    const [portions, setPortions] = useState(1);
    const [loadRecipeSuccess, setLoadRecipeSuccess] = useState();

    // get UUID from URL to request the recipe
    const { uuid } = useParams();
    // send request for specific recipe
    useEffect(() => {
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'recipe/'+ encodeURIComponent(uuid), 'GET', undefined, setRecipe, setLoadRecipeSuccess, true);
    }, []);

    const [tags, setTags] = useState(['SampleTag', 'AnotherTag', 'Tasty']);

    const logIngr = () => { console.log(recipe) }

    const handleChangePortions = (event) => {
        setPortions(event.target.value);
    }

    const editRecipe = () => {
        navigate('/composer/'+uuid);
    }

    return (
    
        <>
        
        <Container fluid>
            <Row className='mb-3'>
                <Col>
                    <span className="material-icons mx-3" onClick={() => navigate(-1)} style={{cursor: "pointer"}}>
                        arrow_back_ios_new 
                    </span>
                </Col>
                <Col className="d-flex justify-content-end">
                    {recipe && user && recipe.createdBy === user.sub ?
                        <Button variant="primary" onClick={editRecipe} style={{display: 'inline-flex', alignItems: 'center'}}>
                            <span style={{marginRight: '.5rem'}}>Bearbeiten</span> <span className="material-icons">edit</span>
                        </Button>
                    :
                        null
                    }
                </Col>
            </Row>
        </Container>
        <Container>
        <Row className="mb-5">
            <Col lg={4} className="me-5">
                <Image src={recipe? recipe.image.base64data : placeholderimage} style={{maxWidth: "20rem"}} rounded />
            </Col>
            <Col lg={7}>
                <Row>
                    <h2 className="text-start">
                        {recipe ? 
                            recipe.title
                        : generatePlaceholders(1, 4, 6)}
                    </h2>
                </Row>
                <Row className="mb-3">
                    <h3 className="text-muted">
                        {recipe ? 
                            recipe.category
                        : generatePlaceholders(1, 4, 6)}
                        {recipe ?
                            (recipe.nonAlcoholic ? <strong> (✅ alkoholfrei)</strong> : "")
                        : null}
                    </h3>
                </Row>
                <Row>
                    <p>
                        {recipe ? 
                            recipe.description
                        : generatePlaceholders(5, 2, 5)}
                    </p>
                </Row>
                <Row>
                    <Col>
                    <h3>
                        {recipe ?
                            tags.map((tag, index) => {
                                return (
                                    <Badge key={index} variant="primary" className="me-2">{tag}</Badge>
                                );
                            })
                        : generatePlaceholders(2, 1, 2)}
                    </h3>
                    </Col>
                </Row>
            </Col>
        </Row>

        <Row className="mb-3">
            <h3>Zutaten</h3>
        </Row>
        <Row className="mb-3">
            <Col xs="1" className="d-flex align-items-center">
                Portionen: 
            </Col>
            <Col>
                {recipe ?
                    <Form.Control type="number" value={portions} step="any" min="1" placeholder="1" onChange={handleChangePortions} style={{width: "4rem"}} />
                : generatePlaceholders(1, 1, 1)}
            </Col>
        </Row>
        <Row className="mb-5">
            <ListGroup as="ul" variant="flush">
                {recipe ?
                    recipe.ingredients.map((ingr, index) => {
                        return (
                            <ListGroup.Item key={index} as="li">
                                <td className="text-end" style={{minWidth: "4rem"}}>{ingr.amount * portions} {unitToString(ingr.unit)}</td>
                                <th className="ps-3">{ingr.name}</th>
                            </ListGroup.Item>
                        );
                    })
                : <>{generatePlaceholders(1, 2, 5)}
                    {generatePlaceholders(1, 2, 5)}
                    {generatePlaceholders(1, 2, 5)}</>}
            </ListGroup>
        </Row>
        <Row>
            <h3>Zubereitung</h3>
        </Row>
        <Row className="mb-5">
            <ListGroup as="ol" variant="flush" numbered>
                {recipe ? 
                    recipe.steps.map((step, index) => {
                        return (
                            <ListGroup.Item key={index} as="li">{step.description}</ListGroup.Item>
                        );
                    })
                : <>{generatePlaceholders(2, 2, 6)}
                    {generatePlaceholders(2, 2, 6)}
                    {generatePlaceholders(2, 2, 6)}</>}
            </ListGroup>
        </Row>
        <Row className="mb-5">
            <Col>
                <CreatorCard createdBy={recipe ? recipe.createdBy : undefined} />
            </Col>
        </Row>
        </Container>
        </>
    );
}

export default Recipe;