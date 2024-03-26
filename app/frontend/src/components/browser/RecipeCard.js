import './RecipeCard.css';

import { useState } from 'react';
import {Col, Container, Placeholder, Row, Card} from 'react-bootstrap';
import TextTruncate from 'react-text-truncate';
import placeholderImage from '../../image-placeholder.jpeg'

function RecipeCard(props) {
    const [uuid, setUuid] = useState(props.recipeExcerpt.uuid);
    const [title, setTitle] = useState(props.recipeExcerpt.title);
    const [category, setCategory] = useState(props.recipeExcerpt.category);
    const [nonAlcoholic, setNonAlcoholic] = useState(props.recipeExcerpt.nonAlcoholic);
    const [description, setDescription] = useState(props.recipeExcerpt.description);
    const [ingredients, setIngredients] = useState(props.recipeExcerpt.ingredients);
    const [image, setImage] = useState(props.recipeExcerpt.image);

    const getIngredientsString = (ingred) => {
        return ingred.map((ingr) => ingr.name).join(", ");
    }

    const [ingrString, setIngrString] = useState("");
    
    return (
        <Card onClick={props.onClick} style={{paddingLeft: 0, paddingRight: 0}}>
            <Row className='g-0'>
                <Col sm='auto'>
                    <div className="image-container">
                        <Card.Img src={image.base64data} alt={image.prompt} />
                    </div>
                </Col>
                <Col>
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Subtitle className='text-muted mb-2'>{category}{nonAlcoholic ? <strong> (✅ alkoholfrei)</strong> : null}</Card.Subtitle>
                        <Card.Text>
                            <TextTruncate
                                line={2}
                                element="span"
                                text={description}
                            />
                        </Card.Text>
                        <Card.Text className="text-muted">
                            <TextTruncate
                                line={1}
                                element="span"
                                text={getIngredientsString(ingredients)}
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