import { useEffect, useState } from 'react';

import { Card } from 'react-bootstrap';

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
