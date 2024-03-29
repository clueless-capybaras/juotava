import { useState } from 'react';
import {Col, Container, Row } from 'react-bootstrap'
import Filter from './filter/Filter';
import GenericBrowser from '../general/GenericBrowser';

function Browser() {
    const [loadRecipeExcerptsSuccess, setLoadRecipeExcerptsSuccess] = useState('');

    // Refresh trigger for GenericBrowser
    // triggers a reload of the recipe excerpts when filter is changed
    const [refresh, setRefresh] = useState(0);
    const triggerRefresh = () => {
        setRefresh(refresh + 1);
    }

    return (
        <Container fluid className='mb-5'>
            <Row>
                <Col sm='3'>
                    <Filter loadRecipeExcerptsSuccess={loadRecipeExcerptsSuccess} triggerRefresh={triggerRefresh} />
                </Col>
                <Col sm='8'>
                    <GenericBrowser refresh={refresh} />
                </Col>
            </Row>
        </Container>
    );
}
export default Browser;