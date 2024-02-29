import {React, useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router';
import LogOutButton from '../../auth/LogOutButton';
import { useAuth0 } from '@auth0/auth0-react';
import {baseUrlUser } from '../../../config/config';
import { AuthenticatedRequestWrapperContext } from '../../../App';

import ImageUploaderUser from './ImageUploaderUser';
import {userSettings, Settings} from '../../../model/userSettings';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function User(props) {
    let style = { width: 'auto', cursor: 'pointer', padding: '0' };
    if(props.disabled) {
        style = { width: 'auto', cursor: 'not-allowed', padding: '0', opacity: '0.5' };
    }
    const navigate = useNavigate();
    const cyClass = (props.cyClass !== undefined) ? " "+props.cyClass : "";
    const arw = useContext(AuthenticatedRequestWrapperContext);
    const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();

    const handleChangeUsername = (event) => {
        //console.log(event.target.value);
        const newUsername = event.target.value;
        setUserSet(prevUserSet => ({
            ...prevUserSet,
            userName: newUsername
        }));
    }

    const handleChangeShowUsername = (event) => {
        //console.log(event.target.checked);
        const newShowUsername = event.target.checked;
        setUserSet(prevUserSet => ({
            ...prevUserSet,
            settings: {
                ...prevUserSet.settings,
                showUserNameInRecipe: newShowUsername
            }
        }));
    }

    const handleSave = () => {
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlUser, 'user/save', 'POST', JSON.stringify(userSet), undefined, true);
    }

    const [userSet, setUserSet] = useState(new userSettings(user.sub, "", new Settings(undefined, false)));

    useEffect(() => {
        arw.request({isAuthenticated, getAccessTokenSilently}, baseUrlUser, 'user/'+ encodeURIComponent(user.sub), 'GET', undefined, setUserSet, true);
    }, []);
    
    
    return (
        <>
        <h1 className="text-center mb-5">Benutzer {userSet.userName}</h1>
        <Container className="mb-5">
            <Row className="justify-content-center mb-3">
                <ImageUploaderUser />
            </Row>
            <Row className="justify-content-center mb-3">
                <Col>
                    <FloatingLabel controlId="floatingUserName" label="Benutzername">
                        <Form.Control placeholder="Benutzername" onChange={(e) => handleChangeUsername(e)} value={userSet.userName} />
                    </FloatingLabel>
                </Col>
            </Row>
            <Row className="justify-content-center mb-3">
                <Col>
                    <FloatingLabel controlId='floatingShowUserName'>
                        <Form.Check type="checkbox" label="Benutzername anzeigen" onChange={(e) => handleChangeShowUsername(e)} checked={userSet.settings.showUserNameInRecipe}/>
                    </FloatingLabel>
                </Col>
            </Row>
            <Row>
                <Col className='text-center'>
                    <Button variant="primary" className="me-1" onClick={() => handleSave()}>Speichern</Button>
                </Col>
            </Row>
        </Container>
        </>
    );
}
export default User;