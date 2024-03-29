import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { AuthenticatedRequestWrapperContext } from '../../App';
import {baseUrlRecipes } from '../../config/config';

import { Col, Row, Spinner } from 'react-bootstrap';

import RecipeCard from './RecipeCard';

function GenericBrowser({refresh}) {
    const arw = useContext(AuthenticatedRequestWrapperContext);
    const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();

    const [recipeExcerpts, setRecipeExcerpts] = useState([]);
    const [loadRecipeExcerptsSuccess, setLoadRecipeExcerptsSuccess] = useState('');
    useEffect(() => {
        setLoadRecipeExcerptsSuccess('waiting');
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'recipeexcerpt/all', 'GET', undefined, setRecipeExcerpts, setLoadRecipeExcerptsSuccess, false);
    }, [refresh]);

    const navigate = useNavigate();
    const handleOpenRecipe = ((uuid) => {
        navigate('/browser/recipe/'+uuid);
    });

    return(
        <>
        {loadRecipeExcerptsSuccess === 'waiting' ?
            <h4 className="text-center my-5">
                Lade Rezepte <br />
                <Spinner animation="border" role="status" />
            </h4>
        : ''
        }
        {loadRecipeExcerptsSuccess === 'error' ?
            <h4 className="text-center my-5">
                Beim Laden der Rezepte ist ein Fehler aufgetreten, das tut uns leid!
            </h4>
        : ''
        }
        {loadRecipeExcerptsSuccess === 'success' && recipeExcerpts.length === 0 ? 
            <h4 className="text-center my-5">
                Wir konnten leider keine passenden Rezepte finden...
            </h4>
        : (
            recipeExcerpts.map((excerpt, index) => {
                return(
                    <Row key={index} className="mb-3" style={{margin: 0}}>
                        <Col>
                            <RecipeCard 
                                id={excerpt.uuid} 
                                handleClick={() => handleOpenRecipe(excerpt.uuid)} 
                                excerpt={excerpt}
                            />
                        </Col>
                    </Row>
                );
            })
        )}
        </>
    );
}

export default GenericBrowser;