import {React, useContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { AuthenticatedRequestWrapperContext } from '../../App';
import { useAuth0 } from '@auth0/auth0-react';
import { baseUrlRecipes } from '../../config/config';

import { Button, Col, Container, Row } from 'react-bootstrap';

import DrinkOfTheDayReasoning from './DrinkOfTheDayReasoning';
import RecipeCard from '../general/RecipeCard';

import filterModel from '../../model/filterModel';
import { getDrinkCategories } from '../../helperFunctions/getDrinkCategories';

function Home(props) {
    const arw = useContext(AuthenticatedRequestWrapperContext);
    const {isAuthenticated, getAccessTokenSilently} = useAuth0();
    const [loadDrinkOfTheDaySuccess, setLoadDrinkOfTheDaySuccess] = useState('');
    const [showLoadingMessage, setShowLoadingMessage] = useState(false);
    const [drinkOfTheDay, setDrinkOfTheDay] = useState();
    const navigate = useNavigate();
    const [filter, setFilter] = useState(new filterModel(false, []));
    const [filterSuccess, setFilterSuccess] = useState('');
        


    useEffect(() => {
        setLoadDrinkOfTheDaySuccess('waiting');
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'drinkoftheday', 'GET', undefined, setDrinkOfTheDay, setLoadDrinkOfTheDaySuccess, false);
        setFilterSuccess('waiting');
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'filter/my', 'GET', undefined, setFilter, setFilterSuccess, false);

        setTimeout(() => {
            setShowLoadingMessage(true);
        }, 300);
    }, []);

    const handleCategoryButtonClick = (category) => {
        let temp = {...filter};
        temp.showNonAlcOnly = false;
        temp.categories = [category.id];
        setFilter(temp);
        saveFilter(temp);
    }
    const [saveFilterSuccess, setSaveFilterSuccess] = useState('');
    const saveFilterSuccessHandler = (msg) => {
        setSaveFilterSuccess(msg);
        if (msg === 'success') {
            navigate('/browser');
        }
    }
    const saveFilter = (newFilter) => {
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'filter/save', 'POST', JSON.stringify(newFilter), setFilter, saveFilterSuccessHandler, false);
    }

    return (
        <>
            <Container className='justify-content-center pl-4 pr-4'>
                <Row>
                    <Col>
                        <h1 className='mb-5'>Drink des Tages</h1>
                    </Col>
                </Row>
                {loadDrinkOfTheDaySuccess === 'waiting' && showLoadingMessage && 
                    <Row className='justify-content-center mb-5'>
                        <Col className='text-center'>
                            <h4>Drink des Tages wird gerade frisch für dich zubereitet. Bitte warte noch einen Moment.</h4>
                        </Col>
                    </Row>}
                {loadDrinkOfTheDaySuccess === 'error' && 
                    <Row className='justify-content-center mb-5'>
                        <Col className='text-center'>
                            <h4>Bei der Zubereitung des Drink des Tages ist ein Fehler aufgetreten.</h4> 
                            <p>Wir werden ein ernstes Wörtchen mit dem Barkeeper reden. Bitte versuche es später noch einmal.</p>
                        </Col>
                    </Row>}
                {loadDrinkOfTheDaySuccess === 'success' &&
                <Row className='justify-content-center'>
                    <Col xs={12} sm={8}>
                        <Row className="justify-content-center mb-2">
                            <Col>
                                <RecipeCard handleClick={() => navigate('/browser/recipe/'+drinkOfTheDay?.recipe.uuid)} recipeExcerpt={drinkOfTheDay?.recipe} />
                            </Col>
                        </Row>
                        <Row className="justify-content-start mb-5">
                            <Col>
                                <DrinkOfTheDayReasoning drinkOfTheDay={drinkOfTheDay} />
                            </Col>
                        </Row>

                    </Col>
                </Row>
                }
                <Row>
                    <Col>
                    <h2 className='mb-3'>Finde deinen Lieblingsdrink!</h2>
                    </Col>
                </Row>
                <Row className="text-center">
                    {getDrinkCategories().map((category, index) => {
                        return (
                        <Col key={index}>
                            <Button id={category.id} variant="link" onClick={() => handleCategoryButtonClick(category)}>{category.label}</Button>
                        </Col>);
                    })}
                </Row>
            </Container>
        </>
        
    );
}
export default Home;