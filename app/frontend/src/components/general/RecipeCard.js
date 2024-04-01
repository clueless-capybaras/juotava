import './RecipeCard.css';

import {Col, Container, Placeholder, Row, Card} from 'react-bootstrap';
import TextTruncate from 'react-text-truncate';
import LinesEllipsis from 'react-lines-ellipsis';

import { getDrinkCategories } from '../../helperFunctions/getDrinkCategories';

function RecipeCard({recipeExcerpt, handleClick}) {

    const getIngredientsString = (ingred) => {
        return ingred.map((ingr) => ingr.name).join(", ");
    }
    
    return (
        recipeExcerpt !== undefined &&
        <Card onClick={handleClick} style={{paddingLeft: 0, paddingRight: 0}}>
            <Row className='g-0'>
                <Col sm='auto'>
                    <div className="image-container">
                        <Card.Img src={recipeExcerpt.image.base64data} alt={recipeExcerpt.image.prompt} />
                    </div>
                </Col>
                <Col>
                    <Card.Body>
                        <Card.Title>{recipeExcerpt.title}</Card.Title>
                        <Card.Subtitle className='text-muted mb-2'>{getDrinkCategories().find(c => c.id === recipeExcerpt.category).label}{recipeExcerpt.nonAlcoholic ? <strong> (✅ alkoholfrei)</strong> : null}</Card.Subtitle>
                        <Card.Text>
                            <LinesEllipsis
                                text={recipeExcerpt.description}
                                maxLine='2'
                                ellipsis='...'
                                trimRight
                                basedOn='letters'
                            />
                        </Card.Text>
                        <Card.Text className="text-muted">
                            <LinesEllipsis
                                text={getIngredientsString(recipeExcerpt.ingredients)}
                                maxLine='1'
                                ellipsis='...'
                                trimRight
                                basedOn='letters'
                            />
                        </Card.Text>
                    </Card.Body>
                </Col>
                <Col sm="2" className='text-center pb-2'>
                    <Row>
                        <Col xs="6" sm="12">
                            <span className="material-icons mt-4">
                                favorite_border
                            </span>
                            <Card.Text className='text-muted'>
                                420K
                            </Card.Text>
                        </Col>
                        <Col xs="6" sm="12" className='mt-4'>
                            <span className="material-icons">
                                star_border
                            </span>
                            <Card.Text>
                                5
                            </Card.Text>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
}
export default RecipeCard;