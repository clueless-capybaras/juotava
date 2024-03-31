import {React, useContext, useEffect, useState } from 'react';
import DayDrinkCard from './DayDrinkCard';
import { Col, Row, Container } from 'react-bootstrap';
import { AuthenticatedRequestWrapperContext } from '../../App';
import { useAuth0 } from '@auth0/auth0-react';
import { baseUrlRecipes } from '../../config/config';
import RecipeCard from '../general/RecipeCard';

function Home(props) {
    const arw = useContext(AuthenticatedRequestWrapperContext);
    const {isAuthenticated, getAccessTokenSilently} = useAuth0();
    const [loadDrinkOfTheDaySuccess, setLoadDrinkOfTheDaySuccess] = useState('');
    const [showLoadingMessage, setShowLoadingMessage] = useState(false);
    const [drinkOfTheDay, setDrinkOfTheDay] = useState();

    useEffect(() => {
        setLoadDrinkOfTheDaySuccess('waiting');
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'drinkoftheday', 'GET', undefined, setDrinkOfTheDay, setLoadDrinkOfTheDaySuccess, false);

        setTimeout(() => {
            setShowLoadingMessage(true);
        }, 300);
    }, []);

    return (
        <>
            <Container className='justify-content-center pl-4 pr-4'>
                <Row>
                    <Col>
                        <h1 className='mb-5'>Drink des Tages</h1>
                    </Col>
                </Row>
                {loadDrinkOfTheDaySuccess === 'waiting' && showLoadingMessage && 
                    <Row className='justify-content-center'>
                        <Col className='text-center'>
                            <h4>Drink des Tages wird gerade frisch für dich zubereitet. Bitte warte noch einen Moment.</h4>
                        </Col>
                    </Row>}
                {loadDrinkOfTheDaySuccess === 'error' && 
                    <Row className='justify-content-center'>
                        <Col className='text-center'>
                            <h4>Bei der Zubereitung des Drink des Tages ist ein Fehler aufgetreten.</h4> 
                            <p>Wir werden ein ernstes Wörtchen mit dem Barkeeper reden. Bitte versuche es später noch einmal.</p>
                        </Col>
                    </Row>}
                <Row className='justify-content-center'>
                    <Col xs={12} sm={8}>
                        <Row className="justify-content-center mb-5">
                            <Col>
                                <RecipeCard excerpt={drinkOfTheDay?.recipe} />
                            </Col>
                        </Row>
                        <Row className="justify-content-center mb-5">
                            <Col>
                                <DayDrinkCard drinkOfTheDay={drinkOfTheDay} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                
                <Row>
                    <Col>
                    <h2 className='mb-3'>Finde deinen Lieblingsdrink!</h2>
                    </Col>
                </Row>
                <Row className="text-center">
                    <Col>cocktails</Col>
                    <Col>coffee</Col>
                    <Col>smoothies</Col>
                    <Col>juices</Col>
                    <Col>lemonades</Col>
                    <Col>longdrinks</Col>
                    <Col>shots</Col>
                </Row>
            </Container>
        </>
        
    );
}
export default Home;