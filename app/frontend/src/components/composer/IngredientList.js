import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function IngredientList() {

    return(
        <FloatingLabel label="Zutat">
            <Form.Control placeholder="Zutat" />
        </FloatingLabel>
    );
}

export default IngredientList;