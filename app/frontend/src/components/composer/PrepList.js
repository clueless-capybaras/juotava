import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function PrepList() {

    return(
        <>
        <FloatingLabel label="Schritt">
            <Form.Control as="textarea" rows="2" placeholder="Schritt" style={{height: "5rem"}} />
        </FloatingLabel>
        </>
    );
}

export default PrepList;