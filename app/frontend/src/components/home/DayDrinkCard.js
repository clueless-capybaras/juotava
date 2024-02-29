import {Col, Container, Row, Card} from 'react-bootstrap';
import placeholderImage from '../../image-placeholder.jpeg'

function DayDrinkCard(props) {
    return (
        <Card className="text-center" style={{width: '18rem', paddingLeft: 0, paddingRight: 0 }}>
            <Card.Header>
                <Card.Title>Drink des Tages</Card.Title>
            </Card.Header>
            <Card.Img variant='bottom' src={placeholderImage} alt='...' style={{width:'auto'}} />
            <Card.Footer>
                <Row>
                    <Col xs='3' className="justify-content-start">
                        <span className="material-icons">
                            favorite_border
                        </span>
                        <Card.Text className='text-muted'>
                            1,3K
                        </Card.Text>
                    </Col>
                    <Col xs='6' className="justify-content-center">
                        <Card.Text>
                            Drink Name
                        </Card.Text>
                    </Col>
                    <Col xs='3' className="justify-content-end">
                        <span className="material-icons">
                            star_border
                        </span>
                        <Card.Text>
                            4,7
                        </Card.Text>
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    );
}
export default DayDrinkCard;
