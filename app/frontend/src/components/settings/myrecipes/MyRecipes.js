import { useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { AuthenticatedRequestWrapperContext } from '../../../App';
import {baseUrlRecipes } from '../../../config/config';

import { Button, Col, Row } from "react-bootstrap";

import GenericBrowser from "../../general/GenericBrowser";

function MyRecipes() {
    const arw = useContext(AuthenticatedRequestWrapperContext);
    const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();

    const [recipeExcerpts, setRecipeExcerpts] = useState([]);
    const [loadRecipeExcerptsSuccess, setLoadRecipeExcerptsSuccess] = useState('');
    useEffect(() => {
        setLoadRecipeExcerptsSuccess('waiting');
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'recipeexcerpt/mypublished', 'GET', undefined, setRecipeExcerpts, setLoadRecipeExcerptsSuccess, false);
    }, []);



    return (
        <Row>
            <Col>
                <GenericBrowser recipeExcerpts={recipeExcerpts} loadRecipeExcerptsSuccess={loadRecipeExcerptsSuccess} />
            </Col>
        </Row>
    );
}

export default MyRecipes;