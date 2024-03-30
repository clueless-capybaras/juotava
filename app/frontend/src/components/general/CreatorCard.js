import { useContext, useEffect, useState } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import { generatePlaceholders } from '../../helperFunctions/generatePlaceholders';
import { useAuth0 } from '@auth0/auth0-react';
import {baseUrlUser } from '../../config/config';
import { AuthenticatedRequestWrapperContext } from '../../App';

import placeholderimage from '../../image-placeholder.jpeg';

function CreatorCard({createdBy}) {
    const arw = useContext(AuthenticatedRequestWrapperContext);
    const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();
    const [creator, setCreator] = useState();
    const [loadCreatorSuccess, setLoadCreatorSuccess] = useState();

    useEffect(() => {
        console.log(createdBy);
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlUser, 'user/'+ encodeURIComponent(createdBy), 'GET', undefined, setCreator, setLoadCreatorSuccess, true);
    }, [createdBy]);

    return (
        <Row className="d-flex align-items-center">
            <Col style={{maxWidth: "5rem"}}>
                <Image
                    src={(creator && creator.image && creator.image.base64data) ? creator.image.base64data : placeholderimage}
                    style={{maxWidth: "4rem", maxHeight: "4rem"}}
                    roundedCircle
                />
            </Col>
            <Col style={{maxHeight: "4rem"}}>
                <Row>
                    {creator ?
                        <div>{creator.userName}</div>
                    : generatePlaceholders(1, 1, 2)}
                </Row>
                <Row className="text-muted">
                    <div>Ersteller</div>
                </Row>
            </Col>
        </Row>
    );
}

export default CreatorCard;