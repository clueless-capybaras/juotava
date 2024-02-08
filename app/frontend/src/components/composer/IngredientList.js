import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

function IngredientList() {

    const [inputs, setInputs] = useState([{ingredient: "", amount: "", unit: "ml"}]);

    const handleAdd = () => {
        setInputs([...inputs, {ingredient: "", amount: "", unit: "ml"}]);
    };

    const handleDelete = (index) => {
        const newArray = [...inputs];
        newArray.splice(index, 1);
        setInputs(newArray);
    }

    const handleInputChange = (event, index) => {
        let { name, value } = event.target;
        let onChangeValue = [...inputs];
        onChangeValue[index][name] = value;
        setInputs(onChangeValue);
    }

    return(
        <>
        {inputs.map((item, index) => (
            <Row key={index} className="justify-content-center mb-3">
                <Col xs="6" sm="6" md="6">
                    <InputGroup>
                        <FloatingLabel label={"Zutat " + (index + 1)}>
                            <Form.Control name="ingredient" value={item.ingredient} placeholder="Zutat" onChange={(event) => handleInputChange(event, index)} />
                        </FloatingLabel>
                        <FloatingLabel label="Menge">
                            <Form.Control name="amount" value={item.amount} placeholder="Menge" onChange={(event) => handleInputChange(event, index)} />
                        </FloatingLabel>
                        <FloatingLabel label="Einheit">
                            <Form.Select name="unit" placeholder="Einheit" value={item.unit} onChange={(event) => handleInputChange(event, index)} >
                                <option>ml</option>
                                <option>dl</option>
                                <option>l</option>
                                <option>oz</option>
                                <option>mg</option>
                                <option>g</option>
                                <option>kg</option>
                                <option>pcs</option>
                                <option>TL</option>
                                <option>EL</option>
                            </Form.Select>
                        </FloatingLabel>
                    </InputGroup>
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
        {/*<div>{JSON.stringify(inputs)}</div>*/}
        </> 
    );
}

export default IngredientList;