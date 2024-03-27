import { useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { AuthenticatedRequestWrapperContext } from '../../../App';
import {baseUrlRecipes } from '../../../config/config';

import { Col, Container, Form, Row, Spinner } from 'react-bootstrap';

import FilterModel from '../../../model/filterModel';
import CheckboxDropdown from './CheckboxDropwdown';
import { getDrinkCategories } from '../../../helperFunctions/getDrinkCategories';

function Filter({loadRecipeExcerptsSuccess}) {
    const arw = useContext(AuthenticatedRequestWrapperContext);
    const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();
    const [filterSuccess, setFilterSuccess] = useState('');

    const [filter, setFilter] = useState(
        new FilterModel(
            '', false, [/*getDrinkCategories().map((category) => category.label)*/]
        )
    );

    // Checkbox Dropdown Category Items
    useEffect(() => {
        setFilterSuccess('waiting');
        if(loadRecipeExcerptsSuccess === 'success') {
            arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'filter/my', 'GET', undefined, setFilter, setFilterSuccess, true);
        }

    }, [loadRecipeExcerptsSuccess]);

    const handleChangeNonAlcoholicOnly = (event) => {
        let temp = filter;
        temp.showNonAlcoholicOnly = event.target.checked;
        setFilter({...temp});
        saveFilter(temp);
    }

    const [saveFilterSuccess, setSaveFilterSuccess] = useState('');
    const saveFilter = (newFilter) => {
        setSaveFilterSuccess('waiting');
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'filter/save', 'POST', JSON.stringify(newFilter), null, setSaveFilterSuccess, true);
    }

    return (
        <Container>
        <h4>Filter</h4>

        {/* Filter by category */}
        {filterSuccess === 'waiting' ?
            <h4 className="text-center my-5">
                <Spinner animation="border" role="status" />
            </h4>
        : null}
        {filterSuccess === 'error' ?
            <h4 className="text-center my-5">
                Filter konnten nicht gefunden werden.
            </h4>
        : null}
        {filterSuccess === 'success' && filter == null ?
        "Fehler"
        :
        <>
        <Row className="mb-2">
            <Col>
            </Col>
        </Row>
        <Row>
            <Form.Check type="checkbox" label="alkoholfrei" checked={filter.showNonAlcoholicOnly} onChange={(event) => handleChangeNonAlcoholicOnly(event)} />
            <Form.Check type="checkbox" label="vegan" disabled />
            <Form.Check type="checkbox" label="laktosefrei" disabled />
        </Row>
        </>
        
        }       
        </Container>
    );
}

export default Filter;