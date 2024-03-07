import { useEffect, useState } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import { generatePlaceholders } from '../../helperFunctions/generatePlaceholders';

import placeholderimage from '../../image-placeholder.jpeg';

function CreatorCard(createdBy) {
    const [creator, setCreator] = useState();

    useEffect(() => {
        setCreator(createdBy);
    }, [createdBy])

    return (
        <Row className="d-flex align-items-center">
            <Col style={{maxWidth: "5rem"}}>
                <Image
                    src={creator === undefined ? placeholderimage : /*creator.image*/placeholderimage}
                    style={{maxWidth: "4rem"}}
                    roundedCircle
                />
            </Col>
            <Col style={{maxHeight: "4rem"}}>
                <Row>
                    {creator ?
                        <div>{checkUserName(creator.userName)}</div>
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

function checkUserName(userName) {
    if(userName != null) {
        return userName;
    }
    else {return "Anonym";}
}