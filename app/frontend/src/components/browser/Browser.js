import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { AuthenticatedRequestWrapperContext } from '../../App';
import {baseUrlRecipes } from '../../config/config';
import {Button, Col, Container, Row} from 'react-bootstrap'
import RecipeCard from './RecipeCard';
import Recipe from '../general/Recipe';

function Browser(props) {
    const navigate = useNavigate();
    const arw = useContext(AuthenticatedRequestWrapperContext);
    const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();

    const [recipeExcerpts, setRecipeExcerpts] = useState([]);

    // send Request: RecipeExcerpts
    useEffect(() => {
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'recipeexcerpt/all', 'GET', undefined, setRecipeExcerpts, true);
    }, []);

    const handleOpenRecipe = ((uuid) => {
        //arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'recipe/'+ uuid, 'GET', undefined, setFullRecipe, true);
        console.log("open");
        navigate('/browser/recipe/'+uuid);
    });

    return (
        <>
        <Container className='mb-5'>
            <Row>
                <Col sm='3'>Filter</Col>
                <Col sm='8'>
                        {recipeExcerpts.length === 0 ? 
                            <h4 className="text-center my-5">Wir konnten leider keine passenden Rezepte finden...</h4>
                        : (
                            recipeExcerpts.map((item, index) => {
                                return(
                                    <Row key={index} className="mb-3">
                                        <RecipeCard 
                                            id={item.uuid} 
                                            onClick={() => handleOpenRecipe(item.uuid)} 
                                            recipeExcerpt={item}
                                        />
                                    </Row>
                                );
                            })
                        )}
                </Col>
            </Row>
        </Container>
        </>
    );
}
export default Browser;