import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function PrepList({handleFunction}) {

    const [inputs, setInputs] = useState([{order: 0, description: ""}]);

    const handleAdd = () => {
        setInputs([...inputs, {order: inputs.length, description: ""}]);
    };

    const handleDelete = (index) => {
        const newArray = [...inputs];
        newArray.splice(index, 1);
        newArray.forEach((item, index) => {
            item.order = index;
        });
        setInputs(newArray);
        handleFunction(newArray);
    }

    const handleInputChange = (event, index) => {
        let { name, value } = event.target;
        let onChangeValue = [...inputs];
        onChangeValue[index][name] = value;
        setInputs(onChangeValue);
        handleFunction(onChangeValue);
    }

    return(
        <>
        {inputs.map((item, index) => (
            <Row key={index} className="justify-content-center mb-3">
                <Col xs="6" sm="6" md="6">
                    <FloatingLabel label={"Schritt " + (index + 1)}>
                        <Form.Control as="textarea" rows="2" name="description" placeholder="Schritt" value={item.description} style={{height: "5rem"}} onChange={(event) => handleInputChange(event, index)} />
                    </FloatingLabel>
                </Col>
                <Col xs="1" sm="1" md="1">
                    {inputs.length > 1 && (
                        <Button variant="danger" size="lg" onClick={() => handleDelete(index)}>-</Button>
                    )}
                </Col>
                <Col xs="1" sm="1" md="1">  
                    {index === inputs.length - 1 && (
                        <Button variant="primary" size="lg" onClick={() => handleAdd()}>+</Button>
                    )}
                </Col>
            </Row>
        ))}
        </>
    );
}

export default PrepList;