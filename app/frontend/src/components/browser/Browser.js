import {Col, Container, Row} from 'react-bootstrap'
import RecipeCard from '../general/RecipeCard';

function Browser(props) {
    return (
        <>
        <Container className='mb-5'>
            <Row>
                <Col sm='3'>Filter</Col>
                <Col sm='8'>
                    <Row className='mb-3'>
                        <RecipeCard />
                    </Row>
                    <Row className='mb-3'>
                        <RecipeCard />
                    </Row>
                </Col>
            </Row>
        </Container>
        </>
    );
}
export default Browser;