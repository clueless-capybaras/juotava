import { useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { AuthenticatedRequestWrapperContext } from '../../../App';
import {baseUrlRecipes } from '../../../config/config';

import { Col, Container, Form, Row, Spinner } from 'react-bootstrap';

import CheckboxDropdown from './CheckboxDropwdown';
import { getDrinkCategories } from '../../../helperFunctions/getDrinkCategories';

function Filter(props) {
    const arw = useContext(AuthenticatedRequestWrapperContext);
    const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();
    const [filterSuccess, setFilterSuccess] = useState('');

    const [filter, setFilter] = useState({});
    const [nonAlcoholic, setNonAlcoholic] = useState(false);


    // Checkbox Dropdown Category Items
    const [categoryItems, setCategoryItems] = useState([]);
    useEffect(() => {
        setFilterSuccess('waiting');
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'filter/my', 'GET', undefined, setFilter, setFilterSuccess, true);

        /*getDrinkCategories().map((category) => {
            setCategoryItems(categoryItems => [
                ...categoryItems, 
                { id: category.id, label: category.label, checked: true }
            ]);
        });*/
    }, []);

    const handleSave = (event) => {
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'filter/save', 'POST', undefined, setCategoryItems, undefined, true);
        
    }

    return (
        <Container>
        <h4>Filter</h4>

        {/* Filter by category */}
        {filterSuccess === 'waiting' ?
            <Spinner animation="border" role="status" />
        : <>
        <Row className="mb-2">
            <Col>
                {/*<CheckboxDropdown items={categoryItems} /> */}
            </Col>
        </Row>
        <Row>
            <Form.Check type="checkbox" label="alkoholfrei" checked={nonAlcoholic} onChange={() => handleSave} />
            <Form.Check type="checkbox" label="vegan" disabled />
            <Form.Check type="checkbox" label="laktosefrei" disabled />
        </Row>
        </>}
        </Container>
    );
}

export default Filter;