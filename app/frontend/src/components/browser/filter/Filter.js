import { useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { AuthenticatedRequestWrapperContext } from '../../../App';
import {baseUrlRecipes } from '../../../config/config';

import { Col, Container, Form, Row, Spinner } from 'react-bootstrap';

import FilterModel from '../../../model/filterModel';
import CheckboxDropdown from './CheckboxDropwdown';
import { getDrinkCategories } from '../../../helperFunctions/getDrinkCategories';

function Filter({loadRecipeExcerptsSuccess, triggerRefresh}) {
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
            arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'filter/my', 'GET', undefined, setFilter, setFilterSuccess, false);
        }

    }, [loadRecipeExcerptsSuccess]);

    const handleChangeNonAlcOnly = (event) => {
        let temp = {...filter};
        temp.showNonAlcOnly = event.target.checked;
        setFilter(temp);
        saveFilter(temp);
    }

    const [saveFilterSuccess, setSaveFilterSuccess] = useState('');
    const saveFilterSuccessHandler = (msg) => {
        setSaveFilterSuccess(msg);
        if (msg === 'success') {
            triggerRefresh();
        }
    }
    const saveFilter = (newFilter) => {
        setSaveFilterSuccess('waiting');
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'filter/save', 'POST', JSON.stringify(newFilter), undefined, saveFilterSuccessHandler, false);
    }

    return (
        <Container>
        <h4>Filter</h4>

        {/* Filter by category */}
        {filterSuccess === 'waiting' ?
            <h4 className="text-center my-5">
                Lade Filter <br />
                <Spinner animation="border" role="status" />
            </h4>
        : null}
        {filterSuccess === 'error' ?
            <h4 className="text-center my-5">
                Filter konnten nicht gefunden werden.
            </h4>
        : null}
        {filterSuccess === 'success' ?
        <Row>
            <Form.Check type="checkbox" label="alkoholfrei" checked={filter.showNonAlcOnly} onChange={(event) => handleChangeNonAlcOnly(event)} />
            <Form.Check type="checkbox" label="vegan" disabled />
            <Form.Check type="checkbox" label="laktosefrei" disabled />
        </Row>
        : null
        }       
        </Container>
    );
}

export default Filter;