import {Col, Container, Row, Card} from 'react-bootstrap';
import placeholderImage from '../../image-placeholder.jpeg'

function RecipeCard(props) {
    return (
        <Card style={{paddingLeft: 0, paddingRight: 0}}>
            <Row className='g-0'>
                <Col sm='auto'>
                    <Card.Img src={placeholderImage} alt='...' style={{maxWidth:'10rem'}} fluid />
                </Col>
                <Col>
                    <Card.Body>
                        <Card.Title>Card title</Card.Title>
                        <Row>
                            <Col>
                                <Card.Text>
                                    This is a wider card with supporting text below as a natural lead-in to additional content. This
                                    content is a little bit longer.
                                </Card.Text>
                                <Card.Text className='text-muted'>
                                    Last updated 3 mins ago
                                </Card.Text>
                            </Col>
                            <Col sm='auto' className='text-center'>
                                <span className="material-icons">
                                    favorite_border
                                </span>
                                <Card.Text className='text-muted'>
                                    420K
                                </Card.Text>
                                <span className="material-icons">
                                    star_border
                                </span>
                                <Card.Text>
                                    5
                                </Card.Text>
                            </Col>
                        </Row>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}
export default RecipeCard;