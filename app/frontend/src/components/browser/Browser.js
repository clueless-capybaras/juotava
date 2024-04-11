import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { AuthenticatedRequestWrapperContext } from '../../App';
import {baseUrlRecipes } from '../../config/config';

import {Button, Col, Container, Row } from 'react-bootstrap'

import Filter from './filter/Filter';
import GenericBrowser from '../general/GenericBrowser';

function Browser() {
    const arw = useContext(AuthenticatedRequestWrapperContext);
    const {isAuthenticated, getAccessTokenSilently} = useAuth0();
    const navigate = useNavigate()
    
    // Refresh trigger for GenericBrowser
    // triggers a reload of the recipe excerpts when filter is changed
    const [refresh, setRefresh] = useState(0);
    const triggerRefresh = () => {
        setRefresh(refresh + 1);
    }
    const [search, setSearch] = useState('');
    const [recipeExcerpts, setRecipeExcerpts] = useState([]);
    const [loadRecipeExcerptsSuccess, setLoadRecipeExcerptsSuccess] = useState('');
    useEffect(() => {
        setLoadRecipeExcerptsSuccess('waiting');
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'recipeexcerpt/all'+search, 'GET', undefined, setRecipeExcerpts, setLoadRecipeExcerptsSuccess, false);
    }, [refresh, search]);

    return (
        <Container fluid className='mb-5'>
            <Row>
                <Col sm='3' className="mb-3" style={{zIndex: 3}}>
                    <Container style={{height: "100%"}}>
                        <Row className="position-sticky" style={{top: "5rem"}}>
                            <Col>
                                <Filter triggerRefresh={triggerRefresh} />
                            
                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col sm='9'>
                    <GenericBrowser recipeExcerpts={recipeExcerpts} loadRecipeExcerptsSuccess={loadRecipeExcerptsSuccess} setSearch={setSearch} inList={false}/>
                    {loadRecipeExcerptsSuccess === 'success' && recipeExcerpts.length === 0 &&
                        <Row className="text-center">
                            <Col>
                                <Button variant="link" onClick={() => navigate("/composer")}>Lade das erste Rezept hoch, das zu deiner Suche passt!</Button>                            
                            </Col>
                        </Row>
                    }
                </Col>
            </Row>
        </Container>
    );
}
export default Browser;