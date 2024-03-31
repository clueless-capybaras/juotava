import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Col, Row, Spinner } from 'react-bootstrap';

import RecipeCard from './RecipeCard';

function GenericBrowser({recipeExcerpts, loadRecipeExcerptsSuccess}) {
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
                                recipeExcerpt={excerpt}
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