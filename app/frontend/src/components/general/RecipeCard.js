import './RecipeCard.css';

import {Col, Row, Card} from 'react-bootstrap';
import LinesEllipsis from 'react-lines-ellipsis';

import { getDrinkCategories } from '../../helperFunctions/getDrinkCategories';
import { useContext, useEffect, useState } from 'react';
import { AuthenticatedRequestWrapperContext } from '../../App';
import { useAuth0 } from '@auth0/auth0-react';
import { baseUrlRecipes } from '../../config/config';
import { useNavigate } from 'react-router';

function RecipeCard({recipeExcerpt, handleClick, inList, setInList, listId}) {
    const arw = useContext(AuthenticatedRequestWrapperContext);
    const {isAuthenticated, getAccessTokenSilently} = useAuth0();
    const navigate = useNavigate();

    const [favorite, setFavorite] = useState(recipeExcerpt?.favorite);
    const [toggleFavoriteSuccess, setToggleFavoriteSuccess] = useState('');
    const [removeFromListSuccess, setRemoveFromListSuccess] = useState('');

    useEffect(() => {
        setFavorite(recipeExcerpt?.favorite);
    }, [recipeExcerpt?.favorite]);

    const getIngredientsString = (ingred) => {
        return ingred.map((ingr) => ingr.name).join(", ");
    }

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        setToggleFavoriteSuccess('waiting');
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'list/favorite', favorite?'DELETE':'POST', recipeExcerpt.uuid, undefined, setToggleFavoriteSuccess, false);
        setFavorite(!favorite);
    }

    const handleRemoveFromList = (e) => {
        e.stopPropagation();
        setRemoveFromListSuccess('waiting');
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'list/'+ listId +'/remove', 'POST', recipeExcerpt.uuid, undefined, setRemoveFromListSuccess, false);
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
                <Col sm="1" className='text-center pb-2'>
                    <Row>
                        <Col /*xs="6" sm="12"*/>
                            <span className="material-icons my-4 favButton" onClick={handleFavoriteClick}>
                                favorite{!favorite && '_border'}
                            </span>    
                        </Col>
                    </Row>
                    {inList &&
                        <Row>
                            <Col>
                                <span class="material-icons-outlined deleteButton" onClick={handleRemoveFromList}>
                                    playlist_remove
                                </span>
                            </Col>
                        </Row>
                    }
                    {removeFromListSuccess === 'success' && setInList(false)}
                    {toggleFavoriteSuccess === 'success' && setInList && setInList(false)}
                </Col>
            </Row>
        </Card>
    );
}
export default RecipeCard;