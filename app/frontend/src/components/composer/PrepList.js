import { useEffect, useState } from 'react';
import { InputGroup } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function PrepList({recipe, handleFunction}) {

    const [inputs, setInputs] = useState([{order: 0, description: ""}]);

    const handleAdd = (index) => {
        let tmp = [...inputs];
        tmp.splice(index + 1, 0, {order: index + 1, description: ""});
        tmp.sort((a, b) => a.order - b.order);
        setInputs(tmp);
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

    useEffect(() => {
        if (recipe.steps && recipe.steps.length > 0) {
            setInputs(recipe.steps);
        }
    }, [recipe]);

    return(
        <>
        {inputs.map((item, index) => (
            <Row key={index} className="justify-content-center mb-3">
                <Col xs="12" sm="9" md="8">
                    <InputGroup>
                        <FloatingLabel label={"Schritt " + (index + 1)}>
                            <Form.Control as="textarea" rows="2" name="description" placeholder="Schritt" value={item.description} style={{height: "5rem"}} onChange={(event) => handleInputChange(event, index)}
                                maxLength={255}
                            />
                            
                        </FloatingLabel>
                        {inputs.length > 1 && (
                            <Button variant="danger" size="lg" onClick={() => handleDelete(index)}>-</Button>
                        )}
                        <Button variant="primary" size="lg" onClick={() => handleAdd(index)}>+</Button>
                    </InputGroup>
                    <Form.Text className="text-muted">
                        {item.description.length}/255 Zeichen
                    </Form.Text>
                </Col>
            </Row>
        ))}
        </>
    );
}

export default PrepList;