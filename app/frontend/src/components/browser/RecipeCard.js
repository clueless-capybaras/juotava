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

    
    return (
        <>
        <style>
            {`
                .card:hover {
                    cursor: pointer;
                    transform: scale(1.01);
                }

                .card {
                    transition: transform 0.4s;
                }
            `}
        </style>
        <Card onClick={props.onClick} style={{paddingLeft: 0, paddingRight: 0}}>
            <Row className='g-0'>
                <Col sm='auto'>
                    <Card.Img src={image.base64data} alt={image.prompt} style={{maxWidth:'11rem'}} />
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
                        <Card.Text className='text-muted'>
                            {ingredients.map((ingr, index) => {
                                return(
                                    (index ? ", " : "") + ingr.name
                                );
                            })}
                        </Card.Text>
                    </Card.Body>
                </Col>
                <Col sm='auto' className='text-center me-3 mt-3'>
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
        </Card>
        </>
    );
}
export default RecipeCard;