import { useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { AuthenticatedRequestWrapperContext } from '../../App';
import {baseUrlRecipes } from '../../config/config';

import {Col, Container, Row } from 'react-bootstrap'

import Filter from './filter/Filter';
import GenericBrowser from '../general/GenericBrowser';

function Browser() {
    const arw = useContext(AuthenticatedRequestWrapperContext);
    const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();

    // Refresh trigger for GenericBrowser
    // triggers a reload of the recipe excerpts when filter is changed
    const [refresh, setRefresh] = useState(0);
    const triggerRefresh = () => {
        setRefresh(refresh + 1);
    }
    const [recipeExcerpts, setRecipeExcerpts] = useState([]);
    const [loadRecipeExcerptsSuccess, setLoadRecipeExcerptsSuccess] = useState('');
    useEffect(() => {
        setLoadRecipeExcerptsSuccess('waiting');
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'recipeexcerpt/all', 'GET', undefined, setRecipeExcerpts, setLoadRecipeExcerptsSuccess, false);
    }, [refresh]);

    return (
        <Container fluid className='mb-5'>
            <Row>
                <Col sm='3'>
                    <Filter triggerRefresh={triggerRefresh} />
                </Col>
                <Col sm='9'>
                    <GenericBrowser recipeExcerpts={recipeExcerpts} loadRecipeExcerptsSuccess={loadRecipeExcerptsSuccess} />
                </Col>
            </Row>
        </Container>
    );
}
export default Browser;