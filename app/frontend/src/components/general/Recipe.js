import { useContext, useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router';

import { useAuth0 } from '@auth0/auth0-react';
import { AuthenticatedRequestWrapperContext } from '../../App';
import {baseUrlRecipes } from '../../config/config';

import { Badge, Button, Col, Container, Dropdown, Form, Image, ListGroup, Row, Toast, ToastContainer } from 'react-bootstrap';

import CreatorCard from './CreatorCard';

import { generatePlaceholders } from '../../helperFunctions/generatePlaceholders';
import { getDrinkCategories } from '../../helperFunctions/getDrinkCategories';
import { unitToString } from '../../helperFunctions/unitToString';

import placeholderimage from '../../image-placeholder.jpeg';

function Recipe(props) {
    const navigate = useNavigate();
    const arw = useContext(AuthenticatedRequestWrapperContext);
    const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();

    const [recipe, setRecipe] = useState();
    const [portions, setPortions] = useState(1);
    const [loadRecipeSuccess, setLoadRecipeSuccess] = useState('');
    const [loadListsSuccess, setLoadListsSuccess] = useState('');
    const [lists, setLists] = useState();
    const [addRecipeToListSuccess, setAddRecipeToListSuccess] = useState('');

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [listTitle, setListTitle] = useState('');

    // get UUID from URL to request the recipe
    const { uuid } = useParams();
    // send request for specific recipe
    useEffect(() => {
        setLoadRecipeSuccess('waiting');
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'recipe/'+ encodeURIComponent(uuid), 'GET', undefined, setRecipe, setLoadRecipeSuccess, false);
        setLoadListsSuccess('waiting');
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'list/my', 'GET', undefined, setLists, setLoadListsSuccess, false);
    }, []);

    const [tags, setTags] = useState(['SampleTag', 'AnotherTag', 'Tasty']);

    const handleChangePortions = (event) => {
        setPortions(event.target.value);
    }

    const editRecipe = () => {
        navigate('/composer/'+uuid);
    }

    const handleAddToList = (listId, newListTitle) => {
        setListTitle(newListTitle);
        setAddRecipeToListSuccess('waiting');
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'list/addrecipe/' + encodeURIComponent(listId), 'POST', recipe.uuid, undefined, afterRequest, false); 
    }

    const afterRequest = (successString) => {
        setAddRecipeToListSuccess(successString);
        if(successString === 'success') {
            setToastMessage('Rezept zur Liste hinzugefügt.');
            setShowToast(true);
        }
        if (successString === 'error') {
            setToastMessage('Das Rezept befindet sich schon in der Liste.');
            setShowToast(true);
        }
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
                        <Button variant="primary" onClick={editRecipe} className='text-white' style={{display: 'inline-flex', alignItems: 'center'}}>
                            <span style={{marginRight: '.5rem'}}>Bearbeiten</span> <span className="material-icons">edit</span>
                        </Button>
                    :
                        null
                    }
                    <Dropdown className="d-inline mx-2">
                        <Dropdown.Toggle id="dropdown-autoclose-true" className='d-flex align-items-center text-white'>
                            <span className="material-icons">playlist_add</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {(lists && lists.length>1 && recipe) ?
                                lists.map((list, index) => {
                                    if(list.title === 'Favoriten'){
                                        return null;
                                    }
                                    return (
                                        <Dropdown.Item key={index} onClick={() => handleAddToList(list.uuid, list.title)}>{list.title}</Dropdown.Item>
                                    );
                                }) : 'Keine Listen existent'
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    <ToastContainer position='bottom-end' className='mb-3 me-3'>
                        <Toast bg="secondary" show={showToast} delay={3000} autohide onClose={() => setShowToast(false)}>
                            <Toast.Header>
                                <strong className="me-auto">{listTitle}</strong>
                            </Toast.Header>
                            <Toast.Body>{toastMessage}</Toast.Body>
                        </Toast>
                    </ToastContainer>
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
                            getDrinkCategories().find((category) => category.id === recipe.category).label
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
                {/*<Row>
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
                </Row>*/}
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