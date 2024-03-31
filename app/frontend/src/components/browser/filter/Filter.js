import { useContext, useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { AuthenticatedRequestWrapperContext } from '../../../App';
import {baseUrlRecipes } from '../../../config/config';

import { Button, ButtonGroup, Col, Container, Dropdown, Form, Row, Spinner } from 'react-bootstrap';

import FilterModel from '../../../model/filterModel';
import { getDrinkCategories } from '../../../helperFunctions/getDrinkCategories';

function Filter({triggerRefresh}) {
    const arw = useContext(AuthenticatedRequestWrapperContext);
    const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();
    
    const [filter, setFilter] = useState(
        new FilterModel(
            false, []
        )
    );
            
    const [filterSuccess, setFilterSuccess] = useState('');
    useEffect(() => {
        setFilterSuccess('waiting');
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlRecipes, 'filter/my', 'GET', undefined, setFilter, setFilterSuccess, false);
    }, []);

    const handleChangeNonAlcOnly = (event) => {
        let temp = {...filter};
        temp.showNonAlcOnly = event.target.checked;
        setFilter(temp);
        saveFilter(temp);
    }

    const handleChangeCategory = (event) => {
        let temp = {...filter};
        if (event.target.checked) {
            temp.categories.push(event.target.id);
            temp.categories.sort();
        } else {
            temp.categories.map((category, index) => {
                if (category === event.target.id) {
                    temp.categories.splice(index, 1);
                }
            });
        }
        setFilter(temp);
        saveFilter(temp);
    }

    const handleShowAllCategories = () => {
        let temp = {...filter};
        getDrinkCategories().map((category) => {
            if (!temp.categories.includes(category.id)) {
                temp.categories.push(category.id);
            }
        });
        temp.categories.sort();
        setFilter(temp);
        saveFilter(temp);
    }

    const handleShowNoCategories = () => {
        let temp = {...filter};
        temp.categories = [];
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
        <h4 className="mb-4">Filter</h4>

        {filterSuccess === 'waiting' ?
            <>
            <Row className="mb-2">
                <Col>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" disabled>Kategorien</Dropdown.Toggle>
                    </Dropdown>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Check type="checkbox" label="alkoholfrei" disabled />
                </Col>
            </Row>
            </>
        : null}
        {filterSuccess === 'error' ?
            <h4 className="text-center my-5">
                Filter konnten nicht gefunden werden.
            </h4>
        : null}
        {filterSuccess === 'success' ?
        <>
        <Row className="mb-2">
            <Col>
                <Dropdown>
                    <Dropdown.Toggle variant="primary">Kategorien</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {getDrinkCategories().map((category, index) => {
                            return (
                                <Form.Check key={index} 
                                    type="checkbox" 
                                    id={category.id}
                                    label={category.label} 
                                    checked={filter.categories.includes(category.id) ? true : false}
                                    onChange={(event) => handleChangeCategory(event)}
                                    className="ms-2" />
                            )
                        })
                        }
                        <Dropdown.Divider />
                        <ButtonGroup>
                            <Button variant="link" onClick={handleShowAllCategories}>Alle</Button>
                            <Button variant="link" onClick={handleShowNoCategories}>Keine</Button>
                        </ButtonGroup>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form.Check type="checkbox" label="alkoholfrei" checked={filter.showNonAlcOnly} onChange={(event) => handleChangeNonAlcOnly(event)} />
            </Col>
            {/*<Form.Check type="checkbox" label="vegan" disabled />
            <Form.Check type="checkbox" label="laktosefrei" disabled />*/}
        </Row>
        </>
        : null} 
        </Container>
    );
}

export default Filter;