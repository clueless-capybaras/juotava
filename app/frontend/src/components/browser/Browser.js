import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { AuthenticatedRequestWrapperContext } from '../../App';
import {baseUrlRecipes } from '../../config/config';

import {Button, Col, Container, Pagination, Row } from 'react-bootstrap'

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
    // handle search and pagination
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [response, setResponse] = useState({});
    const [loadRecipeExcerptsSuccess, setLoadRecipeExcerptsSuccess] = useState('');
    useEffect(() => {
        let path = "?";
        let p = page;
        let s = search;
        if(search !== '') { path += "search=" + s + "&"; }
        path += "page=" + p;
        path += "&size=10";
        console.log(path);
        sendRequest(path);
    }, [refresh, search, page]);

    const sendRequest = (path) => {
        setLoadRecipeExcerptsSuccess('waiting');
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'recipeexcerpt/all'+path, 'GET', undefined, setResponse, setLoadRecipeExcerptsSuccess, true);
    }

    return (
        <>
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
                    {loadRecipeExcerptsSuccess === 'success' && response.excerpts.length === 0 &&
                        <Row className="text-center">
                            <Col>
                                <Button variant="link" onClick={() => navigate("/composer")}>Lade das erste Rezept hoch, das zu deiner Suche passt!</Button>                            
                            </Col>
                        </Row>
                    }
                    {loadRecipeExcerptsSuccess === 'success' && response.excerpts.length > 0 &&
                        <GenericBrowser recipeExcerpts={response.excerpts} loadRecipeExcerptsSuccess={loadRecipeExcerptsSuccess} search={search} setSearch={setSearch} frontendSearch={false} />
                    }
                </Col>
            </Row>
        </Container>
        <Container className="d-flex justify-content-center">
            <Row>
                <Col>
                    <Pagination>
                        <Pagination.First onClick={() => setPage(0)} disabled={loadRecipeExcerptsSuccess === 'error' || response.currentPage === 0} />
                        <Pagination.Prev onClick={() => setPage(response.currentPage-1)} disabled={loadRecipeExcerptsSuccess === 'error' || response.currentPage === 0} />
                        {loadRecipeExcerptsSuccess === 'success' && response &&
                            Array.from({length: response.totalPages}, (_, i) => i + 1).map((p) => {
                                return (
                                    <Pagination.Item key={p} active={p-1 === response.currentPage} onClick={() => setPage(p-1)}>{p}</Pagination.Item>
                                );
                            })
                        }
                        <Pagination.Next onClick={() => setPage(response.currentPage+1)} disabled={loadRecipeExcerptsSuccess === 'error' || response.currentPage === response.totalPages-1} />
                        <Pagination.Last onClick={() => setPage(response.totalPages-1)} disabled={loadRecipeExcerptsSuccess === 'error' || response.currentPage === response.totalPages-1} />
                    </Pagination>
                </Col>
                {loadRecipeExcerptsSuccess === 'success' && response.totalItems > 0 &&
                    <Col className="d-flex justify-content-end">
                        {response.excerpts.length} von {response.totalItems} Rezepten
                    </Col>
                }
            </Row>
        </Container>
        </>
    );
}
export default Browser;