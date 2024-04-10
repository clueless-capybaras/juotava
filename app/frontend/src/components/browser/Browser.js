import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { AuthenticatedRequestWrapperContext } from '../../App';
import {baseUrlRecipes } from '../../config/config';

import {Button, Col, Container, Form, Pagination, Row } from 'react-bootstrap'

import Filter from './filter/Filter';
import GenericBrowser from '../general/GenericBrowser';
import CustomPagination from './CustomPagination';

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
    const [size, setSize] = useState(16);
    const [response, setResponse] = useState({});
    const [loadRecipeExcerptsSuccess, setLoadRecipeExcerptsSuccess] = useState('');
    useEffect(() => {
        let path = "?";
        let p = page;
        let s = search;
        if(search !== '') { path += "search=" + s + "&"; }
        path += "page=" + p;
        path += "&size=" + size;
        console.log(path);
        sendRequest(path);
    }, [refresh, search, size, page]);
    const handleChangePageSize = (event) => {
        setSize(event.target.value);
    }
    const sendRequest = (path) => {
        setLoadRecipeExcerptsSuccess('waiting');
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'recipeexcerpt/all'+path, 'GET', undefined, setResponse, setLoadRecipeExcerptsSuccess, true);
    }

    return (
        <Container fluid>
            <Row>
                {/* Filter */}
                <Col sm='3' className="mb-3" style={{zIndex: 3}}>
                    <Container style={{height: "100%"}}>
                        <Row className="position-sticky" style={{top: "5rem"}}>
                            <Col>
                                <Filter triggerRefresh={triggerRefresh} />
                            
                            </Col>
                        </Row>
                    </Container>
                </Col>
                
                {/* Browser */}
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

                {/* Pagination */}
                {loadRecipeExcerptsSuccess === 'success' && response &&
                    <Container className="mb-3">
                        <Row>
                            <Col className="my-auto">
                                <Row>
                                    <Col xs="auto">
                                        <Form.Select defaultValue={size} size="sm" onChange={(event) => handleChangePageSize(event)} style={{width: "auto"}}>
                                            <option value={8}>8</option>
                                            <option value={16}>16</option>
                                            <option value={32}>32</option>
                                        </Form.Select>
                                    </Col>
                                    <Col className="my-auto" style={{padding: "0"}}>
                                        pro Seite
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="d-flex justify-content-center">
                                <CustomPagination setPage={setPage} currentPage={response.currentPage} totalPages={response.totalPages} totalItems={response.totalItems} />
                            </Col>
                            <Col className="text-end my-auto">
                                {(response.currentPage)*size + response.excerpts.length} von {response.totalItems} Rezepten gesehen
                                </Col>
                        </Row>
                    </Container>
                    }
                </Col>
            </Row>
        </Container>
    );
}
export default Browser;