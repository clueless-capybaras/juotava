import React from 'react';
import DayDrinkCard from './DayDrinkCard';
import { Col, Row, Container } from 'react-bootstrap';

function Home(props) {
    return (
        <>
            <h1 className='mb-5'>Willkommen</h1>
            <Row className="justify-content-center mb-5"><DayDrinkCard /></Row>
            <Container className='justify-content-center'>
                <h2 className='mb-3'>Finde deinen Lieblingsdrink!</h2>
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