import {React, useContext, useEffect, useState} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {baseUrlRecipes } from '../../config/config';
import { AuthenticatedRequestWrapperContext } from '../../App';

import { Button, Col, Form, Image, Modal, Row, Container } from 'react-bootstrap';

import placeholderImage from '../../image-placeholder.jpeg'
import Recipe from '../general/Recipe';
import { getDrinkCategories } from '../../helperFunctions/getDrinkCategories';

function Bartinder(props) {
    const arw = useContext(AuthenticatedRequestWrapperContext);
    const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();

    const [bartinderFilter, setBartinderFilter] = useState({});
    const [loadBartinderFilterSuccess, setLoadBartinderFilterSuccess] = useState('');
    const [saveBartinderFilterSuccess, setSaveBartinderFilterSuccess] = useState('');

    const [recipe, setRecipe] = useState();
    const [loadRecipeSuccess, setLoadRecipeSuccess] = useState('');

    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const getIngredientsString = (ingred) => {
        return ingred?.map((ingr) => ingr.name).join(", ");
    }
    
    const loadBartinderFilter = () => {
        setLoadBartinderFilterSuccess('waiting');
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'bartinder/filter', 'GET', undefined, setBartinderFilter, afterLoadBartinderFilter, false);
    }
    const afterLoadBartinderFilter = (successMessage) => {
        setLoadBartinderFilterSuccess(successMessage);
        if (successMessage === 'error') {
            let tmp = {categories: [], showNonAlcOnly: false, correspondingUser: user.sub};
            getDrinkCategories().forEach((cat) => {
                tmp.categories.push(cat.id);
            });
            setBartinderFilter(tmp);
            setShowModal(true);
        } else {
            loadRecipe();
        }
    }

    const loadRecipe = () => {
        setLoadRecipeSuccess('waiting');
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'bartinder/random', 'GET', undefined, setRecipe, setLoadRecipeSuccess, false);
    }

    const handleCategoryChange = (checked, categoryId) => {
        if (checked) {
            setBartinderFilter({...bartinderFilter, categories: [...bartinderFilter?.categories, categoryId]});
        } else {
            setBartinderFilter({...bartinderFilter, categories: bartinderFilter?.categories.filter((cat) => cat !== categoryId)});
        }
    }

    const handleAlcoholChange = (checked) => {
        setBartinderFilter({...bartinderFilter, showNonAlcOnly: checked});
    }

    const saveBartinderFilter = () => {
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'bartinder/filter', 'POST', JSON.stringify(bartinderFilter), undefined, afterSaveBartinderFilter, false);
    }
    const afterSaveBartinderFilter = (successMessage) => {
        setSaveBartinderFilterSuccess(successMessage);
        if (successMessage === 'success') {
            loadRecipe();
            handleClose();
        }
    }

    const handleLike = (liked) => {
        const suggestion = {
            recipeUuid: recipe.uuid,
            liked: liked,
        }
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'bartinder/suggestion', 'POST', JSON.stringify(suggestion), undefined, afterSuggestion, true);
    }
    const afterSuggestion = (successMessage) => {
        if (successMessage === 'success') {
            loadRecipe();
        }
    }


    useEffect(() => {
        loadBartinderFilter();
    }, []);

    return (
        <>
        <Container fluid>
            <Row>
                <Col className='text-end'>
                    <Button variant='primary' className='text-white' onClick={handleShow}>
                        <span className="material-icons-outlined inline-icon">
                            tune
                        </span>
                    </Button>
                </Col>
            </Row>
            {loadRecipeSuccess === 'waiting' && <Row><Col><h4>Rezept wird geladen...</h4></Col></Row>}
            {loadRecipeSuccess === 'error' && <Row><Col className='text-center'><h4>Es gab keine passenden Rezepte. Bitte ändere deine Präferenzen.</h4></Col></Row>}
            {loadRecipeSuccess === 'success' &&
            <>
            <Row>
                <Col className='justify-content-center mb-3'>
                    <h2>{recipe?.title}</h2>
                </Col>
            </Row>
            <Row>
                <Col className='text-end'>
                    <Container className='justify-content-end mb-5'>
                        <Row className='justify-content-end'>
                            <h4>Zutaten</h4>
                        </Row>
                        <Row className='justify-content-end'>
                            {getIngredientsString(recipe?.ingredients)}
                        </Row>
                    </Container>
                    <Container className='justify-content-end mb-5'>
                    {recipe?.nonAlcoholic? 
                        'Dieser Drink ist alkoholfrei.' :
                        'Dieser Drink enthält Alkohol.'
                    }
                    </Container>
                </Col>
                <Col>
                    <Row className='mb-3'>
                        <Image src={recipe?.image.base64data} rounded />
                    </Row>
                    <Row>
                        <Col className='text-center'>
                            <Button variant='secondary' style={{ fontSize: '2rem', padding: '10px 20px' }} onClick={()=>handleLike(false)}>
                                🤢
                            </Button>
                            
                        </Col>
                        <Col className='text-center'>
                            <Button variant='primary' style={{ fontSize: '2rem', padding: '10px 20px' }} onClick={()=>handleLike(true)}>
                                😋
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Col></Col>
            </Row>
            </>}
        </Container>

        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Präferenzen</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                    <h5>Kategorien</h5>
                    {getDrinkCategories().map((category, key) => {
                        return (
                            <Form.Check
                                key={key}
                                type={'checkbox'}
                                label={category.label}
                                checked={bartinderFilter?.categories?.includes(category.id)}
                                onChange={(e) => {handleCategoryChange(e.target.checked, category.id)}}
                            />
                        );
                    })}
                    </Col>
                    <Col>
                        <h5>Alkoholgehalt</h5>
                        <Form.Check
                            type='checkbox'
                            name='alkoholgehalt'
                            label='nur alkoholfrei'
                            checked={bartinderFilter?.showNonAlcOnly === true}
                            onChange={(e) => handleAlcoholChange(e.target.checked)}
                        />
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Abbrechen
            </Button>
            <Button variant="primary" className='text-white' onClick={saveBartinderFilter}>
                Speichern
            </Button>
            </Modal.Footer>
        </Modal>
      </>
    );
}
export default Bartinder;