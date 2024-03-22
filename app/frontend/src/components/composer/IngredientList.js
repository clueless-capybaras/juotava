import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

function IngredientList({handleFunction}) {

    const [inputs, setInputs] = useState([{order: 0, name: "", amount: "", unit: "MILLILITRES"}]);

    const handleAdd = (index) => {
        let tmp = [...inputs];
        tmp.splice(index + 1, 0, {order: index + 1, name: "", amount: "", unit: "MILLILITRES"});
        tmp.sort((a, b) => a.order - b.order);
        setInputs(tmp);
    };

    const handleDelete = (index) => {
        const newArray = [...inputs];
        newArray.splice(index, 1);
        newArray.forEach((item, index) => {
            item.order = index;
        });
        handleFunction(newArray);
        setInputs(newArray);
    }

    const handleInputChange = (event, index) => {
        let { name, value } = event.target;
        let onChangeValue = [...inputs];
        onChangeValue[index][name] = value;
        handleFunction(onChangeValue);
        setInputs(onChangeValue);
    }

    return(
        <>
        {inputs.map((item, index) => (
            <Row key={index} className="justify-content-center mb-3">
                <Col xs={12} sm={9} md={8}>
                    <InputGroup>
                        <FloatingLabel label={"Zutat " + (index + 1)}>
                            <Form.Control name="name" value={item.name} placeholder="Zutat" onChange={(event) => handleInputChange(event, index)} 
                                maxLength={50}
                            />
                        </FloatingLabel>
                        <FloatingLabel label="Menge">
                            <Form.Control name="amount" value={item.amount} placeholder="Menge" onChange={(event) => handleInputChange(event, index)} />
                        </FloatingLabel>
                        <FloatingLabel label="Einheit">
                            <Form.Select name="unit" placeholder="Einheit" value={item.unit} onChange={(event) => handleInputChange(event, index)} >
                                <option value="MILLILITRES">ml</option>
                                <option value="CENTILITRES">cl</option>
                                <option value="DECILITRES">dl</option>
                                <option value="LITRES">l</option>
                                <option value="OUNCES">oz</option>
                                <option value="MILLIGRAMS">mg</option>
                                <option value="GRAMS">g</option>
                                <option value="KILOGRAMS">kg</option>
                                <option value="PIECES">Stk</option>
                                <option value="TEASPOONS">TL</option>
                                <option value="TABLESPOONS">EL</option>
                            </Form.Select>
                        </FloatingLabel>
                        {inputs.length > 1 && (
                            <Button variant="danger" size="lg" onClick={() => handleDelete(index)}>-</Button>
                        )}
                        <Button variant="primary" size="lg" onClick={() => handleAdd(index)}>+</Button>
                    </InputGroup>
                </Col>
            </Row>
        ))}
        {/*<div>{JSON.stringify(inputs)}</div>*/}
        </> 
    );
}

export default IngredientList;