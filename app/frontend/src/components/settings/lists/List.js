import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate, useParams } from 'react-router';

import { useState, useEffect, useContext } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";

import { AuthenticatedRequestWrapperContext } from '../../../App';
import { baseUrlRecipes } from '../../../config/config';

import GenericBrowser from '../../general/GenericBrowser';

function Lists() {
    const navigate = useNavigate();
    const arw = useContext(AuthenticatedRequestWrapperContext);
    const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();

    const [recipeExcerpts, setRecipeExcerpts] = useState([]);
    const [loadListSuccess, setLoadListSuccess] = useState('');

    const { uuid } = useParams();
    // send request for specific list
    useEffect(() => {
        setLoadListSuccess('waiting');
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'recipeexcerpt/list/'+ encodeURIComponent(uuid), 'GET', undefined, setRecipeExcerpts, setLoadListSuccess, true);
    }, []);

    return(
        <Container fluid>
            <Row className='mb-3'>
                <Col sm=''>
                    <span className="material-icons mx-3" onClick={() => navigate(-1)} style={{cursor: "pointer"}}>
                        arrow_back_ios_new 
                    </span>
                </Col>
            </Row>
            <Row>
                <Col>
                    <GenericBrowser recipeExcerpts={recipeExcerpts} loadRecipeExcerptsSuccess={loadListSuccess} />
                </Col>
            </Row>
            {loadListSuccess === 'success' && recipeExcerpts.length === 0 && 
                <Row className='justify-content-center text-center'>
                    <Col>
                        <Button variant='link' onClick={() => navigate('/browser')}>
                            Schau doch mal ins Rezeptbuch!
                        </Button>
                    </Col>
                </Row>
            }
        </Container>
    )
}

export default Lists;