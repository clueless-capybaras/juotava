import {Col, Container, Row, Card} from 'react-bootstrap';
import placeholderImage from '../../image-placeholder.jpeg'
import { useEffect, useState } from 'react';
import TextTruncate from 'react-text-truncate';

function DayDrinkCard({drinkOfTheDay}) {
    const [drink, setDrink] = useState(drinkOfTheDay);
    useEffect(() => {
        setDrink(drinkOfTheDay);
    }, [drinkOfTheDay]);

    return (
        drink !== undefined &&
        <Card>
            <Card.Header>
                <Card.Title>Warum dieser Drink?</Card.Title>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    {drink?.reasoning}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
export default DayDrinkCard;
