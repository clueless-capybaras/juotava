import { useEffect, useState } from 'react';

import { Button, Card, Col, Collapse, Row } from 'react-bootstrap';

function DrinkOfTheDayReasoning({drinkOfTheDay}) {
    const [drink, setDrink] = useState(drinkOfTheDay);
    useEffect(() => {
        setDrink(drinkOfTheDay);
    }, [drinkOfTheDay]);

    const [open, setOpen] = useState(false);

    return (

        drink !== undefined &&
        <Row>
            <Col>
                <Button variant="link" onClick={() => setOpen(!open)}>Warum dieser Drink?</Button>
            
            </Col>
            <Collapse in={open}>
                <Card>
                    <Card.Body>
                    <Card.Text>
                    {drink?.reasoning}
                    </Card.Text>
                    </Card.Body>
                </Card>
            </Collapse>
        </Row>
        
    );
}
export default DrinkOfTheDayReasoning;
